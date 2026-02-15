import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import LanguageCard from '@/components/LanguageCard';
import { useLanguages } from '@/data/languages';

const LanguageArchive = () => {
  const { data: languages = [], isLoading, error } = useLanguages();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);

  const filtered = useMemo(() => {
    const sorted = [...languages].sort((a, b) => a.name.localeCompare(b.name));
    if (!search.trim()) return sorted;
    return sorted.filter((l) =>
      l.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <h1 className="font-pixel text-lg md:text-xl text-foreground text-center mb-6">
          📜 Language Archive
        </h1>

        <div className="mb-6 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Filter languages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 bg-background border-2 border-border font-pixel-body text-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
          />
        </div>

        {isLoading && (
          <div className="minecraft-border bg-card p-8 text-center mt-4">
            <p className="font-pixel text-sm text-muted-foreground">Loading languages...</p>
          </div>
        )}

        {error && (
          <div className="minecraft-border bg-card p-8 text-center mt-4">
            <p className="font-pixel text-sm text-destructive">Failed to load languages.</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((lang) => (
              <LanguageCard key={lang.id} language={lang} />
            ))}
          </div>
        )}
        {filtered.length === 0 && (
          <div className="minecraft-border bg-card p-8 text-center mt-4">
            <p className="font-pixel text-sm text-muted-foreground">
              No languages found. Hrmmm...
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LanguageArchive;
