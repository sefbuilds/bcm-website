import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createSupabaseServer } from "@/lib/supabase-server";

/**
 * Handles Supabase auth email confirmations (invite, recovery, signup,
 * email change). Exchanges the token_hash + type for a session cookie
 * and redirects to ?next=... (default /welcome for invites, /dashboard
 * for everything else).
 *
 * Supabase email template should point Confirmation URL at:
 *   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type={{ .EmailType }}&next=/welcome
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const nextParam = searchParams.get("next");

  if (!tokenHash || !type) {
    return NextResponse.redirect(
      `${origin}/login?error=invite-invalid`,
    );
  }

  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash: tokenHash,
  });

  if (error) {
    console.error("[auth/confirm] verifyOtp failed", error);
    return NextResponse.redirect(
      `${origin}/login?error=invite-invalid`,
    );
  }

  const next =
    nextParam ||
    (type === "invite" || type === "signup" ? "/welcome" : "/dashboard");

  return NextResponse.redirect(`${origin}${next}`);
}
