import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createSupabaseServer } from "@/lib/supabase-server";

/**
 * Handles Supabase auth redirects for both flows:
 *
 *  1. PKCE / code exchange (magic links) — ?code=<uuid>
 *     → exchangeCodeForSession, redirect to ?next (default /dashboard)
 *
 *  2. OTP token verification (invite, recovery, signup) —
 *     ?token_hash=<hash>&type=<emailtype>
 *     → verifyOtp, redirect to ?next (default /welcome for invites,
 *        /dashboard otherwise)
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const nextParam = searchParams.get("next");

  const supabase = await createSupabaseServer();

  // PKCE flow (default magic link behaviour)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("[auth/confirm] exchangeCodeForSession failed", error);
      return NextResponse.redirect(
        `${origin}/login?error=invite-invalid`,
      );
    }
    return NextResponse.redirect(`${origin}${nextParam || "/dashboard"}`);
  }

  // OTP token flow
  if (tokenHash && type) {
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

  return NextResponse.redirect(`${origin}/login?error=invite-invalid`);
}
