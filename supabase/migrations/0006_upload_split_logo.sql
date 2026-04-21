-- =========================================================================
-- NBCM — Split member names + sponsor logo + storage bucket
-- =========================================================================

-- 1. Members: split `name` into voornaam + achternaam, add generated `name`
ALTER TABLE nbcm_members
  ADD COLUMN IF NOT EXISTS voornaam TEXT,
  ADD COLUMN IF NOT EXISTS achternaam TEXT;

UPDATE nbcm_members
   SET voornaam  = split_part(name, ' ', 1),
       achternaam = CASE
         WHEN position(' ' in name) > 0
         THEN substr(name, position(' ' in name) + 1)
         ELSE ''
       END
 WHERE voornaam IS NULL
   AND name IS NOT NULL;

ALTER TABLE nbcm_members
  ALTER COLUMN voornaam SET NOT NULL;

-- Drop old plain `name` and recreate as a generated column so the public
-- components that still read `name` keep working.
ALTER TABLE nbcm_members DROP COLUMN IF EXISTS name;
ALTER TABLE nbcm_members
  ADD COLUMN name TEXT
  GENERATED ALWAYS AS (TRIM(CONCAT(voornaam, ' ', COALESCE(achternaam, '')))) STORED;

-- 2. Sponsors: add logo_url for marketing logo (separate from profielfoto)
ALTER TABLE nbcm_sponsors
  ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- 3. Storage bucket for admin uploads (profielfoto's, event images, logos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('nbcm-public', 'nbcm-public', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow anyone to read public objects
DROP POLICY IF EXISTS "Public can read nbcm-public" ON storage.objects;
CREATE POLICY "Public can read nbcm-public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'nbcm-public');

-- Writes happen via service role (bypasses RLS), no public upload policy.
