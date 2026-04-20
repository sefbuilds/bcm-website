import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/**
 * Returns a Supabase client using the service role key.
 * Call only from server actions / route handlers — never from the browser.
 *
 * Reads env vars with tolerance for a couple of naming conventions so the
 * deployment doesn't break on cosmetic differences. The correct long-term
 * names are SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (no NEXT_PUBLIC_
 * prefix — that prefix exposes vars to the client bundle, which is never
 * acceptable for a service role key).
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE ||
    // Tolerated for bootstrap only — see warning below.
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.",
    );
  }

  if (
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE ||
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  ) {
    // Explicit warning to the server logs so this gets noticed and fixed.
    console.warn(
      "[supabase] Service role key is set under NEXT_PUBLIC_* — rename it to SUPABASE_SERVICE_ROLE_KEY (without NEXT_PUBLIC_ prefix) and rotate the key; the NEXT_PUBLIC_ prefix makes env vars eligible for the client bundle.",
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
