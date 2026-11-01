/*
# Create skin_scans table (anonymous, write-only scan log)

1. New Tables
- `skin_scans`
  - `id` (uuid, primary key)
  - `skin_score` (integer, 0-100) overall skin health score
  - `metrics` (jsonb) diagnostic metrics returned by the analysis
  - `routine` (jsonb) personalized daily routine generated for the scan
  - `created_at` (timestamptz)

2. Security
- Enable RLS on `skin_scans`.
- Grant INSERT only to `anon` and `authenticated`. No SELECT grant, so scan results cannot be read back by other visitors.
- Single INSERT policy for `anon` and `authenticated`. No photos or personal identifiers are stored.

3. Important Notes
- The app has no sign-in, so the anonymous role performs the write.
- Scan rows are a write-only log for later analytics.
*/

CREATE TABLE IF NOT EXISTS skin_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  skin_score integer NOT NULL CHECK (skin_score BETWEEN 0 AND 100),
  metrics jsonb NOT NULL,
  routine jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE skin_scans ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON skin_scans TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_skin_scans" ON skin_scans;
CREATE POLICY "anon_insert_skin_scans" ON skin_scans FOR INSERT
  TO anon, authenticated WITH CHECK (true);
