import { redirect } from "next/navigation";
import { createSupabaseServer } from "./supabase-server";
import { getSupabaseAdmin } from "./supabase";

export type AdminProfile = {
  id: string;
  user_id: string;
  name: string | null;
  role: "bestuur" | "dev";
  email: string;
};

/**
 * Require an authenticated user who is also listed in nbcm_admins.
 * Redirects to /login when missing or unauthorized.
 * Use from server components or layouts.
 */
export async function requireAdmin(): Promise<AdminProfile> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("nbcm_admins")
    .select("id, user_id, name, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("[requireAdmin] nbcm_admins lookup failed", error);
    redirect("/login?error=unavailable");
  }

  if (!data) {
    await supabase.auth.signOut();
    redirect("/login?error=forbidden");
  }

  return {
    id: data.id,
    user_id: data.user_id,
    name: data.name,
    role: data.role,
    email: user.email ?? "",
  };
}

/**
 * Returns the current admin profile if present, else null.
 * Does not redirect — use from the navbar or anywhere that shouldn't force a login.
 */
export async function getOptionalAdmin(): Promise<AdminProfile | null> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from("nbcm_admins")
    .select("id, user_id, name, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) return null;

  return {
    id: data.id,
    user_id: data.user_id,
    name: data.name,
    role: data.role,
    email: user.email ?? "",
  };
}
