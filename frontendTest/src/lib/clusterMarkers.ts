import type { Language } from '@/data/languages';

export interface MarkerPoint {
  lat: number;
  lng: number;
  name: string;
  language: Language;
}

export interface ClusterPoint {
  lat: number;
  lng: number;
  count: number;
  markers: MarkerPoint[];
  // Dominant status for coloring
  dominantStatus: string;
  // Dominant family for labeling
  dominantFamily: string;
  // Is this a single marker (not clustered)?
  isSingle: boolean;
}

/**
 * Simple grid-based spatial clustering.
 * `gridSize` is in degrees – smaller = more clusters = more detail.
 */
export function clusterMarkers(
  markers: MarkerPoint[],
  gridSize: number
): ClusterPoint[] {
  const buckets: Record<string, MarkerPoint[]> = {};

  for (const m of markers) {
    const keyLat = Math.floor(m.lat / gridSize) * gridSize;
    const keyLng = Math.floor(m.lng / gridSize) * gridSize;
    const key = `${keyLat}:${keyLng}`;
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(m);
  }

  return Object.values(buckets).map((group) => {
    const lat = group.reduce((s, m) => s + m.lat, 0) / group.length;
    const lng = group.reduce((s, m) => s + m.lng, 0) / group.length;

    // Find dominant status
    const statusCounts: Record<string, number> = {};
    const familyCounts: Record<string, number> = {};
    for (const m of group) {
      const st = m.language.status;
      statusCounts[st] = (statusCounts[st] || 0) + 1;
      const fam = m.language.family;
      familyCounts[fam] = (familyCounts[fam] || 0) + 1;
    }

    const dominantStatus = Object.entries(statusCounts).sort(
      (a, b) => b[1] - a[1]
    )[0][0];
    const dominantFamily = Object.entries(familyCounts).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    return {
      lat,
      lng,
      count: group.length,
      markers: group,
      dominantStatus,
      dominantFamily,
      isSingle: group.length === 1,
    };
  });
}

/** Map altitude to a zoom tier */
export type ZoomTier = 'global' | 'medium' | 'close';

export function getZoomTier(altitude: number): ZoomTier {
  if (altitude > 2.5) return 'global';
  if (altitude > 1.0) return 'medium';
  return 'close';
}

/** Grid size per tier (degrees) */
export function getGridSize(tier: ZoomTier): number {
  switch (tier) {
    case 'global':
      return 30;
    case 'medium':
      return 10;
    case 'close':
      return 0; // no clustering
  }
}
