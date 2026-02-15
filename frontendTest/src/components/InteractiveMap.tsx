import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { useNavigate } from 'react-router-dom';
import { useLanguages } from '@/data/languages';
import {
  clusterMarkers,
  getZoomTier,
  getGridSize,
  type MarkerPoint,
  type ClusterPoint,
  type ZoomTier,
} from '@/lib/clusterMarkers';

const statusLabels: Record<string, string> = {
  active: 'Active',
  endangered: 'Endangered',
  vulnerable: 'Vulnerable',
  extinct: 'Extinct',
};

const statusColors: Record<string, string> = {
  active: 'hsl(120, 50%, 35%)',
  endangered: 'hsl(0, 70%, 45%)',
  vulnerable: 'hsl(35, 80%, 50%)',
  extinct: 'hsl(270, 50%, 45%)',
};

interface InteractiveMapProps {
  flyTo?: { lat: number; lng: number; zoom?: number } | null;
  flyToLangId?: string | null;
}

interface GlobeControls {
  autoRotate: boolean;
  addEventListener: (event: 'change', handler: () => void) => void;
  removeEventListener: (event: 'change', handler: () => void) => void;
}

interface GlobePointOfView {
  altitude?: number;
}

interface GlobeHandle {
  controls: () => GlobeControls | null;
  pointOfView: (
    view?: { lat: number; lng: number; altitude: number },
    transitionMs?: number
  ) => GlobePointOfView;
}

interface CountryLabelDatum {
  label: string;
}

