export type LanguageStatus = 'active' | 'endangered' | 'vulnerable' | 'extinct';

export interface LanguageLocation {
  name: string;
  lat: number;
  lng: number;
}

export interface Language {
  id: string;
  name: string;
  family: string;
  status: LanguageStatus;
  speakers: number;
  age: string;
  hello: string;
  origin: string;
  tribes: string[];
  alphabet: string;
  commonPhrases: { phrase: string; translation: string }[];
  countries: string[];
  locations: LanguageLocation[];
  description: string;
}

export const languages: Language[] = [
  {
    id: 'english',
    name: 'English',
    family: 'Germanic',
    status: 'active',
    speakers: 1500000000,
    age: '~1,400 years',
    hello: 'Hello',
    origin: 'English evolved from Anglo-Saxon (Old English) brought to Britain by Germanic settlers in the 5th century. It absorbed Norman French, Latin, and Norse influences to become the global lingua franca it is today.',
    tribes: ['Anglo-Saxons', 'Jutes', 'Frisians'],
    alphabet: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
    commonPhrases: [
      { phrase: 'Thank you', translation: 'Expression of gratitude' },
      { phrase: 'Goodbye', translation: 'Farewell' },
      { phrase: 'Please', translation: 'Polite request' },
      { phrase: 'How are you?', translation: 'Greeting inquiry' },
    ],
    countries: ['United Kingdom', 'United States', 'Canada', 'Australia', 'New Zealand', 'India', 'South Africa'],
    locations: [
      { name: 'London, United Kingdom', lat: 51.5074, lng: -0.1278 },
      { name: 'Washington D.C., United States', lat: 38.9072, lng: -77.0369 },
      { name: 'Ottawa, Canada', lat: 45.4215, lng: -75.6972 },
      { name: 'Canberra, Australia', lat: -35.2809, lng: 149.1300 },
      { name: 'Wellington, New Zealand', lat: -41.2866, lng: 174.7756 },
      { name: 'New Delhi, India', lat: 28.6139, lng: 77.2090 },
      { name: 'Pretoria, South Africa', lat: -25.7479, lng: 28.2293 },
    ],
    description: 'A West Germanic language and the most widely spoken language in the world by total speakers.',
  },
  {
    id: 'telugu',
    name: 'Telugu',
    family: 'Dravidian',
    status: 'active',
    speakers: 83000000,
    age: '~2,000 years',
    hello: 'నమస్కారం (Namaskāram)',
    origin: 'Telugu evolved from Proto-Dravidian and has inscriptions dating back to 575 CE. It flourished under the Satavahana, Kakatiya, and Vijayanagara empires, developing a rich literary tradition.',
    tribes: ['Telugu people', 'Kakatiya', 'Reddy', 'Kamma'],
    alphabet: 'అ ఆ ఇ ఈ ఉ ఊ ఋ ఎ ఏ ఐ ఒ ఓ ఔ (Telugu script)',
    commonPhrases: [
      { phrase: 'ధన్యవాదాలు', translation: 'Thank you (Dhanyavādālu)' },
      { phrase: 'వెళ్ళొస్తాను', translation: 'Goodbye (Veḷḷostānu)' },
      { phrase: 'అవును', translation: 'Yes (Avunu)' },
      { phrase: 'కాదు', translation: 'No (Kādu)' },
    ],
    countries: ['India'],
    locations: [
      { name: 'Hyderabad, India', lat: 17.3850, lng: 78.4867 },
    ],
    description: 'A classical Dravidian language, one of the official languages of India, known as the "Italian of the East" for its mellifluous quality.',
  },
  {
    id: 'cree',
    name: 'Cree',
    family: 'Algonquian',
    status: 'endangered',
    speakers: 96000,
    age: '~3,000 years',
    hello: 'ᑕᓂᓯ (Tânisi)',
    origin: 'Cree is an Algonquian language spoken by the Cree people across Canada, from Alberta to Quebec. It is one of the most widely spoken Indigenous languages in North America, with deep roots in the land and oral traditions.',
    tribes: ['Plains Cree', 'Woods Cree', 'Swampy Cree', 'Moose Cree', 'James Bay Cree'],
    alphabet: 'ᐁ ᐃ ᐅ ᐊ ᐯ ᐱ ᐳ ᐸ ᑌ ᑎ ᑐ ᑕ ᑫ ᑭ ᑯ ᑲ (Canadian Aboriginal syllabics)',
    commonPhrases: [
      { phrase: 'ᑭᓇᓈᐢᑯᒥᑎᐣ', translation: 'Thank you (Kinanâskomitin)' },
      { phrase: 'ᐁᑿ ᒥᓇ', translation: 'See you again (Êkwa mîna)' },
      { phrase: 'ᐁᐦᐁ', translation: 'Yes (Êhê)' },
      { phrase: 'ᓇᒧᔭ', translation: 'No (Namôya)' },
    ],
    countries: ['Canada'],
    locations: [
      { name: 'Northern Alberta, Canada', lat: 54.0, lng: -116.0 },
    ],
    description: 'One of the most widely spoken Indigenous languages in Canada, with several dialect groups spanning from Alberta to Quebec.',
  },
  {
    id: 'greek',
    name: 'Greek',
    family: 'Hellenic',
    status: 'active',
    speakers: 13500000,
    age: '~3,400 years',
    hello: 'Γεια σου (Yia sou)',
    origin: 'Greek has the longest documented history of any Indo-European language, with records spanning over 3,400 years. It was the language of Homer, Plato, and Aristotle, foundational to Western civilization.',
    tribes: ['Ancient Greeks', 'Athenians', 'Spartans', 'Ionians', 'Dorians'],
    alphabet: 'Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω',
    commonPhrases: [
      { phrase: 'Ευχαριστώ', translation: 'Thank you (Efcharistó)' },
      { phrase: 'Αντίο', translation: 'Goodbye (Antío)' },
      { phrase: 'Ναι', translation: 'Yes (Nai)' },
      { phrase: 'Όχι', translation: 'No (Óchi)' },
    ],
    countries: ['Greece', 'Cyprus'],
    locations: [
      { name: 'Athens, Greece', lat: 37.9838, lng: 23.7275 },
      { name: 'Nicosia, Cyprus', lat: 35.1856, lng: 33.3823 },
    ],
    description: 'One of the oldest recorded languages, foundational to Western civilization, philosophy, science, and democracy.',
  },
  {
    id: 'persian',
    name: 'Persian',
    family: 'Indo-Iranian',
    status: 'active',
    speakers: 110000000,
    age: '~2,500 years',
    hello: 'سلام (Salaam)',
    origin: 'Persian descends from Old Persian of the Achaemenid Empire and has a rich literary tradition spanning millennia, including legendary poets like Rumi, Hafez, and Ferdowsi.',
    tribes: ['Persians', 'Tajiks', 'Hazara', 'Dari speakers'],
    alphabet: 'ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی',
    commonPhrases: [
      { phrase: 'ممنون', translation: 'Thank you (Mamnun)' },
      { phrase: 'خداحافظ', translation: 'Goodbye (Khodahafez)' },
      { phrase: 'بله', translation: 'Yes (Baleh)' },
      { phrase: 'نه', translation: 'No (Na)' },
    ],
    countries: ['Iran', 'Afghanistan', 'Tajikistan'],
    locations: [
      { name: 'Tehran, Iran', lat: 35.6892, lng: 51.3890 },
      { name: 'Kabul, Afghanistan', lat: 34.5553, lng: 69.2075 },
      { name: 'Dushanbe, Tajikistan', lat: 38.5598, lng: 68.7740 },
    ],
    description: 'An ancient Indo-Iranian language with one of the richest literary traditions in human history.',
  },
  {
    id: 'blackfoot',
    name: 'Blackfoot',
    family: 'Algonquian',
    status: 'endangered',
    speakers: 5100,
    age: '~3,000 years',
    hello: 'Oki',
    origin: 'Blackfoot (Siksiká) is an Algonquian language spoken by the Blackfoot Confederacy in southern Alberta and northern Montana. The Siksika, Piikani, and Kainai nations have called the prairies near modern-day Calgary home for thousands of years.',
    tribes: ['Siksika (Blackfoot)', 'Piikani (Peigan)', 'Kainai (Blood)', 'Amskapi Piikani (Blackfeet)'],
    alphabet: 'A Á AA I Í II O Ó OO S P T K M N W Y H (Latin-based orthography)',
    commonPhrases: [
      { phrase: 'Oki', translation: 'Hello' },
      { phrase: 'Anniaahk', translation: 'Thank you' },
      { phrase: 'Áa', translation: 'Yes' },
      { phrase: 'Saa', translation: 'No' },
    ],
    countries: ['Canada', 'United States'],
    locations: [
      { name: 'Siksika Nation, Alberta, Canada', lat: 50.8833, lng: -112.8833 },
      { name: 'Browning, Montana, United States', lat: 48.5566, lng: -113.0066 },
    ],
    description: 'An endangered Algonquian language of the Blackfoot Confederacy, whose traditional territory spans southern Alberta near Calgary and northern Montana.',
  },
  {
    id: 'michif',
    name: 'Michif',
    family: 'Mixed (Cree-French)',
    status: 'endangered',
    speakers: 730,
    age: '~300 years',
    hello: 'Bonjour/Tânisi',
    origin: 'Michif is a unique mixed language of the Métis people, combining Plains Cree verbs with Canadian French nouns. It emerged in the early 19th century in the Red River Settlement and spread across the Canadian prairies.',
    tribes: ['Métis people', 'Red River Métis'],
    alphabet: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z (Latin-based)',
    commonPhrases: [
      { phrase: 'Marsii', translation: 'Thank you (from French merci)' },
      { phrase: 'Bonn nwee', translation: 'Good night' },
      { phrase: 'Wii', translation: 'Yes' },
      { phrase: 'Noo', translation: 'No' },
    ],
    countries: ['Canada', 'United States'],
    locations: [
      { name: 'Winnipeg, Manitoba, Canada', lat: 49.8951, lng: -97.1384 },
      { name: 'Turtle Mountain, North Dakota, United States', lat: 48.8411, lng: -99.7432 },
    ],
    description: 'A critically endangered mixed language of the Métis people, uniquely blending Cree and French into a distinct linguistic system.',
  },
  {
    id: 'inuktitut',
    name: 'Inuktitut',
    family: 'Eskimo-Aleut',
    status: 'vulnerable',
    speakers: 39770,
    age: '~4,000 years',
    hello: 'ᐊᐃ (Ai)',
    origin: 'Inuktitut is an Inuit language spoken across the Canadian Arctic, from Labrador to the Western Arctic. It is one of the official languages of Nunavut and the Northwest Territories, central to Inuit identity and culture.',
    tribes: ['Inuit', 'Nunavummiut', 'Nunavimmiut', 'Labradormiut'],
    alphabet: 'ᐊ ᐃ ᐅ ᐸ ᐱ ᐳ ᑕ ᑎ ᑐ ᑲ ᑭ ᑯ ᒪ ᒥ ᒧ (Canadian Aboriginal syllabics)',
    commonPhrases: [
      { phrase: 'ᖁᔭᓐᓇᒦᒃ', translation: 'Thank you (Qujannamiik)' },
      { phrase: 'ᑕᕙᐅᔪᖅ', translation: 'Goodbye' },
      { phrase: 'ᐄ', translation: 'Yes (Ii)' },
      { phrase: 'ᐋᒡᒐ', translation: 'No (Aagga)' },
    ],
    countries: ['Canada'],
    locations: [
      { name: 'Iqaluit, Nunavut, Canada', lat: 63.7467, lng: -68.5170 },
    ],
    description: 'An Inuit language and one of the official languages of Nunavut, vital to the cultural identity of the Inuit people of the Canadian Arctic.',
  },
  {
    id: 'latin',
    name: 'Latin',
    family: 'Italic',
    status: 'extinct',
    speakers: 0,
    age: '~2,700 years',
    hello: 'Salve',
    origin: 'Latin originated in the region of Latium in central Italy and became the language of the Roman Empire. It evolved into the Romance languages (Spanish, French, Italian, Portuguese, Romanian) and remains used in academia, law, and the Vatican.',
    tribes: ['Latins', 'Romans'],
    alphabet: 'A B C D E F G H I K L M N O P Q R S T V X Y Z',
    commonPhrases: [
      { phrase: 'Gratias tibi', translation: 'Thank you' },
      { phrase: 'Vale', translation: 'Goodbye' },
      { phrase: 'Ita', translation: 'Yes' },
      { phrase: 'Non', translation: 'No' },
    ],
    countries: ['Vatican City', 'Italy'],
    locations: [
      { name: 'Vatican City', lat: 41.9029, lng: 12.4534 },
      { name: 'Rome, Italy', lat: 41.9028, lng: 12.4964 },
    ],
    description: 'An ancient Italic language, the ancestor of all Romance languages. Still used in academia, science, law, and the Vatican.',
  },
  {
    id: 'ancient-egyptian',
    name: 'Ancient Egyptian',
    family: 'Afroasiatic',
    status: 'extinct',
    speakers: 0,
    age: '~5,000 years',
    hello: 'Iiti (𓇋𓇋𓏏𓇋)',
    origin: 'Ancient Egyptian was spoken in the Nile Valley from around 3100 BCE. Its hieroglyphic writing system is one of the earliest in human history. The language evolved through Old, Middle, Late, and Demotic stages before being succeeded by Coptic.',
    tribes: ['Ancient Egyptians', 'Pharaonic dynasties'],
    alphabet: '𓀀 𓁀 𓂀 𓃀 𓄀 𓅀 𓆀 𓇀 𓈀 𓉀 𓊀 𓋀 (Hieroglyphs)',
    commonPhrases: [
      { phrase: '𓂋𓏤𓈖𓆑', translation: 'Peace / Greetings' },
      { phrase: '𓂋𓏤𓏏𓇋', translation: 'Life, prosperity, health' },
    ],
    countries: ['Egypt', 'Sudan'],
    locations: [
      { name: 'Luxor, Egypt', lat: 25.6872, lng: 32.6396 },
      { name: 'Khartoum, Sudan', lat: 15.5007, lng: 32.5599 },
    ],
    description: 'One of the oldest recorded languages in human history, written in hieroglyphs, hieratic, and demotic scripts across five millennia of Egyptian civilization.',
  },
];

export const villagerResponses: Record<string, string> = {
  'hello': 'Hrmmm... Welcome to LinguaCraft! I am the Language Villager. Ask me about any language!',
  'hi': 'Hrmmm... Welcome to LinguaCraft! I am the Language Villager. Ask me about any language!',
  'what is this': 'Hrmmm... This is LinguaCraft, a magical archive of world languages! Explore the globe or browse the archive!',
  'how many languages': `Hrmmm... We currently have 10 languages in our archive! Each one tells a unique story.`,
  'endangered': 'Hrmmm... Languages like Cree, Blackfoot, and Michif need our help to survive! Explore them on the globe!',
  'help': 'Hrmmm... You can explore the globe, search for languages, or click Language Archive to browse all languages!',
  'who are you': "Hrmmm... I am the Language Villager! I trade in knowledge of the world's languages. Ask me anything!",
  'default': "Hrmmm... I don't quite understand. Try asking about languages, endangered languages, or how to use LinguaCraft!",
};
