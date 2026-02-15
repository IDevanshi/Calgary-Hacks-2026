import { useQuery } from '@tanstack/react-query';

export interface LanguageLocation {
  name: string;
  lat: number;
  lng: number;
}

export interface Language {
  id: string;
  name: string;
  family: string;
  status: string;
  speakers: number;
  age: string;
  hello: string;
  origin: string;
  languageFamily: string[];
  tribes: string[];
  alphabet: string;
  commonPhrases: { phrase: string; translation: string }[];
  countries: string[];
  locations: LanguageLocation[];
  description: string;
  wikipediaPage?: string;
  dictionaryLinks?: string[];
  writingSystems?: string[];
}

interface RawDatabaseLanguage {
  language: string;
  language_code?: string;
  speakers_estimate: number | string | null;
  countries: string[];
  locations?: Array<{ name: string; lat: number | string; lng: number | string }>;
  writing_systems?: string[];
  alphabets?: Record<string, string[]>;
  language_family?: string[];
  early_forms?: string[];
  dictionary_links?: string[];
  summary?: string;
  wikidata_id?: string;
  wikipedia_page?: string;
  latitude?: string | number | null;
  longitude?: string | number | null;
  endangerment_status?: string;
}

type RawLanguageCollection = RawDatabaseLanguage[] | Record<string, RawDatabaseLanguage>;

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const parseSpeakers = (speakers: RawDatabaseLanguage['speakers_estimate']): number => {
  if (typeof speakers === 'number') return Number.isFinite(speakers) ? speakers : 0;
  if (typeof speakers === 'string') {
    const cleaned = speakers.replace(/[^0-9]/g, '');
    return cleaned ? parseInt(cleaned, 10) : 0;
  }
  return 0;
};

const parseCoordinate = (value: RawDatabaseLanguage['latitude']): number | null => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const getStatus = (rawStatus: string | undefined): string => {
  if (!rawStatus || !rawStatus.trim()) return 'active';
  const normalized = rawStatus.trim().toLowerCase();
  if (normalized.includes('not endangered') || normalized === 'active') return 'active';
  if (normalized.includes('threatened') || normalized.includes('shifting') || normalized.includes('vulnerable')) return 'threatened';
  if (normalized.includes('nearly extinct') || normalized.includes('endangered')) return 'nearly extinct';
  if (normalized.includes('extinct') || normalized.includes('dormant')) return 'extinct';
  return rawStatus.trim().toLowerCase();
};

const getAlphabet = (raw: RawDatabaseLanguage): string => {
  const writingSystem = raw.writing_systems?.[0];
  if (!writingSystem || !raw.alphabets) return 'Unknown';

  const chars = raw.alphabets[writingSystem];
  if (!chars || chars.length === 0) return writingSystem;

  const sample = chars.slice(0, 40).join(' ');
  return `${writingSystem}: ${sample}`;
};

const getAge = (raw: RawDatabaseLanguage): string => {
  const formsCount = raw.early_forms?.length ?? 0;
  if (formsCount > 0) return `~${formsCount} documented historical forms`;
  return 'Unknown';
};

const buildLocations = (raw: RawDatabaseLanguage): LanguageLocation[] => {
  if (raw.locations && raw.locations.length > 0) {
    const mapped = raw.locations
      .map((loc) => {
        const lat = parseCoordinate(loc.lat);
        const lng = parseCoordinate(loc.lng);
        if (lat === null || lng === null) return null;
        return { name: loc.name || raw.language, lat, lng };
      })
      .filter((loc): loc is LanguageLocation => loc !== null);
    if (mapped.length > 0) return mapped;
  }

  const lat = parseCoordinate(raw.latitude);
  const lng = parseCoordinate(raw.longitude);

  if (lat === null || lng === null) {
    return [{ name: raw.countries[0] || raw.language, lat: 0, lng: 0 }];
  }

  if (raw.countries.length === 0) {
    return [{ name: raw.language, lat, lng }];
  }

  return raw.countries.map((country, index) => ({
    name: country,
    lat: lat + index * 0.15,
    lng: lng + index * 0.15,
  }));
};

const normalizeLanguage = (raw: RawDatabaseLanguage, codeFromKey?: string): Language => {
  const speakers = parseSpeakers(raw.speakers_estimate);
  const summary = raw.summary?.trim() || `${raw.language} language entry from database.`;

  return {
    id: raw.language_code?.trim() || codeFromKey || slugify(raw.language),
    name: raw.language,
    family: raw.language_family?.[0] || 'Unknown',
    status: getStatus(raw.endangerment_status),
    speakers,
    age: getAge(raw),
    hello: raw.language,
    origin: summary,
    languageFamily: raw.language_family || [],
    tribes: [],
    alphabet: getAlphabet(raw),
    commonPhrases: [],
    countries: raw.countries || [],
    locations: buildLocations(raw),
    description: summary,
    wikipediaPage: raw.wikipedia_page,
    dictionaryLinks: raw.dictionary_links,
    writingSystems: raw.writing_systems,
  };
};

const normalizeCollection = (raw: RawLanguageCollection): Language[] => {
  if (Array.isArray(raw)) {
    return raw.map((entry) => normalizeLanguage(entry));
  }

  return Object.entries(raw).map(([code, entry]) => normalizeLanguage(entry, code));
};

const fetchLanguages = async (): Promise<Language[]> => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const candidates = [
    `${normalizedBase}new_database.json`,
    '/new_database.json',
    '/static/new_database.json',
    `${normalizedBase}database.json`,
    '/database.json',
    '/static/database.json',
  ];
  let raw: RawLanguageCollection | null = null;
  const failed: string[] = [];

  for (const path of candidates) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        failed.push(`${path} (${response.status})`);
        continue;
      }
      raw = (await response.json()) as RawLanguageCollection;
      break;
    } catch {
      failed.push(`${path} (network error)`);
    }
  }

  if (!raw) {
    throw new Error(`Failed to load languages JSON. Tried: ${failed.join(', ')}`);
  }

  return normalizeCollection(raw)
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const useLanguages = () =>
  useQuery({
    queryKey: ['languages'],
    queryFn: fetchLanguages,
    staleTime: 5 * 60 * 1000,
  });
