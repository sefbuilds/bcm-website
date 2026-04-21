/**
 * Maps intake form field keys to human-readable questions, options, and
 * rank row labels. Used by the dashboard detail view to render the
 * stored JSONB answers as a clean Q&A list.
 */

export type IntakeFieldType = "text" | "single" | "multi" | "rank";
export type IntakeRole = "lid" | "bestuur";

export type IntakeField = {
  key: string;
  block: number;
  blockTitle: string;
  question: string;
  hint?: string;
  type: IntakeFieldType;
  roles?: IntakeRole[]; // default: both
  options?: Record<string, string>;
  rankLabels?: Record<string, string>;
};

const FASE: Record<string, string> = {
  net_geland: "Net geland of aan het verkennen",
  opbouwen: "Bezig met opbouwen (eerste 1-3 jaar)",
  gevestigd: "Gevestigd ondernemer op het eiland",
  remote: "Remote werkend, bedrijf elders",
};

const REDEN: Record<string, string> = {
  netwerk: "Netwerk uitbreiden met relevante mensen",
  business: "Directe business of deals genereren",
  inspiratie: "Inspiratie en persoonlijke groei",
  community: "Onderdeel zijn van een community",
  exclusief: "Toegang tot exclusieve events en locaties",
};

const GEVOEL: Record<string, string> = {
  thuis: "\u201CIk hoor hier thuis\u201D",
  business_direct: "\u201CDit levert mij direct business op\u201D",
  kwaliteit: "\u201CDe kwaliteit mensen hier is uitzonderlijk\u201D",
  geleerd:
    "\u201CIk heb iets geleerd dat ik nergens anders had gehoord\u201D",
  energie: "\u201CIk ga met meer energie weg dan ik kwam\u201D",
};

const SECTOREN: Record<string, string> = {
  vastgoed: "Vastgoed / verhuur",
  horeca: "Horeca / gastronomie",
  tech: "Tech / digital / AI",
  finance: "Financieel / juridisch / fiscaal",
  health: "Health / wellness / sport",
  creatief: "Creatief / media / design",
  retail: "Retail / e-commerce",
  consultancy: "Consultancy / coaching",
  nautisch: "Nautisch / charter / maritiem",
  bouw: "Bouw / renovatie / interieur",
};

const EVENT_NIVEAU: Record<string, string> = {
  basis: "Basis netwerkborrel — low key, informeel",
  mid: "Goed georganiseerd met verzorgd eten & drinken",
  high: "High-end ervaring — luxe locatie, beleving centraal",
};

const EVENT_RANK_ROWS: Record<string, string> = {
  eten: "Kwaliteit eten & drinken",
  locatie: "Locatie & uitstraling",
  mensen: "Type mensen in de zaal",
  organisatie: "Strakke organisatie / flow",
  exclusiviteit: "Exclusiviteit / besloten karakter",
};

const EVENT_TYPE: Record<string, string> = {
  diner: "Besloten diner (8-16 personen)",
  borrel: "Borrel / cocktail met vaste locatie",
  spreker: "Event met gastspreker of panel",
  activiteit: "Activiteit (boot, golf, wijn, etc.)",
  mastermind: "Mastermind / peer-to-peer sessie",
  partner_familie: "Partner- of gezinsvriendelijk event",
};

const PRIJS: Record<string, string> = {
  "500": "€ 500 per jaar",
  "1000": "€ 1.000 per jaar",
  "2500": "€ 2.500 per jaar",
  "5000": "€ 5.000+ per jaar",
};

const REDEN_LID: Record<string, string> = {
  netwerk: "Netwerk",
  deals: "Deals / business",
  inspiratie: "Inspiratie / groei",
  exclusief: "Toegang tot exclusieve events / locaties",
  community: "Community / erbij horen",
};

const VERWACHTING_LID: Record<string, string> = {
  events_aanwezig: "Aanwezig bij minimaal 3 events per jaar",
  introducties: "Introduceert minimaal 1 nieuw relevant contact",
  bijdrage:
    "Draagt actief bij aan minimaal 1 event of initiatief",
  geen_verplichting:
    "Geen harde verwachting — lidmaatschap = toegang, niet verplichting",
};

const SPONSOR_INTERESSE: Record<string, string> = {
  ja: "Ja, ik wil de mogelijkheden weten",
  misschien: "Misschien later, nog niet nu",
  nee: "Nee, niet relevant voor mij",
};

const SPONSOR_RANK_ROWS: Record<string, string> = {
  zichtbaarheid: "Zichtbaarheid / branding",
  toegang: "Directe toegang tot leden",
  podium: "Spreekmoment / podium",
  leads: "Leads / concrete business kansen",
};

