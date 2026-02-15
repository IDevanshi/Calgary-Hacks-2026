import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguages } from '@/data/languages';
import { Volume2 } from 'lucide-react';

const statusLabels: Record<string, string> = {
  active: 'Active',
  endangered: 'Endangered',
  vulnerable: 'Vulnerable',
  extinct: 'Extinct',
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

  const speakHello = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(language.hello.replace(/\(.*\)/, '').trim());
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

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
            <span className={`status-${language.status} px-3 py-1 font-pixel text-[10px] inline-block`}>
              {statusLabels[language.status]}
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
                <p className="font-pixel text-[8px] text-muted-foreground">Language Age</p>
                <p className="font-pixel-body text-2xl text-foreground">{language.age}</p>
              </div>
              <div>
                <p className="font-pixel text-[8px] text-muted-foreground">Countries</p>
                <p className="font-pixel-body text-2xl text-foreground">{language.countries.length}</p>
              </div>
              <div>
                <p className="font-pixel text-[8px] text-muted-foreground">Hello</p>
                <div className="flex items-center gap-2">
                  <p className="font-pixel-body text-xl text-foreground">{language.hello}</p>
                  <button onClick={speakHello} className="minecraft-btn p-1" title="Hear pronunciation">
                    <Volume2 className="w-4 h-4 text-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Origin */}
        <section className="minecraft-border bg-card p-5 mb-4">
          <h2 className="font-pixel text-sm text-foreground mb-3">📖 Origin</h2>
          <p className="font-pixel-body text-xl text-foreground leading-relaxed">{language.origin}</p>
        </section>

        {/* Tribes */}
        <section className="minecraft-border bg-card p-5 mb-4">
          <h2 className="font-pixel text-sm text-foreground mb-3">🏘️ Tribes & Peoples</h2>
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
          <h2 className="font-pixel text-sm text-foreground mb-3">🔤 Alphabet</h2>
          <p className="font-pixel-body text-2xl text-foreground tracking-wider leading-loose">{language.alphabet}</p>
        </section>

        {/* Common phrases */}
        <section className="minecraft-border bg-card p-5 mb-4">
          <h2 className="font-pixel text-sm text-foreground mb-3">💬 Common Words & Phrases</h2>
          <div className="space-y-2">
            {language.commonPhrases.map((cp, i) => (
              <div key={i} className="flex justify-between items-center p-2 bg-muted/50">
                <span className="font-pixel-body text-xl text-foreground">{cp.phrase}</span>
                <span className="font-pixel-body text-lg text-muted-foreground">{cp.translation}</span>
              </div>
            ))}
          </div>
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
            📚 Open Dictionary (Wikipedia)
          </a>
        </div>

        {/* Locations & Countries */}
        <section className="minecraft-border bg-card p-5 mb-4">
          <h2 className="font-pixel text-sm text-foreground mb-3">
            🌍 Countries ({language.countries.length})
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
