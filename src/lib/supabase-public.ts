import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;
let warned = false;

/**
 * Read-only Supabase client using the anon key.
 * Reads obey RLS policies. Returns null if env vars are missing so the
 * build can still prerender pages — data fetchers handle null gracefully.
 */
export function getSupabasePublic(): SupabaseClient | null {
  if (cached) return cached;

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    if (!warned) {
      warned = true;
      console.warn(
        "[supabase-public] Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY — data fetches will return empty.",
      );
    }
    return null;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
