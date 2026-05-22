-- =========================================================================
-- NBCM — Initial schema
-- =========================================================================
-- Tables:
--   nbcm_intakes   form submissions (leden + bestuur blauwdruk)
--   nbcm_members   publicly listed members on the site
--   nbcm_sponsors  hoofdsponsors (rich profile cards)
--   nbcm_partners  partners + vrienden van de club (compact entries)
--
-- RLS:
--   intakes          service_role only (no public policies)
--   members          public can SELECT where is_public = true
--   sponsors         public can SELECT where is_active = true
--   partners         public can SELECT where is_active = true
--   Writes on every table: service_role only via Next.js server action.
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- -------------------------------------------------------------------------
-- Helper: keep updated_at in sync
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION nbcm_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =========================================================================
-- INTAKES
-- =========================================================================
CREATE TABLE IF NOT EXISTS nbcm_intakes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  role        TEXT NOT NULL CHECK (role IN ('lid', 'bestuur')),
  tier        TEXT CHECK (tier IN ('member', 'partner', 'sponsor')),
  -- Core contact fields
  voornaam    TEXT NOT NULL,
  achternaam  TEXT,
  email       TEXT NOT NULL,
  telefoon    TEXT,
  woonplaats  TEXT,
  bedrijf     TEXT,
  website     TEXT,
  fase        TEXT,
  -- Everything else (textareas, radios, multis, ranks) in flexible JSONB
  data        JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Optional operations metadata
  user_agent  TEXT,
  ip_hash     TEXT
);

CREATE INDEX IF NOT EXISTS nbcm_intakes_role_idx        ON nbcm_intakes(role);
CREATE INDEX IF NOT EXISTS nbcm_intakes_tier_idx        ON nbcm_intakes(tier);
CREATE INDEX IF NOT EXISTS nbcm_intakes_created_at_idx  ON nbcm_intakes(created_at DESC);
CREATE INDEX IF NOT EXISTS nbcm_intakes_email_idx       ON nbcm_intakes(email);

ALTER TABLE nbcm_intakes ENABLE ROW LEVEL SECURITY;
-- No policies = only service_role can read/write.

-- =========================================================================
-- MEMBERS
-- =========================================================================
CREATE TABLE IF NOT EXISTS nbcm_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  name        TEXT NOT NULL,
  initials    TEXT NOT NULL,
  role        TEXT,
  company     TEXT,
  location    TEXT,
  bio         TEXT,
  image_url   TEXT,
  website     TEXT,
  linkedin    TEXT,
  instagram   TEXT,
  is_public   BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order  INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS nbcm_members_public_idx ON nbcm_members(is_public, sort_order);

DROP TRIGGER IF EXISTS nbcm_members_set_updated_at ON nbcm_members;
CREATE TRIGGER nbcm_members_set_updated_at
  BEFORE UPDATE ON nbcm_members
  FOR EACH ROW EXECUTE FUNCTION nbcm_set_updated_at();

ALTER TABLE nbcm_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read public members" ON nbcm_members;
CREATE POLICY "Public can read public members"
  ON nbcm_members
  FOR SELECT
  USING (is_public = TRUE);

