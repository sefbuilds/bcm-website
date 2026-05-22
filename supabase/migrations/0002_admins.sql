-- =========================================================================
-- NBCM — Admin access
-- =========================================================================
-- Dashboard access is gated by the presence of a row in nbcm_admins for
-- the current auth.uid(). Sign-ups are expected to be DISABLED in the
-- Supabase Auth settings; users are created manually in the Supabase
-- dashboard (auth.users) and then added here.
-- =========================================================================

CREATE TABLE IF NOT EXISTS nbcm_admins (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT,
  role       TEXT NOT NULL DEFAULT 'bestuur'
               CHECK (role IN ('bestuur', 'dev')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS nbcm_admins_user_idx ON nbcm_admins(user_id);

ALTER TABLE nbcm_admins ENABLE ROW LEVEL SECURITY;
-- No public policies: only the service_role key can read/write.
-- The dashboard server components query via getSupabaseAdmin() which uses
-- the service role — regular authenticated clients cannot read this.

-- -------------------------------------------------------------------------
-- How to add a new admin (run AFTER creating the user in Supabase Auth UI):
--
--   INSERT INTO nbcm_admins (user_id, name, role)
--   VALUES (
--     (SELECT id FROM auth.users WHERE email = 'stefan@clarosea.com'),
--     'Stefan Beekwilder',
--     'bestuur'
--   );
-- -------------------------------------------------------------------------