const InteractiveMap = ({ flyTo, flyToLangId }: InteractiveMapProps) => {
  const { data: languages = [] } = useLanguages();
  const globeRef = useRef<GlobeHandle | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedMarker, setSelectedMarker] = useState<MarkerPoint | null>(null);
  const [altitude, setAltitude] = useState(2.5);
  const navigate = useNavigate();
  const [highlightedLang, setHighlightedLang] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLangFilter, setActiveLangFilter] = useState<string | null>(null);

  const allMarkers: MarkerPoint[] = useMemo(
    () =>
      languages.flatMap((lang) =>
        lang.locations.map((loc, i) => ({
          lat: loc.lat,
          lng: loc.lng,
          name: lang.countries[i] || loc.name,
          language: lang,
        }))
      ),
    []
  );

  const zoomTier: ZoomTier = useMemo(() => getZoomTier(altitude), [altitude]);

  const clusteredPoints: ClusterPoint[] = useMemo(() => {
    const gridSize = getGridSize(zoomTier);
    if (gridSize === 0) {
      return allMarkers.map((m) => ({
        lat: m.lat,
        lng: m.lng,
        count: 1,
        markers: [m],
        dominantStatus: m.language.status,
        dominantFamily: m.language.family,
        isSingle: true,
      }));
    }
    return clusterMarkers(allMarkers, gridSize);
  }, [allMarkers, zoomTier]);

  // Display points: filtered when searching, all when not
  const displayPoints: ClusterPoint[] = useMemo(() => {
    const filterQuery = searchQuery.trim().toLowerCase();

    if (activeLangFilter) {
      const lang = languages.find((l) => l.id === activeLangFilter);
      if (!lang) return [];
      return lang.locations.map((loc, i) => ({
        lat: loc.lat,
        lng: loc.lng,
        count: 1,
        markers: [{ lat: loc.lat, lng: loc.lng, name: lang.countries[i] || loc.name, language: lang }],
        dominantStatus: lang.status,
        dominantFamily: lang.family,
        isSingle: true,
      }));
    }

    if (filterQuery) {
      const matching = languages.filter(
        (l) =>
          l.name.toLowerCase().includes(filterQuery) ||
          l.family.toLowerCase().includes(filterQuery)
      );
      if (matching.length === 0) return [];
      return matching.flatMap((lang) =>
        lang.locations.map((loc, i) => ({
          lat: loc.lat,
          lng: loc.lng,
          count: 1,
          markers: [{ lat: loc.lat, lng: loc.lng, name: lang.countries[i] || loc.name, language: lang }],
          dominantStatus: lang.status,
          dominantFamily: lang.family,
          isSingle: true,
        }))
      );
    }

    return clusteredPoints;
  }, [searchQuery, activeLangFilter, clusteredPoints]);

  // Labels for country names when filtering or highlighting
  const countryLabels = useMemo(() => {
    const filterQuery = searchQuery.trim().toLowerCase();
    if (!activeLangFilter && !filterQuery && !highlightedLang) return [];

    let targetLangs: typeof languages = [];

    if (activeLangFilter) {
      const lang = languages.find((l) => l.id === activeLangFilter);
      if (lang) targetLangs = [lang];
    } else if (highlightedLang) {
      const lang = languages.find((l) => l.id === highlightedLang);
      if (lang) targetLangs = [lang];
    } else if (filterQuery) {
      targetLangs = languages.filter(
        (l) =>
          l.name.toLowerCase().includes(filterQuery) ||
          l.family.toLowerCase().includes(filterQuery)
      );
    }

    return targetLangs.flatMap((lang) =>
      lang.locations.map((loc, i) => ({
        lat: loc.lat,
        lng: loc.lng,
        label: lang.countries[i] || loc.name,
      }))
    );
  }, [searchQuery, activeLangFilter, highlightedLang]);

  // Resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Disable auto-rotate
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = false;
      }
    }
  }, []);

  // Track altitude changes
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const controls = globe.controls();
    if (!controls) return;

    const handleChange = () => {
      const pov = globe.pointOfView();
      if (pov && pov.altitude !== undefined) {
        setAltitude(pov.altitude);
      }
    };

    controls.addEventListener('change', handleChange);
    return () => controls.removeEventListener('change', handleChange);
  }, []);

  // Fly to from language detail page
  useEffect(() => {
    if (flyTo && globeRef.current) {
      globeRef.current.pointOfView(
        { lat: flyTo.lat, lng: flyTo.lng, altitude: flyTo.zoom ? 4 / flyTo.zoom : 0.6 },
        1500
      );
    }
  }, [flyTo]);

  // Highlight language from flyTo
  useEffect(() => {
    if (flyToLangId) {
      setHighlightedLang(flyToLangId);
      setActiveLangFilter(flyToLangId);
      const lang = languages.find((l) => l.id === flyToLangId);
      if (lang) {
        setSearchQuery(lang.name);
      }
      setTimeout(() => {
        setHighlightedLang(null);
      }, 8000);
    }
  }, [flyToLangId]);

  const handlePointClick = useCallback(
    (point: unknown) => {
      const cluster = point as ClusterPoint;

      if (!cluster.isSingle && cluster.count > 1) {
        if (globeRef.current) {
          const targetAlt = altitude > 2.5 ? 1.5 : 0.5;
          globeRef.current.pointOfView(
            { lat: cluster.lat, lng: cluster.lng, altitude: targetAlt },
            800
          );
        }
        return;
      }

      const marker = cluster.markers[0];
      setSelectedMarker(marker);
      if (globeRef.current) {
        globeRef.current.pointOfView(
          { lat: marker.lat, lng: marker.lng, altitude: 1.5 },
          800
        );
      }
    },
    [altitude]
  );

  const getPointColor = useCallback(
    (d: object) => {
      const cluster = d as ClusterPoint;
      if (highlightedLang && cluster.markers.some((m) => m.language.id === highlightedLang)) {
        return 'hsl(200, 80%, 65%)';
      }
      return statusColors[cluster.dominantStatus] || '#ffffff';
    },
    [highlightedLang]
  );

  const getPointAltitude = useCallback((_d: object) => 0.01, []);

  const getPointRadius = useCallback(
    (_d: object) => {
      if (altitude > 2.5) return 0.3;
      if (altitude > 1.5) return 0.45;
      if (altitude > 1.0) return 0.55;
      return 0.7;
    },
    [altitude]
  );

  const getPointLabel = useCallback(
    (d: object) => {
      const cluster = d as ClusterPoint;

      const isHighlighted =
        highlightedLang && cluster.markers.some((m) => m.language.id === highlightedLang);
      const highlightedMarker = isHighlighted
        ? cluster.markers.find((m) => m.language.id === highlightedLang)
        : null;

      if (cluster.isSingle || isHighlighted) {
        const m = highlightedMarker || cluster.markers[0];
        const borderColor = isHighlighted ? 'hsl(200, 70%, 50%)' : 'hsl(25, 25%, 50%)';
        const bgColor = isHighlighted ? 'hsl(200, 60%, 92%)' : 'hsl(40, 25%, 88%)';
        return `
          <div style="
            background: ${bgColor};
            border: 3px solid ${borderColor};
            padding: 8px 12px;
            font-family: 'VT323', monospace;
            color: hsl(25, 30%, 12%);
            min-width: 160px;
            ${isHighlighted ? 'box-shadow: 0 0 12px hsl(200, 80%, 60%);' : ''}
          ">
            <div style="font-family: 'Press Start 2P', cursive; font-size: 9px; text-transform: uppercase; color: hsl(25, 15%, 40%); margin-bottom: 4px;">${m.language.family}</div>
            <div style="font-family: 'Press Start 2P', cursive; font-size: 11px; margin-bottom: 4px;">${m.language.name}</div>
            <div style="font-size: 14px; color: hsl(25, 15%, 40%);">${m.name}</div>
          </div>
        `;
      }

      const statusBreakdown = Object.entries(
        cluster.markers.reduce((acc, m) => {
          acc[m.language.status] = (acc[m.language.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      )
        .map(
          ([status, count]) =>
            `<span style="color: ${statusColors[status]};">● ${statusLabels[status]}: ${count}</span>`
        )
        .join('<br/>');

      return `
        <div style="
          background: hsl(40, 25%, 88%);
          border: 3px solid hsl(25, 25%, 50%);
          padding: 8px 12px;
          font-family: 'VT323', monospace;
          color: hsl(25, 30%, 12%);
          min-width: 160px;
        ">
          <div style="font-family: 'Press Start 2P', cursive; font-size: 11px; margin-bottom: 6px;">+${cluster.count} languages</div>
          <div style="font-size: 14px; line-height: 1.6;">${statusBreakdown}</div>
          <div style="font-size: 12px; color: hsl(25, 15%, 40%); margin-top: 4px;">Click to zoom in</div>
        </div>
      `;
    },
    [highlightedLang]
  );

  // Search dropdown
  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return languages
      .filter((l) => l.name.toLowerCase().includes(q) || l.family.toLowerCase().includes(q))
      .slice(0, 8);
  }, [searchQuery]);

  const handleSearchSelect = (langId: string) => {
    const lang = languages.find((l) => l.id === langId);
    if (!lang || !lang.locations[0]) return;
    setSearchQuery(lang.name);
    setActiveLangFilter(langId);
    setHighlightedLang(langId);
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: lang.locations[0].lat, lng: lang.locations[0].lng, altitude: 0.5 },
        1200
      );
    }
    setTimeout(() => setHighlightedLang(null), 8000);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setActiveLangFilter(null);
      setHighlightedLang(null);
    } else {
      setActiveLangFilter(null);
    }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Floating search bar */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 w-72 md:w-96">
        <div className="minecraft-border bg-card px-3 py-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="🔍 Search languages..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="flex-1 bg-transparent font-pixel-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="font-pixel text-[10px] text-muted-foreground hover:text-foreground transition-colors"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {filteredLanguages.length > 0 && !activeLangFilter && (
          <div className="minecraft-border bg-card mt-1 max-h-48 overflow-y-auto">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleSearchSelect(lang.id)}
                className="w-full text-left px-3 py-2 font-pixel-body text-base text-foreground hover:bg-muted transition-colors flex items-center justify-between"
              >
                <span>{lang.name}</span>
                <span className="font-pixel text-[7px] text-muted-foreground">{lang.family}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom tier indicator */}
      <div className="absolute top-3 left-3 z-10 minecraft-border bg-card px-3 py-1.5">
        <span className="font-pixel text-[7px] text-muted-foreground uppercase tracking-wider">
          {zoomTier === 'global' && '🌍 Global View'}
          {zoomTier === 'medium' && '🗺️ Regional View'}
          {zoomTier === 'close' && '📍 Local View'}
        </span>
      </div>

      {/* Color legend */}
      <div className="absolute bottom-4 left-3 z-10 minecraft-border bg-card px-3 py-2 space-y-1.5">
        <span className="font-pixel text-[7px] text-muted-foreground uppercase tracking-wider block mb-1">Legend</span>
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: color }} />
            <span className="font-pixel text-[7px] text-foreground">{statusLabels[status]}</span>
          </div>
        ))}
      </div>

      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={displayPoints}
        pointLat="lat"
        pointLng="lng"
        pointColor={getPointColor}
        pointAltitude={getPointAltitude}
        pointRadius={getPointRadius}
        pointLabel={getPointLabel}
        onPointClick={handlePointClick}
        htmlElementsData={countryLabels}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.015}
        htmlElement={(d: unknown) => {
          const labelData = d as CountryLabelDatum;
          const el = document.createElement('div');
          el.style.fontFamily = "'Press Start 2P', cursive";
          el.style.fontSize = '8px';
          el.style.color = 'rgba(255, 255, 255, 0.95)';
          el.style.textShadow = '1px 1px 3px rgba(0,0,0,0.8)';
          el.style.pointerEvents = 'none';
          el.style.whiteSpace = 'nowrap';
          el.style.transform = 'translate(-50%, -50%)';
          el.textContent = labelData.label;
          return el;
        }}
      />

      {/* Popup card for single marker */}
      {selectedMarker && (
        <div
          className="absolute top-4 right-4 z-10 minecraft-border bg-card p-4"
          style={{ minWidth: 220, maxWidth: 280 }}
        >
          <button
            onClick={() => setSelectedMarker(null)}
            className="absolute top-1 right-2 font-pixel text-[10px] text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
          <p className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider mb-1">
            {selectedMarker.language.family}
          </p>
          <h3 className="font-pixel text-sm text-foreground mb-1">{selectedMarker.language.name}</h3>
          <span
            className={`status-${selectedMarker.language.status} px-2 py-0.5 font-pixel text-[8px] inline-block mb-2`}
          >
            {statusLabels[selectedMarker.language.status]}
          </span>
          <p className="font-pixel-body text-base text-muted-foreground mb-3 leading-snug">
            {selectedMarker.language.description.length > 100
              ? selectedMarker.language.description.slice(0, 100) + '...'
              : selectedMarker.language.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-pixel-body text-sm italic text-muted-foreground">
              "{selectedMarker.language.hello.replace(/\(.*\)/, '').trim()}"
            </span>
            <button
              onClick={() => navigate(`/language/${selectedMarker.language.id}`)}
              className="minecraft-btn px-3 py-1 font-pixel text-[8px] text-foreground"
            >
              Details →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
