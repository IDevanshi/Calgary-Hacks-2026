import { useState, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguages } from '@/data/languages';

const AdminManage = () => {
  const { isAdmin } = useAuth();
  const { data: languages = [], isLoading, error } = useLanguages();
  const [tab, setTab] = useState<'list' | 'add'>('list');

  const sortedLanguages = useMemo(
    () => [...languages].sort((a, b) => a.name.localeCompare(b.name)),
    [languages]
  );

  if (!isAdmin) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <h1 className="font-pixel text-lg text-foreground text-center mb-6">⚙️ Manage Languages</h1>

        <div className="flex gap-2 mb-6 justify-center">
          <button
            onClick={() => setTab('list')}
            className={`minecraft-btn px-4 py-2 font-pixel text-[9px] text-foreground ${tab === 'list' ? 'bg-accent' : ''}`}
          >
            All Languages
          </button>
          <button
            onClick={() => setTab('add')}
            className={`minecraft-btn px-4 py-2 font-pixel text-[9px] text-foreground ${tab === 'add' ? 'bg-accent' : ''}`}
          >
            + Add Language
          </button>
        </div>

        {tab === 'list' && (
          <div className="space-y-2">
            {isLoading && (
              <div className="minecraft-border bg-card p-6 text-center">
                <p className="font-pixel-body text-xl text-muted-foreground">Loading languages...</p>
              </div>
            )}
            {error && (
              <div className="minecraft-border bg-card p-6 text-center">
                <p className="font-pixel-body text-xl text-destructive">Failed to load languages.</p>
              </div>
            )}
            {!isLoading && !error && sortedLanguages.map((lang) => (
              <div key={lang.id} className="minecraft-border bg-card p-4 flex items-center justify-between">
                <div>
                  <span className="font-pixel text-xs text-foreground">{lang.name}</span>
                  <span className={`status-${lang.status} px-2 py-0.5 font-pixel text-[8px] ml-3`}>
                    {lang.status}
                  </span>
                  <span className="font-pixel-body text-base text-muted-foreground ml-3">
                    {lang.countries.length} {lang.countries.length !== 1 ? 'countries' : 'country'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/language/${lang.id}`}
                    className="minecraft-btn px-3 py-1 font-pixel text-[8px] text-foreground"
                  >
                    View
                  </Link>
                  <button className="minecraft-btn px-3 py-1 font-pixel text-[8px] text-foreground">
                    Edit
                  </button>
                  <button className="minecraft-btn px-3 py-1 font-pixel text-[8px] text-destructive">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'add' && (
          <div className="minecraft-border bg-card p-6">
            <p className="font-pixel-body text-xl text-muted-foreground text-center">
              🚧 Add language form coming soon. Connect a backend to enable full CRUD operations.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminManage;
