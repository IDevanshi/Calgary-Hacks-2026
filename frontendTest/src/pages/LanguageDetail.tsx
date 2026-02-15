import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguages } from '@/data/languages';

const getStatusClass = (status: string): string => {
  const normalized = status.toLowerCase();
  if (normalized.includes('not endangered')) return 'status-active';
  if (normalized.includes('threatened')) return 'status-endangered';
  if (normalized.includes('extinct') || normalized.includes('dormant')) return 'status-extinct';
  if (normalized.includes('vulnerable')) return 'status-vulnerable';
  if (normalized.includes('endangered')) return 'status-endangered';
  return 'status-active';
};

const LanguageDetail = () => {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const { data: languages = [], isLoading, error } = useLanguages();
  const language = languages.find((l) => l.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="minecraft-border bg-card p-8 text-center">
            <h1 className="font-pixel text-lg text-foreground">Loading language...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="minecraft-border bg-card p-8 text-center">
            <h1 className="font-pixel text-lg text-foreground">Failed to load languages</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!language) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="minecraft-border bg-card p-8 text-center">
            <h1 className="font-pixel text-lg text-foreground">Language not found!</h1>
            <Link to={isAdmin ? '/admin/manage' : '/archive'} className="minecraft-btn inline-block mt-4 px-4 py-2 font-pixel text-xs text-foreground">
              {isAdmin ? '← Back to Manage' : '← Back to Archive'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {/* Back button - top left */}
        <div className="mb-4">
          <Link
            to={isAdmin ? '/admin/manage' : '/archive'}
            className="minecraft-btn inline-block px-4 py-2 font-pixel text-[9px] text-foreground"
          >
            {isAdmin ? '← Back to Manage' : '← Back to Archive'}
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1">
            <h1 className="font-pixel text-xl md:text-2xl text-foreground mb-3">{language.name}</h1>
            <span className={`${getStatusClass(language.status)} px-3 py-1 font-pixel text-[10px] inline-block`}>
              {language.status}
            </span>
            <p className="font-pixel-body text-xl text-muted-foreground mt-4">{language.description}</p>
          </div>

          {/* Stats card */}
          <div className="minecraft-border bg-card p-4 w-full md:w-64 shrink-0">
            <div className="space-y-3">
              <div>
                <p className="font-pixel text-[8px] text-muted-foreground">Speakers</p>
                <p className="font-pixel-body text-2xl text-foreground">
                  {language.speakers > 0 ? language.speakers.toLocaleString() : 'None'}
                </p>
              </div>
              <div>
                <p className="font-pixel text-[8px] text-muted-foreground">Countries</p>
                <p className="font-pixel-body text-2xl text-foreground">{language.countries.length}</p>
              </div>
              <div>
                <p className="font-pixel text-[8px] text-muted-foreground">Writing System</p>
                <p className="font-pixel-body text-xl text-foreground">
                  {language.writingSystems && language.writingSystems.length > 0
                    ? language.writingSystems.join(', ')
                    : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Origin */}
        <section className="minecraft-border bg-card p-5 mb-4">
          <h2 className="font-pixel text-sm text-foreground mb-3">Origin</h2>
          <p className="font-pixel-body text-xl text-foreground leading-relaxed mb-3">
            Language family: {language.languageFamily.length > 0 ? language.languageFamily.join(' > ') : language.family}
          </p>
          <p className="font-pixel-body text-xl text-foreground leading-relaxed">{language.origin}</p>
        </section>

        {/* Tribes */}
        <section className="minecraft-border bg-card p-5 mb-4">
          <h2 className="font-pixel text-sm text-foreground mb-3">Tribes and Peoples</h2>
          <div className="flex flex-wrap gap-2">
            {language.tribes.map((tribe) => (
              <span key={tribe} className="font-pixel-body text-lg text-foreground px-3 py-1 bg-muted/50">
                {tribe}
              </span>
            ))}
          </div>
        </section>

        {/* Alphabet */}
        <section className="minecraft-border bg-card p-5 mb-4">
          <h2 className="font-pixel text-sm text-foreground mb-3">Alphabet</h2>
          <p className="font-pixel-body text-2xl text-foreground tracking-wider leading-loose">{language.alphabet}</p>
        </section>

        {/* Dictionary button */}
        <div className="mb-4">
          <a
            href={
              language.dictionaryLinks?.[0] ||
              language.wikipediaPage ||
              `https://en.wikipedia.org/wiki/${encodeURIComponent(language.name.replace(/\s*\(.*\)/, ''))}_language`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="minecraft-btn w-full px-4 py-3 font-pixel text-xs text-foreground block text-center"
          >
            Open Dictionary (Wikipedia)
          </a>
        </div>

        {/* Locations & Countries */}
        <section className="minecraft-border bg-card p-5 mb-4">
          <h2 className="font-pixel text-sm text-foreground mb-3">
            Countries ({language.countries.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {language.countries.map((country, i) => (
              <Link
                key={country}
                to={`/?flyTo=${language.id}&loc=${i}`}
                className="minecraft-btn px-3 py-2 font-pixel text-[9px] text-foreground"
              >
                {country}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LanguageDetail;
