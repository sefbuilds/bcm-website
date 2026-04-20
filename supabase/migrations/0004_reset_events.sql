-- =========================================================================
-- NBCM — Reset events to actual April 2026 agenda
-- =========================================================================
-- Wipes all existing rows in nbcm_events (cascade deletes any pending
-- registrations) and inserts the three currently planned events:
--   26 mrt 2026 — Opening nieuw bestuur & clubvisie (past, with photos)
--   26 apr 2026 — Koningsdag bij Santina (upcoming, sociaal)
--   21 mei 2026 — Business Meeting (upcoming, details volgen)
-- =========================================================================

BEGIN;

-- Clean slate — cascade removes registrations referencing these events.
TRUNCATE TABLE nbcm_events RESTART IDENTITY CASCADE;

INSERT INTO nbcm_events
  (slug, title, description, location, start_at, end_at, tag, photos, is_featured, is_published, sort_order)
VALUES
  -- ---------------------------------------------------------------
  -- 26 maart 2026 — past event, featured, with photos
  -- ---------------------------------------------------------------
  (
    'opening-bestuur-26-mrt-2026',
    'Opening nieuw bestuur & clubvisie',
    'De onthulling van het nieuwe bestuur en de vernieuwde visie van de Nederlandstalige Business Club Mallorca. Een warme avond met bestuurspresentatie, toekomstplannen en ruime gelegenheid tot netwerken onder leden en genodigden.',
    'Palma de Mallorca',
    '2026-03-26 18:30:00+01',
    '2026-03-26 22:00:00+01',
    'Bestuur',
    ARRAY[
      '/events/26-mrt-2026/networkborrel-01.jpeg',
      '/events/26-mrt-2026/networkborrel-02.jpeg',
      '/events/26-mrt-2026/networkborrel-03.jpeg',
      '/events/26-mrt-2026/networkborrel-04.jpeg',
      '/events/26-mrt-2026/networkborrel-05.jpeg',
      '/events/26-mrt-2026/networkborrel-06.jpeg'
    ],
    TRUE,
    TRUE,
    60
  ),

  -- ---------------------------------------------------------------
  -- 26 april 2026 — Koningsdag social bij Santina (upcoming)
  -- ---------------------------------------------------------------
  (
    'koningsdag-santina-26-apr-2026',
    'Koningsdag bij Santina',
    'Vier Koningsdag samen met Nederlandstalige ondernemers op Mallorca. Een ontspannen sociaal evenement bij Santina met oranje accenten, gezellig samenzijn en ruimte om elkaar buiten de reguliere business-bijeenkomsten te ontmoeten.',
    'Santina, Mallorca',
    '2026-04-26 14:00:00+02',
    '2026-04-26 19:00:00+02',
    'Sociaal',
    '{}',
    TRUE,
    TRUE,
    100
  ),

  -- ---------------------------------------------------------------
  -- 21 mei 2026 — Business Meeting (upcoming, details volgen)
  -- ---------------------------------------------------------------
  (
    'business-meeting-21-mei-2026',
    'Business Meeting · mei 2026',
    'Inhoudelijke business meeting voor NBCM-leden. Meer informatie over thema, sprekers en locatie volgt binnenkort — reserveer de datum alvast in je agenda.',
    'Nader te bepalen',
    '2026-05-21 18:00:00+02',
    '2026-05-21 21:00:00+02',
    'Business',
    '{}',
    FALSE,
    TRUE,
    90
  );

COMMIT;
