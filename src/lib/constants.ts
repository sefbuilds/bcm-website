export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Events", href: "/events" },
  { label: "Leden", href: "/leden" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
];

export const EVENT_TAGS = [
  "Netwerken",
  "Borrel",
  "Diner",
  "Sociaal",
  "Business",
  "Masterclass",
  "Bestuur",
  "Activiteit",
] as const;

export const MALLORCA_REGIONS = [
  "Alcúdia",
  "Andratx",
  "Artà",
  "Bendinat",
  "Binissalem",
  "Cala d'Or",
  "Cala Ratjada",
  "Capdepera",
  "Colònia de Sant Jordi",
  "Deià",
  "Esporles",
  "Felanitx",
  "Illetes",
  "Magaluf",
  "Manacor",
  "Overal",
  "Palma",
  "Palma Centro",
  "Pollença",
  "Port Adriano",
  "Port d'Andratx",
  "Port de Pollença",
  "Port de Sóller",
  "Portals Nous",
  "Puerto Portals",
  "Santa Maria del Camí",
  "Santa Ponsa",
  "Santanyí",
  "Sóller",
  "Valldemossa",
] as const;

export type CountryCode = {
  code: string; // dial code without +
  iso: string; // ISO 3166-1 alpha-2
  label: string;
  flag: string;
};

export const COUNTRY_CODES: CountryCode[] = [
  { iso: "ES", code: "34", label: "Spanje", flag: "🇪🇸" },
  { iso: "NL", code: "31", label: "Nederland", flag: "🇳🇱" },
  { iso: "BE", code: "32", label: "België", flag: "🇧🇪" },
  { iso: "DE", code: "49", label: "Duitsland", flag: "🇩🇪" },
  { iso: "FR", code: "33", label: "Frankrijk", flag: "🇫🇷" },
  { iso: "GB", code: "44", label: "Verenigd Koninkrijk", flag: "🇬🇧" },
  { iso: "IE", code: "353", label: "Ierland", flag: "🇮🇪" },
  { iso: "IT", code: "39", label: "Italië", flag: "🇮🇹" },
  { iso: "PT", code: "351", label: "Portugal", flag: "🇵🇹" },
  { iso: "CH", code: "41", label: "Zwitserland", flag: "🇨🇭" },
  { iso: "AT", code: "43", label: "Oostenrijk", flag: "🇦🇹" },
  { iso: "LU", code: "352", label: "Luxemburg", flag: "🇱🇺" },
  { iso: "DK", code: "45", label: "Denemarken", flag: "🇩🇰" },
  { iso: "SE", code: "46", label: "Zweden", flag: "🇸🇪" },
  { iso: "NO", code: "47", label: "Noorwegen", flag: "🇳🇴" },
  { iso: "US", code: "1", label: "Verenigde Staten", flag: "🇺🇸" },
  { iso: "ZA", code: "27", label: "Zuid-Afrika", flag: "🇿🇦" },
  { iso: "AE", code: "971", label: "Verenigde Arabische Emiraten", flag: "🇦🇪" },
];

