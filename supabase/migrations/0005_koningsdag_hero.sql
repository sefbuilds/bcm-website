-- =========================================================================
-- NBCM — Set hero image on the Koningsdag event
-- =========================================================================

UPDATE nbcm_events
   SET hero_image = '/events/koningsdag-2026/hero.jpg'
 WHERE slug = 'koningsdag-santina-26-apr-2026';
