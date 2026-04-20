-- =========================================================================
-- NBCM — Events + event registrations
-- =========================================================================
-- nbcm_events              — calendar of past + upcoming bijeenkomsten
-- nbcm_event_registrations — RSVPs submitted via /events/aanmelden
-- =========================================================================

CREATE TABLE IF NOT EXISTS nbcm_events (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  slug           TEXT NOT NULL UNIQUE,
  title          TEXT NOT NULL,
  description    TEXT,
  location       TEXT,
  start_at       TIMESTAMPTZ NOT NULL,
  end_at         TIMESTAMPTZ,
  tag            TEXT,
  hero_image     TEXT,
  photos         TEXT[] NOT NULL DEFAULT '{}',
  is_featured    BOOLEAN NOT NULL DEFAULT FALSE,
  is_published   BOOLEAN NOT NULL DEFAULT TRUE,
  max_attendees  INT,
  sort_order     INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS nbcm_events_start_idx
  ON nbcm_events(is_published, start_at DESC);

DROP TRIGGER IF EXISTS nbcm_events_set_updated_at ON nbcm_events;
CREATE TRIGGER nbcm_events_set_updated_at
  BEFORE UPDATE ON nbcm_events
  FOR EACH ROW EXECUTE FUNCTION nbcm_set_updated_at();

ALTER TABLE nbcm_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published events" ON nbcm_events;
CREATE POLICY "Public can read published events"
  ON nbcm_events
  FOR SELECT
  USING (is_published = TRUE);

-- =========================================================================
CREATE TABLE IF NOT EXISTS nbcm_event_registrations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  event_id     UUID NOT NULL REFERENCES nbcm_events(id) ON DELETE CASCADE,
  voornaam     TEXT NOT NULL,
  achternaam   TEXT,
  email        TEXT NOT NULL,
  telefoon     TEXT,
  bedrijf      TEXT,
  guests       INT NOT NULL DEFAULT 0 CHECK (guests >= 0),
  dietary      TEXT,
  notes        TEXT,
  user_agent   TEXT,
  ip_hash      TEXT,
  UNIQUE (event_id, email)
);

CREATE INDEX IF NOT EXISTS nbcm_event_registrations_event_idx
  ON nbcm_event_registrations(event_id, created_at DESC);

ALTER TABLE nbcm_event_registrations ENABLE ROW LEVEL SECURITY;
-- No public policies: service_role only (server action inserts).

-- =========================================================================
-- SEED — migrate current site data into nbcm_events
-- =========================================================================

INSERT INTO nbcm_events
  (slug, title, description, location, start_at, end_at, tag, photos, is_featured, sort_order)
VALUES
  -- Upcoming: Zomerborrel
  (
    'zomerborrel-2026',
    'Zomerborrel & Netwerkevent',
    'Start de zomer met een ontspannen borrel aan zee. Onder het genot van een hapje en drankje bouwen we verder aan ons netwerk en verkennen we nieuwe samenwerkingen.',
    'Hotel Bendinat, Palma de Mallorca',
    '2026-06-12 17:30:00+02',
    '2026-06-12 21:00:00+02',
    'Netwerken',
    '{}',
    TRUE,
    100
  ),
  -- Featured recent: Voorjaarsborrel with photos
  (
    'networkborrel-26-mrt-2026',
    'Voorjaarsborrel & Netwerkavond',
    'Een warme voorjaarsavond met leden, nieuwe gezichten en genodigden. Veel goede gesprekken, introducties en plannen voor de komende maanden.',
    'Palma de Mallorca',
    '2026-03-26 18:30:00+01',
    '2026-03-26 22:00:00+01',
    'Netwerken',
    ARRAY[
      '/events/26-mrt-2026/networkborrel-01.jpeg',
      '/events/26-mrt-2026/networkborrel-02.jpeg',
      '/events/26-mrt-2026/networkborrel-03.jpeg',
      '/events/26-mrt-2026/networkborrel-04.jpeg',
      '/events/26-mrt-2026/networkborrel-05.jpeg',
      '/events/26-mrt-2026/networkborrel-06.jpeg'
    ],
    FALSE,
    90
  ),
  -- Past events from constants.ts
  (
    'lente-diner-2026',
    'Lente Netwerkdiner',
    'Een gezellig diner in een van de charmantste locaties van het binnenland, waar we samen het nieuwe seizoen inluidden.',
    'Restaurant Molí des Torrent, Santa Maria',
    '2026-04-15 19:00:00+02',
    '2026-04-15 23:00:00+02',
    'Diner',
    '{}',
    FALSE,
    80
  ),
  (
    'masterclass-2026',
    'Masterclass: Ondernemen in Spanje',
    'Een praktische sessie over de juridische en fiscale kant van zakendoen op de Balearen, gevolgd door een lunch.',
    'Port Adriano',
    '2026-03-06 10:00:00+01',
    '2026-03-06 13:00:00+01',
    'Masterclass',
    '{}',
    FALSE,
    70
  ),
  (
    'nieuwjaarsborrel-2026',
    'Nieuwjaarsborrel',
    'Een warme aftrap van het nieuwe jaar met leden, partners en nieuwe gezichten.',
    'Palma de Mallorca',
    '2026-01-18 18:00:00+01',
    '2026-01-18 22:00:00+01',
    'Borrel',
    '{}',
    FALSE,
    60
  ),
  (
    'kerstdiner-2025',
    'Kerstdiner',
    'Ons traditionele kerstdiner op een sfeervolle finca, om samen het jaar af te sluiten.',
    'Finca op Mallorca',
    '2025-12-14 18:30:00+01',
    '2025-12-14 23:30:00+01',
    'Diner',
    '{}',
    FALSE,
    50
  ),
  (
    'haven-borrel-2025',
    'Havenborrel Puerto Portals',
    'Een herfstige borrel aan de haven, met uitzicht op de jachten en volop ruimte voor goede gesprekken.',
    'Puerto Portals',
    '2025-10-22 18:00:00+02',
    '2025-10-22 21:30:00+02',
    'Borrel',
    '{}',
    FALSE,
    40
  ),
  (
    'wijnproeverij-2025',
    'Wijnproeverij op de Finca',
    'Een middag tussen de wijngaarden, waarbij lokale wijnen en verhalen van ondernemers elkaar vonden.',
    'Binissalem',
    '2025-09-08 16:00:00+02',
    '2025-09-08 20:00:00+02',
    'Sociaal',
    '{}',
    FALSE,
    30
  )
ON CONFLICT (slug) DO NOTHING;
