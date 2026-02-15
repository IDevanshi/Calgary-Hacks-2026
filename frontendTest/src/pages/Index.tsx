import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import Navbar from '@/components/Navbar';
import InteractiveMap from '@/components/InteractiveMap';
import VillagerChat from '@/components/VillagerChat';
import { useLanguages } from '@/data/languages';

const Index = () => {
  const { data: languages = [] } = useLanguages();
  const [searchParams] = useSearchParams();
  const flyToLang = searchParams.get('flyTo');
  const flyToLoc = searchParams.get('loc');

  const flyTo = useMemo(() => {
    if (!flyToLang) return null;
    const lang = languages.find((l) => l.id === flyToLang);
    if (!lang) return null;
    const locIndex = flyToLoc ? parseInt(flyToLoc) : 0;
    const loc = lang.locations[locIndex] || lang.locations[0];
    if (!loc) return null;
    return { lat: loc.lat, lng: loc.lng, zoom: 7 };
  }, [flyToLang, flyToLoc, languages]);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 relative overflow-hidden">
        <InteractiveMap flyTo={flyTo} flyToLangId={flyToLang} />

        <div className="absolute bottom-4 right-4 z-[1000]">
          <VillagerChat />
        </div>
      </main>

      <footer className="bg-minecraft-dirt minecraft-border border-b-0 border-x-0 px-4 py-2 text-center">
        <p className="font-pixel text-[8px] text-primary-foreground">
          ⛏ LinguaCraft — Preserving the world's languages, one block at a time ⛏
        </p>
      </footer>
    </div>
  );
};

export default Index;