-- =========================================================================
-- SPONSORS (hoofdsponsors)
-- =========================================================================
CREATE TABLE IF NOT EXISTS nbcm_sponsors (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  name          TEXT NOT NULL,        -- contact person
  company       TEXT NOT NULL,
  website       TEXT NOT NULL,
  website_label TEXT NOT NULL,
  image_url     TEXT NOT NULL,
  linkedin      TEXT,
  instagram     TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order    INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS nbcm_sponsors_active_idx ON nbcm_sponsors(is_active, sort_order);

DROP TRIGGER IF EXISTS nbcm_sponsors_set_updated_at ON nbcm_sponsors;
CREATE TRIGGER nbcm_sponsors_set_updated_at
  BEFORE UPDATE ON nbcm_sponsors
  FOR EACH ROW EXECUTE FUNCTION nbcm_set_updated_at();

ALTER TABLE nbcm_sponsors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active sponsors" ON nbcm_sponsors;
CREATE POLICY "Public can read active sponsors"
  ON nbcm_sponsors
  FOR SELECT
  USING (is_active = TRUE);

-- =========================================================================
-- PARTNERS (partners + vrienden)
-- =========================================================================
CREATE TABLE IF NOT EXISTS nbcm_partners (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  name        TEXT NOT NULL,
  tier        TEXT NOT NULL CHECK (tier IN ('partner', 'vriend')),
  website     TEXT,
  logo_url    TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order  INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS nbcm_partners_active_idx ON nbcm_partners(is_active, tier, sort_order);

DROP TRIGGER IF EXISTS nbcm_partners_set_updated_at ON nbcm_partners;
CREATE TRIGGER nbcm_partners_set_updated_at
  BEFORE UPDATE ON nbcm_partners
  FOR EACH ROW EXECUTE FUNCTION nbcm_set_updated_at();

ALTER TABLE nbcm_partners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active partners" ON nbcm_partners;
CREATE POLICY "Public can read active partners"
  ON nbcm_partners
  FOR SELECT
  USING (is_active = TRUE);

-- =========================================================================
-- SEED — current site data
-- =========================================================================

-- Hoofdsponsors
INSERT INTO nbcm_sponsors
  (name, company, website, website_label, image_url, linkedin, instagram, sort_order)
VALUES
  ('Youssef El-Idrissi', 'Astrelon',  'https://astrelon.io',  'astrelon.io',
   '/sponsors/youssef-el-idrissi.png',
   'https://www.linkedin.com/in/sefbuilds/',
   'https://instagram.com/sefbuilds', 1),
  ('Stefan Beekwilder',  'Clarosea',  'https://clarosea.com', 'clarosea.com',
   '/sponsors/stefan-beekwilder.png',
   'https://www.linkedin.com/in/stefan-beekwilder-a2261341/',
   'https://instagram.com/sbalear', 2)
ON CONFLICT DO NOTHING;

-- Partners + vrienden
INSERT INTO nbcm_partners (name, tier, sort_order) VALUES
  ('Nordico Fiscal Advisors', 'partner', 1),
  ('Palma Legal',             'partner', 2),
  ('Atlantic Yacht Brokers',  'partner', 3),
  ('Helena Design Studio',    'partner', 4),
  ('Mediterrane Media',       'partner', 5),
  ('Casa Finca Mallorca',     'vriend',  1),
  ('Port Advisors',           'vriend',  2),
  ('Atelier Sóller',          'vriend',  3)
ON CONFLICT DO NOTHING;

-- Members (publiek)
INSERT INTO nbcm_members (name, initials, role, company, location, sort_order) VALUES
  ('Sophie van den Berg',  'SB', 'Interieurontwerper',   'Studio Van den Berg',   'Santa Ponsa',      1),
  ('Marcus de Vries',      'MV', 'Vastgoedadviseur',     'De Vries Properties',   'Palma',            2),
  ('Lotte Jansen',         'LJ', 'Marketing Consultant', 'Jansen & Co.',          'Port d''Andratx',  3),
  ('Pieter Bakker',        'PB', 'Restaurateur',         'Casa Bakker',           'Puerto Portals',   4),
  ('Anouk Visser',         'AV', 'Jachtmakelaar',        'Visser Yachting',       'Port Adriano',     5),
  ('Koen Meijer',          'KM', 'Fiscalist',            'Meijer Tax',            'Palma',            6),
  ('Elise Hendriks',       'EH', 'Architect',            'Hendriks Arquitectura', 'Sóller',           7),
  ('Sander Claessens',     'SC', 'Hotelier',             'Finca Deià Collection', 'Deià',             8),
  ('Bart Dekker',          'BD', 'Horeca-ondernemer',    'Dekker Hospitality',    'Port d''Andratx',  9),
  ('Yara Peeters',         'YP', 'Grafisch ontwerper',   'Studio Peeters',        'Palma',           10),
  ('Wouter Segers',        'WS', 'Private banker',       'Segers Wealth',         'Palma',           11),
  ('Maaike van Leeuwen',   'ML', 'Event manager',        'VL Events Mallorca',    'Santa Ponsa',     12)
ON CONFLICT DO NOTHING;
