export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Over ons", href: "/over-ons" },
  { label: "Events", href: "/events" },
  { label: "Lid worden", href: "/lid-worden" },
  { label: "Contact", href: "/contact" },
];

export const SITE_INFO = {
  name: "NBCM",
  fullName: "Nederlandstalige Business Club Mallorca",
  tagline: "Ondernemen op Mallorca, samen sterker.",
  subtagline:
    "Het netwerk voor Nederlandstalige ondernemers op de Balearen.",
  motto:
    "Samen kunnen we meer, samen weten we meer en samen verdienen we meer.",
  email: "info@nederlandstaligebusinessclub.nl",
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
    name: "Vincent Werner",
    role: "Voorzitter",
    bio: "Verbindt leden, stippelt de koers uit en zorgt dat de club een warme thuisbasis blijft voor Nederlandstalige ondernemers.",
    initials: "VW",
  },
  {
    name: "Jan Mulder",
    role: "Bestuurslid",
    bio: "Organiseert events en partnerships, en brengt ondernemers bij elkaar rond gedeelde ambities en interesses.",
    initials: "JM",
  },
  {
    name: "Ingrid van de Reijt",
    role: "Bestuurslid & Honorair Consul",
    bio: "Vanuit haar dubbele rol bouwt ze bruggen tussen de Nederlandstalige gemeenschap en lokale instituties op Mallorca.",
    initials: "IR",
  },
];

export const AMBASSADOR = {
  name: "Roel Nieuwenkamp",
  label: "Ambassadeur",
};

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
];

export const MEMBERS_TOTAL = 42;

export type SponsorTier = "hoofdsponsor" | "partner" | "vriend";

export type Sponsor = {
  name: string;
  tier: SponsorTier;
};

export const SPONSORS: Sponsor[] = [
  { name: "Mallorca Invest Group", tier: "hoofdsponsor" },
  { name: "Bendinat Bay Partners", tier: "hoofdsponsor" },
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
