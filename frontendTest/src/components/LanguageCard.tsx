import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import type { Language } from '@/data/languages';

const statusLabels: Record<string, string> = {
  active: 'Active',
  endangered: 'Endangered',
  vulnerable: 'Vulnerable',
  extinct: 'Extinct',
};

const LanguageCard = ({ language }: { language: Language }) => {
  return (
    <Link
      to={`/language/${language.id}`}
      className="minecraft-border bg-card hover:scale-[1.04] hover:bg-accent/25 hover:shadow-xl transition-all duration-200 block p-5 group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-pixel text-xs text-foreground uppercase group-hover:text-accent-foreground transition-colors">
          {language.name}
        </h3>
        <span className={`status-${language.status} px-2 py-1 font-pixel text-[8px] shrink-0`}>
          {statusLabels[language.status]}
        </span>
      </div>
      <div className="border-t border-border pt-3 mb-3">
        <span className="font-pixel-body text-base text-muted-foreground">{language.family}</span>
      </div>
      <p className="font-pixel-body text-lg text-muted-foreground mb-4 line-clamp-2 group-hover:text-foreground transition-colors">
        {language.description}
      </p>
      <div className="border-t border-border pt-3 flex items-center justify-between">
        <span className="font-pixel-body text-base text-muted-foreground">
          👥 {language.speakers > 0 ? language.speakers.toLocaleString() + ' speakers' : 'Extinct'}
        </span>
        <span className="font-pixel-body text-base text-muted-foreground flex items-center gap-1">
          <Globe className="w-3 h-3" />
          {language.countries.length} {language.countries.length !== 1 ? 'countries' : 'country'}
        </span>
      </div>
    </Link>
  );
};

export default LanguageCard;