export const SITE_INFO = {
  name: "NBCM",
  fullName: "Nederlandstalige Business Club Mallorca",
  tagline: "Ondernemen op Mallorca, samen sterker.",
  subtagline:
    "Het netwerk voor Nederlandstalige ondernemers op de Balearen.",
  motto:
    "Samen kunnen we meer, samen weten we meer en samen verdienen we meer.",
  email: "info@nbcmallorca.com",
  location: "Mallorca, Balearen",
  foundedYear: 2019,
  facebookUrl: "https://facebook.com",
};

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=80`;

export const STOCK_IMAGES = {
  heroAtmosphere: UNSPLASH("photo-1534430480872-3498386e7856", 2000),
  mediterraneanDinner: UNSPLASH("photo-1530103862676-de8c9debad1d", 1400),
  fincaMallorca: UNSPLASH("photo-1601581875039-e899893d520c", 1400),
  yachtHarbor: UNSPLASH("photo-1503785640985-f62e3aeee448"),
  wineCheers: UNSPLASH("photo-1519671482749-fd09be7ccebf"),
  terraceView: UNSPLASH("photo-1414235077428-338989a2e8c0"),
  palmaStreets: UNSPLASH("photo-1518548419970-58e3b4079ab2"),
  oliveGrove: UNSPLASH("photo-1500530855697-b586d89ba3ee"),
  coastSunset: UNSPLASH("photo-1506929562872-bb421503ef21"),
  businessMeeting: UNSPLASH("photo-1556761175-5973dc0f32e7"),
  luxuryInterior: UNSPLASH("photo-1564501049412-61c2a3083791"),
  mallorcaCoast: UNSPLASH("photo-1519046904884-53103b34b206", 2000),
  candlelitDinner: UNSPLASH("photo-1529156069898-49953e39b3ac"),
};

export const GALLERY_IMAGES = [
  { src: STOCK_IMAGES.mediterraneanDinner, alt: "Mediterraan diner bij kaarslicht" },
  { src: STOCK_IMAGES.wineCheers, alt: "Proosten met wijn" },
  { src: STOCK_IMAGES.yachtHarbor, alt: "Jachthaven Mallorca" },
  { src: STOCK_IMAGES.terraceView, alt: "Terras met uitzicht" },
  { src: STOCK_IMAGES.palmaStreets, alt: "Straten van Palma" },
  { src: STOCK_IMAGES.coastSunset, alt: "Kust bij zonsondergang" },
  { src: STOCK_IMAGES.oliveGrove, alt: "Olijfgaard" },
  { src: STOCK_IMAGES.candlelitDinner, alt: "Diner bij kaarslicht" },
];

export const MOTTO_LINES = [
  "kunnen we meer",
  "weten we meer",
  "verdienen we meer",
];

export type BoardMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const BOARD_MEMBERS: BoardMember[] = [
  {
    name: "Sybrand Sijbertsma",
    role: "Voorzitter",
    bio: "Geeft leiding aan het bestuur en bewaakt de koers van de club. Uitgebreid profiel volgt na intake.",
    initials: "SS",
  },
  {
    name: "Vincent Werner",
    role: "Bestuurslid · voormalig voorzitter",
    bio: "Bouwde de club mee op vanuit de beginjaren en blijft betrokken als bestuurslid. Uitgebreid profiel volgt na intake.",
    initials: "VW",
  },
  {
    name: "Jan Mulder",
    role: "Bestuurslid · mede-oprichter",
    bio: "Mede-oprichter van NBCM en al jaren een verbindende factor in de Nederlandstalige gemeenschap op Mallorca. Uitgebreid profiel volgt na intake.",
    initials: "JM",
  },
  {
    name: "Ingrid van de Reijt",
    role: "Honorair Consul",
    bio: "Bouwt bruggen tussen de Nederlandstalige gemeenschap en lokale instituties op Mallorca. Uitgebreid profiel volgt na intake.",
    initials: "IR",
  },
  {
    name: "Clarice",
    role: "Bestuurslid",
    bio: "Achternaam en uitgebreid profiel volgen na intake.",
    initials: "C",
  },
  {
    name: "Maurits Stock",
    role: "Bestuurslid",
    bio: "Uitgebreid profiel volgt na intake.",
    initials: "MS",
  },
  {
    name: "Stefan Beekwilder",
    role: "Bestuurslid",
    bio: "Bestuurslid en verbonden aan Clarosea (hoofdsponsor). Uitgebreid profiel volgt na intake.",
    initials: "SB",
  },
];

export type Event = {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  description: string;
  tag?: string;
};

export const NEXT_EVENT: Event = {
  id: "zomerborrel-2026",
  day: "12",
  month: "JUN",
  year: "2026",
  title: "Zomerborrel & Netwerkevent",
  location: "Hotel Bendinat, Palma de Mallorca",
  time: "17:30 - 21:00",
  description:
    "Start de zomer met een ontspannen borrel aan zee. Onder het genot van een hapje en drankje bouwen we verder aan ons netwerk en verkennen we nieuwe samenwerkingen.",
  tag: "Netwerken",
};

export type EventWithPhotos = Event & {
  photos?: string[];
};

export const RECENT_EVENT: EventWithPhotos = {
  id: "networkborrel-26-mrt-2026",
  day: "26",
  month: "MRT",
  year: "2026",
  title: "Voorjaarsborrel & Netwerkavond",
  location: "Palma de Mallorca",
  time: "18:30 - 22:00",
  description:
    "Een warme voorjaarsavond met leden, nieuwe gezichten en genodigden. Veel goede gesprekken, introducties en plannen voor de komende maanden.",
  tag: "Netwerken",
  photos: [
    "/events/26-mrt-2026/networkborrel-01.jpeg",
    "/events/26-mrt-2026/networkborrel-02.jpeg",
    "/events/26-mrt-2026/networkborrel-03.jpeg",
    "/events/26-mrt-2026/networkborrel-04.jpeg",
    "/events/26-mrt-2026/networkborrel-05.jpeg",
    "/events/26-mrt-2026/networkborrel-06.jpeg",
  ],
};

export const PAST_EVENTS: Event[] = [
  {
    id: "lente-diner-2026",
    day: "15",
    month: "APR",
    year: "2026",
    title: "Lente Netwerkdiner",
    location: "Restaurant Molí des Torrent, Santa Maria",
    time: "19:00 - 23:00",
    description:
      "Een gezellig diner in een van de charmantste locaties van het binnenland, waar we samen het nieuwe seizoen inluidden.",
    tag: "Diner",
  },
  {
    id: "masterclass-2026",
    day: "06",
    month: "MRT",
    year: "2026",
    title: "Masterclass: Ondernemen in Spanje",
    location: "Port Adriano",
    time: "10:00 - 13:00",
    description:
      "Een praktische sessie over de juridische en fiscale kant van zakendoen op de Balearen, gevolgd door een lunch.",
    tag: "Masterclass",
  },
  {
    id: "nieuwjaarsborrel-2026",
    day: "18",
    month: "JAN",
    year: "2026",
    title: "Nieuwjaarsborrel",
    location: "Palma de Mallorca",
    time: "18:00 - 22:00",
    description:
      "Een warme aftrap van het nieuwe jaar met leden, partners en nieuwe gezichten.",
    tag: "Borrel",
  },
  {
    id: "kerstdiner-2025",
    day: "14",
    month: "DEC",
    year: "2025",
    title: "Kerstdiner",
    location: "Finca op Mallorca",
    time: "18:30 - 23:30",
    description:
      "Ons traditionele kerstdiner op een sfeervolle finca, om samen het jaar af te sluiten.",
    tag: "Diner",
  },
  {
    id: "haven-borrel-2025",
    day: "22",
    month: "OKT",
    year: "2025",
    title: "Havenborrel Puerto Portals",
    location: "Puerto Portals",
    time: "18:00 - 21:30",
    description:
      "Een herfstige borrel aan de haven, met uitzicht op de jachten en volop ruimte voor goede gesprekken.",
    tag: "Borrel",
  },
  {
    id: "wijnproeverij-2025",
    day: "08",
    month: "SEP",
    year: "2025",
    title: "Wijnproeverij op de Finca",
    location: "Binissalem",
    time: "16:00 - 20:00",
    description:
      "Een middag tussen de wijngaarden, waarbij lokale wijnen en verhalen van ondernemers elkaar vonden.",
    tag: "Sociaal",
  },
];

export type ValueProp = {
  title: string;
  description: string;
  icon: "users" | "briefcase" | "trending";
};

export const VALUE_PROPS: ValueProp[] = [
  {
    title: "Premium networking",
    description:
      "Ontmoet Nederlandstalige ondernemers op Mallorca in een open, persoonlijke sfeer zonder verkooppraatjes.",
    icon: "users",
  },
  {
    title: "Business opportunities",
    description:
      "Ontdek samenwerkingen, klanten en leveranciers binnen een vertrouwd netwerk van ervaren ondernemers.",
    icon: "briefcase",
  },
  {
    title: "Samen groeien",
    description:
      "Deel kennis en ervaring tijdens borrels, diners en masterclasses, en groei zakelijk én persoonlijk.",
    icon: "trending",
  },
];

export type MembershipTier = {
  id: "member" | "partner" | "sponsor";
  eyebrow: string;
  title: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaHref: string;
  accent: "terracotta" | "gold" | "navy";
};

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "member",
    eyebrow: "Member",
    title: "Individueel lidmaatschap",
    description:
      "Voor Nederlandstalige ondernemers die willen netwerken, verbinden en leren van andere leden.",
    benefits: [
      "Toegang tot maandelijkse events",
      "Opname in de ledenlijst",
      "Persoonlijke introducties binnen het netwerk",
      "Toegang tot de online community",
    ],
    ctaText: "Word Member",
    ctaHref: "/intake?tier=member",
    accent: "terracotta",
  },
  {
    id: "partner",
    eyebrow: "Partner",
    title: "Zakelijke samenwerking",
    description:
      "Voor bedrijven die hun netwerk actief willen uitbreiden en zichtbaarheid willen binnen de club.",
    benefits: [
      "Alle voordelen van Member",
      "Logo-zichtbaarheid op de website",
      "Zichtbaarheid tijdens events",
      "Mogelijkheid tot co-hosting",
    ],
    ctaText: "Word Partner",
    ctaHref: "/intake?tier=partner",
    accent: "gold",
  },
  {
    id: "sponsor",
    eyebrow: "Sponsor",
    title: "Hoofdsponsor van de club",
    description:
      "Voor organisaties die zich strategisch willen positioneren als hoofdpartner van NBCM op Mallorca.",
    benefits: [
      "Alle voordelen van Partner",
      "Prominente vermelding en profielpagina",
      "Spreekmogelijkheden tijdens events",
      "Strategische positionering",
    ],
    ctaText: "Word Sponsor",
    ctaHref: "/intake?tier=sponsor",
    accent: "navy",
  },
];

export const MEMBERSHIP_STEPS = [
  {
    step: "01",
    title: "Aanmelden",
    description:
      "Vul het aanmeldformulier in. We nemen persoonlijk contact met je op om kennis te maken.",
  },
  {
    step: "02",
    title: "Welkomstmail",
    description:
      "Je ontvangt een warme welkomstmail met alle informatie over de club en onze volgende events.",
  },
  {
    step: "03",
    title: "Eerste event",
    description:
      "Sluit aan bij je eerste bijeenkomst en ontmoet gelijkgestemde ondernemers uit ons netwerk.",
  },
];

export type Member = {
  name: string;
  role: string;
  company: string;
  location: string;
  initials: string;
};

export const MEMBERS: Member[] = [
  {
    name: "Sophie van den Berg",
    role: "Interieurontwerper",
    company: "Studio Van den Berg",
    location: "Santa Ponsa",
    initials: "SB",
  },
  {
    name: "Marcus de Vries",
    role: "Vastgoedadviseur",
    company: "De Vries Properties",
    location: "Palma",
    initials: "MV",
  },
  {
    name: "Lotte Jansen",
    role: "Marketing Consultant",
    company: "Jansen & Co.",
    location: "Port d'Andratx",
    initials: "LJ",
  },
  {
    name: "Pieter Bakker",
    role: "Restaurateur",
    company: "Casa Bakker",
    location: "Puerto Portals",
    initials: "PB",
  },
  {
    name: "Anouk Visser",
    role: "Jachtmakelaar",
    company: "Visser Yachting",
    location: "Port Adriano",
    initials: "AV",
  },
  {
    name: "Koen Meijer",
    role: "Fiscalist",
    company: "Meijer Tax",
    location: "Palma",
    initials: "KM",
  },
  {
    name: "Elise Hendriks",
    role: "Architect",
    company: "Hendriks Arquitectura",
    location: "Sóller",
    initials: "EH",
  },
  {
    name: "Sander Claessens",
    role: "Hotelier",
    company: "Finca Deià Collection",
    location: "Deià",
    initials: "SC",
  },
  {
    name: "Bart Dekker",
    role: "Horeca-ondernemer",
    company: "Dekker Hospitality",
    location: "Port d'Andratx",
    initials: "BD",
  },
  {
    name: "Yara Peeters",
    role: "Grafisch ontwerper",
    company: "Studio Peeters",
    location: "Palma",
    initials: "YP",
  },
  {
    name: "Wouter Segers",
    role: "Private banker",
    company: "Segers Wealth",
    location: "Palma",
    initials: "WS",
  },
  {
    name: "Maaike van Leeuwen",
    role: "Event manager",
    company: "VL Events Mallorca",
    location: "Santa Ponsa",
    initials: "ML",
  },
];

export const MEMBERS_TOTAL = 42;

export type SponsorTier = "partner" | "vriend";

export type Sponsor = {
  name: string;
  tier: SponsorTier;
};

export type Hoofdsponsor = {
  name: string;
  company: string;
  website: string;
  websiteLabel: string;
  linkedin?: string;
  instagram?: string;
  image: string;
};

export const HOOFDSPONSORS: Hoofdsponsor[] = [
  {
    name: "Youssef El-Idrissi",
    company: "Astrelon",
    website: "https://astrelon.io",
    websiteLabel: "astrelon.io",
    linkedin: "https://www.linkedin.com/in/sefbuilds/",
    instagram: "https://instagram.com/sefbuilds",
    image: "/sponsors/youssef-el-idrissi.png",
  },
  {
    name: "Stefan Beekwilder",
    company: "Clarosea",
    website: "https://clarosea.com",
    websiteLabel: "clarosea.com",
    linkedin: "https://www.linkedin.com/in/stefan-beekwilder-a2261341/",
    instagram: "https://instagram.com/sbalear",
    image: "/sponsors/stefan-beekwilder.png",
  },
];

export const SPONSORS: Sponsor[] = [
  { name: "Nordico Fiscal Advisors", tier: "partner" },
  { name: "Palma Legal", tier: "partner" },
  { name: "Atlantic Yacht Brokers", tier: "partner" },
  { name: "Helena Design Studio", tier: "partner" },
  { name: "Mediterrane Media", tier: "partner" },
  { name: "Casa Finca Mallorca", tier: "vriend" },
  { name: "Port Advisors", tier: "vriend" },
  { name: "Atelier Sóller", tier: "vriend" },
];

export const MEMBERSHIP_BENEFITS = [
  "Toegang tot alle maandelijkse netwerkbijeenkomsten",
  "Uitnodigingen voor diners, borrels en masterclasses",
  "Vermelding in de digitale ledenlijst",
  "Persoonlijke introducties binnen het netwerk",
  "Toegang tot de online community van leden",
  "Korting op events voor introducés",
];