const EXCL_CAT: Record<string, string> = {
  niet: "Niet belangrijk",
  enigszins: "Enigszins belangrijk",
  zeer: "Zeer belangrijk — anders devalueert het partnership",
};

const BRON: Record<string, string> = {
  lid: "Via een bestaand lid",
  event: "Via een event",
  social: "Social media / online",
  anders: "Anders",
};

const EIGENAAR: Record<string, string> = {
  netwerk: "Netwerk & ledenwerving",
  deals: "Business / deals faciliteren tussen leden",
  events: "Event-organisatie & operations",
  marketing: "Marketing, content & zichtbaarheid",
  strategie: "Strategie & partnerships",
  financien: "Financiën & governance",
};

export const INTAKE_FIELDS: IntakeField[] = [
  // Block 1 — Over jou (fase is the only non-column extra)
  {
    key: "fase",
    block: 1,
    blockTitle: "Over jou",
    question: "In welke fase zit je op Mallorca?",
    type: "single",
    options: FASE,
  },

  // Block 2 — Fundament
  {
    key: "q_fundament_voor_wie",
    block: 2,
    blockTitle: "Fundament",
    question:
      "Voor wie is NBCM er, en wat krijgen zij hier wat ze elders niet krijgen?",
    type: "text",
  },
  {
    key: "q_fundament_type",
    block: 2,
    blockTitle: "Fundament",
    question:
      "Welk type ondernemer past bij NBCM — en welk type juist niet?",
    type: "text",
  },
  {
    key: "q_fundament_niet_voor",
    block: 2,
    blockTitle: "Fundament",
    question:
      "Waar moet NBCM expliciet niet voor staan — ook al kost dat leden?",
    type: "text",
  },
  {
    key: "q_fundament_missen",
    block: 2,
    blockTitle: "Fundament",
    question: "Als NBCM morgen zou stoppen — wat missen leden dan écht?",
    type: "text",
    roles: ["bestuur"],
  },
  {
    key: "q_fundament_schrappen",
    block: 2,
    blockTitle: "Fundament",
    question:
      "Stel: NBCM is jouw eigen bedrijf. Wat zou je morgen zonder twijfel schrappen?",
    type: "text",
    roles: ["bestuur"],
  },
  {
    key: "q_fundament_opschalen",
    block: 2,
    blockTitle: "Fundament",
    question: "En wat zou je verdubbelen of opschalen?",
    type: "text",
    roles: ["bestuur"],
  },

  // Block 3 — Wat zoek je?
  {
    key: "reden",
    block: 3,
    blockTitle: "Wat zoek je?",
    question: "Belangrijkste redenen om bij NBCM te horen (max 2)",
    type: "multi",
    options: REDEN,
  },
  {
    key: "gevoel",
    block: 3,
    blockTitle: "Wat zoek je?",
    question: "Wat zou je willen voelen na je eerste 3 NBCM-events? (max 2)",
    type: "multi",
    options: GEVOEL,
  },
  {
    key: "sectoren",
    block: 3,
    blockTitle: "Wat zoek je?",
    question: "In welke sector(en) ben je actief?",
    type: "multi",
    options: SECTOREN,
  },
  {
    key: "q_netwerk_type",
    block: 3,
    blockTitle: "Wat zoek je?",
    question: "Wat voor type mensen zoek je in je netwerk?",
    type: "text",
  },
  {
    key: "q_breng_waarde",
    block: 3,
    blockTitle: "Wat zoek je?",
    question: "Wat kun jij brengen voor andere leden?",
    type: "text",
  },

  // Block 4 — Events
  {
    key: "event_niveau",
    block: 4,
    blockTitle: "Events",
    question: "Minimale niveau van een NBCM-event",
    type: "single",
    options: EVENT_NIVEAU,
  },
  {
    key: "event_rank",
    block: 4,
    blockTitle: "Events",
    question: "Rangschikking van wat belangrijk is bij een event (1 = belangrijkst)",
    type: "rank",
    rankLabels: EVENT_RANK_ROWS,
  },
  {
    key: "q_event_nogo",
    block: 4,
    blockTitle: "Events",
    question: "Absolute no-go bij een event",
    type: "text",
  },
  {
    key: "event_type",
    block: 4,
    blockTitle: "Events",
    question: "Welke type events spreken het meest aan",
    type: "multi",
    options: EVENT_TYPE,
  },
  {
    key: "q_event_definitie",
    block: 4,
    blockTitle: "Events",
    question:
      "Concrete niet-onderhandelbare eisen per event",
    type: "text",
    roles: ["bestuur"],
  },

  // Block 5 — Lidmaatschap
  {
    key: "prijs",
    block: 5,
    blockTitle: "Lidmaatschap",
    question: "Prijspunt dat past bij NBCM",
    type: "single",
    options: PRIJS,
  },
  {
    key: "reden_lid",
    block: 5,
    blockTitle: "Lidmaatschap",
    question: "De #1 reden waarom iemand lid wordt",
    type: "single",
    options: REDEN_LID,
  },
  {
    key: "verwachting_lid",
    block: 5,
    blockTitle: "Lidmaatschap",
    question: "Wat je concreet van een lid per jaar verwacht",
    type: "multi",
    options: VERWACHTING_LID,
  },
  {
    key: "q_lid_misgegaan",
    block: 5,
    blockTitle: "Lidmaatschap",
    question: "Als een lid na 6 maanden niet tevreden is — wat is er dan misgegaan?",
    type: "text",
    roles: ["bestuur"],
  },

  // Block 6 — Partners & Sponsors
  {
    key: "sponsor_interesse",
    block: 6,
    blockTitle: "Partners & Sponsors",
    question: "Interesse in sponsoring of partnership met NBCM?",
    type: "single",
    options: SPONSOR_INTERESSE,
  },
  {
    key: "sponsor_rank",
    block: 6,
    blockTitle: "Partners & Sponsors",
    question: "Wat moet een sponsor minimaal terugkrijgen? (1 = belangrijkst)",
    type: "rank",
    rankLabels: SPONSOR_RANK_ROWS,
    roles: ["bestuur"],
  },
  {
    key: "excl_cat",
    block: 6,
    blockTitle: "Partners & Sponsors",
    question: "Hoe belangrijk is exclusiviteit per categorie?",
    type: "single",
    options: EXCL_CAT,
    roles: ["bestuur"],
  },
  {
    key: "q_sponsor_verwachting",
    block: 6,
    blockTitle: "Partners & Sponsors",
    question: "Verwachtingen richting sponsors qua commitment en bijdrage",
    type: "text",
    roles: ["bestuur"],
  },

  // Block 7 — Praktisch (lid) / Rolverdeling (bestuur)
  {
    key: "bron",
    block: 7,
    blockTitle: "Praktisch",
    question: "Hoe ben je bij NBCM terechtgekomen?",
    type: "single",
    options: BRON,
    roles: ["lid"],
  },
  {
    key: "q_referral",
    block: 7,
    blockTitle: "Praktisch",
    question: "Via welk bestaand lid doorverwezen?",
    type: "text",
    roles: ["lid"],
  },
  {
    key: "q_lid_open",
    block: 7,
    blockTitle: "Praktisch",
    question: "Open opmerking / verwachtingen / ideeën",
    type: "text",
    roles: ["lid"],
  },
  {
    key: "eigenaar",
    block: 7,
    blockTitle: "Rolverdeling & Richting",
    question: "Waar wil je eigenaar van zijn binnen het bestuur? (max 2)",
    type: "multi",
    options: EIGENAAR,
    roles: ["bestuur"],
  },
  {
    key: "q_niet_eigenaar",
    block: 7,
    blockTitle: "Rolverdeling & Richting",
    question: "Waar wil je juist niet over gaan?",
    type: "text",
    roles: ["bestuur"],
  },
  {
    key: "q_knelpunt",
    block: 7,
    blockTitle: "Rolverdeling & Richting",
    question:
      "Grootste knelpunt in hoe NBCM nu loopt",
    type: "text",
    roles: ["bestuur"],
  },
  {
    key: "q_kans",
    block: 7,
    blockTitle: "Rolverdeling & Richting",
    question: "Welke kans laten we nu liggen?",
    type: "text",
    roles: ["bestuur"],
  },
  {
    key: "q_een_ding",
    block: 7,
    blockTitle: "Rolverdeling & Richting",
    question: "Eén ding veranderen aan NBCM vanaf morgen",
    type: "text",
    roles: ["bestuur"],
  },
];

export function labelForValue(
  field: IntakeField,
  value: unknown,
): string | string[] | { item: string; rank: number }[] | null {
  if (value == null || value === "") return null;

  if (field.type === "text") {
    return typeof value === "string" ? value : String(value);
  }

  if (field.type === "single") {
    const v = String(value);
    return field.options?.[v] ?? v;
  }

  if (field.type === "multi") {
    if (!Array.isArray(value)) return null;
    return value.map((v) => field.options?.[String(v)] ?? String(v));
  }

  if (field.type === "rank") {
    if (typeof value !== "object" || Array.isArray(value)) return null;
    const rec = value as Record<string, number>;
    return Object.entries(rec)
      .map(([item, rank]) => ({
        item: field.rankLabels?.[item] ?? item,
        rank,
      }))
      .sort((a, b) => a.rank - b.rank);
  }

  return null;
}
