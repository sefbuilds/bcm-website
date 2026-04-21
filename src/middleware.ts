import { NextResponse, type NextRequest } from "next/server";

/**
 * Intercept any request carrying a Supabase auth `?code=<uuid>` (magic
 * link / OAuth callback) and forward it to /auth/confirm where we
 * exchange the code for a session. This makes the auth flow robust
 * regardless of where Supabase drops the user back on the site (e.g.
 * the root "/" if an email template omits the full redirect path).
 */
export function middleware(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.next();
  if (request.nextUrl.pathname === "/auth/confirm") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const next = url.pathname + (url.searchParams.get("next") ? "" : "");
  url.pathname = "/auth/confirm";
  if (!url.searchParams.get("next")) {
    url.searchParams.set("next", next !== "/" ? next : "/dashboard");
  }
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Skip assets, API, _next, public files with extensions.
     * Run on everything else so auth codes on any page route to
     * /auth/confirm.
     */
    "/((?!api/|_next/|favicon\\.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp|css|js|map|woff|woff2|ttf)).*)",
  ],
};
