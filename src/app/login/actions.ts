"use server";

import { headers } from "next/headers";
import { createSupabaseServer } from "@/lib/supabase-server";

export type SignInResult = { ok: true } | { ok: false; error: string };

/**
 * Stuur een magic link naar het opgegeven adres. Supabase zal alleen
 * een link sturen als er al een auth.users rij bestaat — admins worden
 * handmatig toegevoegd via de Supabase dashboard, dus we zetten
 * shouldCreateUser op false.
 */
export async function requestMagicLinkAction(
  formData: FormData,
): Promise<SignInResult> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email || !/.+@.+\..+/.test(email)) {
    return { ok: false, error: "Vul een geldig e-mailadres in." };
  }

  const h = await headers();
  const host =
    h.get("x-forwarded-host") ?? h.get("host") ?? "www.nbcmallorca.com";
  const proto = h.get("x-forwarded-proto") ?? "https";
  const origin = `${proto}://${host}`;

  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${origin}/auth/confirm?next=/dashboard`,
    },
  });

  if (error) {
    console.error("[login:requestMagicLink]", error);
    // Don't leak whether the email exists. Show a generic success response
    // so a malicious visitor can't enumerate admin addresses.
  }

  return { ok: true };
}
