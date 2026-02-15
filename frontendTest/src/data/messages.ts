import { useQuery } from '@tanstack/react-query';

export interface AppMessages {
  common: {
    statusLabels: Record<string, string>;
    loadingLanguages: string;
    failedToLoadLanguages: string;
  };
  navbar: {
    brand: string;
    worldView: string;
    archive: string;
    languageArchive: string;
    myRequests: string;
    manage: string;
    logIn: string;
    logOut: string;
  };
  login: {
    title: string;
    subtitle: string;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    invalidCredentials: string;
    submit: string;
  };
  index: {
    footer: string;
  };
  archive: {
    title: string;
    filterPlaceholder: string;
    empty: string;
  };
  adminManage: {
    title: string;
    tabAll: string;
    tabAdd: string;
    addComingSoon: string;
    view: string;
    edit: string;
    remove: string;
    countries: string;
    country: string;
  };
  adminRequests: {
    title: string;
    none: string;
    backendHint: string;
  };
  languageCard: {
    speakersSuffix: string;
    extinct: string;
    countries: string;
    country: string;
  };
  languageDetail: {
    loading: string;
    failed: string;
    notFound: string;
    backManage: string;
    backArchive: string;
    speakers: string;
    none: string;
    age: string;
    countries: string;
    hello: string;
    hearPronunciation: string;
    origin: string;
    tribes: string;
    alphabet: string;
    commonPhrases: string;
    openDictionary: string;
    countriesHeader: string;
  };
  interactiveMap: {
    searchPlaceholder: string;
    clearSearchTitle: string;
    zoomGlobal: string;
    zoomMedium: string;
    zoomClose: string;
    legend: string;
    clusterTitleSuffix: string;
    clickToZoom: string;
    details: string;
  };
  villager: {
    triggerTitle: string;
    imageAlt: string;
    title: string;
    description: string;
    menuSuggest: string;
    menuRandom: string;
    menuHome: string;
    suggestIntro: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    infoPlaceholder: string;
    back: string;
    submit: string;
    submitted: string;
    backToMenu: string;
    errors: {
      nameRequired: string;
      nameTooLong: string;
      emailRequired: string;
      emailInvalid: string;
      infoRequired: string;
      infoTooLong: string;
    };
  };
  notFound: {
    message: string;
    returnHome: string;
  };
}

export const defaultMessages: AppMessages = {
  common: {
    statusLabels: {
      active: 'Active',
      endangered: 'Endangered',
      vulnerable: 'Vulnerable',
      extinct: 'Extinct',
    },
    loadingLanguages: 'Loading languages...',
    failedToLoadLanguages: 'Failed to load languages.',
  },
  navbar: {
    brand: '⛏ LinguaCraft',
    worldView: 'World View',
    archive: 'Archive',
    languageArchive: 'Language Archive',
    myRequests: 'My Requests',
    manage: 'Manage',
    logIn: 'Log In',
    logOut: 'Log Out',
  },
  login: {
    title: '⛏ Admin Login',
    subtitle: 'Only admins can access this area.',
    usernamePlaceholder: 'Username',
    passwordPlaceholder: 'Password',
    invalidCredentials: 'Invalid username or password. Admin access only.',
    submit: 'Log In',
  },
  index: {
    footer: "⛏ LinguaCraft — Preserving the world's languages, one block at a time ⛏",
  },
  archive: {
    title: '📜 Language Archive',
    filterPlaceholder: 'Filter languages...',
    empty: 'No languages found. Hrmmm...',
  },
  adminManage: {
    title: '⚙️ Manage Languages',
    tabAll: 'All Languages',
    tabAdd: '+ Add Language',
    addComingSoon: '🚧 Add language form coming soon. Connect a backend to enable full CRUD operations.',
    view: 'View',
    edit: 'Edit',
    remove: 'Remove',
    countries: 'countries',
    country: 'country',
  },
  adminRequests: {
    title: '📬 User Requests',
    none: 'No pending requests yet. User suggestions submitted via the Villager will appear here.',
    backendHint: '🚧 Connect a backend to persist and manage requests.',
  },
  languageCard: {
    speakersSuffix: 'speakers',
    extinct: 'Extinct',
    countries: 'countries',
    country: 'country',
  },
  languageDetail: {
    loading: 'Loading language...',
    failed: 'Failed to load languages',
    notFound: 'Language not found!',
    backManage: '← Back to Manage',
    backArchive: '← Back to Archive',
    speakers: 'Speakers',
    none: 'None',
    age: 'Language Age',
    countries: 'Countries',
    hello: 'Hello',
    hearPronunciation: 'Hear pronunciation',
    origin: '📖 Origin',
    tribes: '🏘️ Tribes & Peoples',
    alphabet: '🔤 Alphabet',
    commonPhrases: '💬 Common Words & Phrases',
    openDictionary: '📚 Open Dictionary (Wikipedia)',
    countriesHeader: '🌍 Countries',
  },
  interactiveMap: {
    searchPlaceholder: '🔍 Search languages...',
    clearSearchTitle: 'Clear search',
    zoomGlobal: '🌍 Global View',
    zoomMedium: '🗺️ Regional View',
    zoomClose: '📍 Local View',
    legend: 'Legend',
    clusterTitleSuffix: 'languages',
    clickToZoom: 'Click to zoom in',
    details: 'Details →',
  },
  villager: {
    triggerTitle: 'Talk to the Villager',
    imageAlt: 'Minecraft Villager',
    title: '🏘️ Language Villager',
    description: 'Hrmmm... How can I help you, adventurer?',
    menuSuggest: '📜 Suggest a missing language',
    menuRandom: '🎲 Take me on a language adventure!',
    menuHome: '🏠 Back to the main menu',
    suggestIntro: "Can't find a language? Tell us about it and we'll look into adding it!",
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email',
    infoPlaceholder: 'Tell us about the language (name, region, any info you have)...',
    back: '← Back',
    submit: 'Submit',
    submitted: 'Thank you for your submission! Our team will review it and get back to you via email.',
    backToMenu: '← Back to menu',
    errors: {
      nameRequired: 'Name is required.',
      nameTooLong: 'Name must be under 100 characters.',
      emailRequired: 'Email is required.',
      emailInvalid: 'Please enter a valid email address.',
      infoRequired: 'Please tell us about the language.',
      infoTooLong: 'Description must be under 1000 characters.',
    },
  },
  notFound: {
    message: 'Oops! Page not found',
    returnHome: 'Return to Home',
  },
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const deepMerge = <T extends Record<string, unknown>>(base: T, override: unknown): T => {
  if (!isObject(override)) return base;

  const output: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = output[key];
    if (isObject(baseValue) && isObject(value)) {
      output[key] = deepMerge(baseValue, value);
    } else {
      output[key] = value;
    }
  }
  return output as T;
};

const fetchMessages = async (): Promise<AppMessages> => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const candidates = [
    `${normalizedBase}messages.json`,
    '/messages.json',
    '/static/messages.json',
  ];

  for (const path of candidates) {
    try {
      const response = await fetch(path);
      if (!response.ok) continue;
      const raw = await response.json();
      return deepMerge(defaultMessages, raw) as AppMessages;
    } catch {
      continue;
    }
  }

  return defaultMessages;
};

export const useMessages = () =>
  useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    initialData: defaultMessages,
    staleTime: 5 * 60 * 1000,
  });
