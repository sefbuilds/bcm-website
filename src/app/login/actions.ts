"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase";

export type SignInResult = { ok: false; error: string };

export async function signInAction(formData: FormData): Promise<SignInResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ok: false, error: "Vul e-mail en wachtwoord in." };
  }

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { ok: false, error: "Ongeldige inloggegevens." };
  }

  const admin = getSupabaseAdmin();
  const { data: adminRow } = await admin
    .from("nbcm_admins")
    .select("id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!adminRow) {
    await supabase.auth.signOut();
    return {
      ok: false,
      error:
        "Deze account heeft geen toegang tot het dashboard. Neem contact op met het bestuur.",
    };
  }

  redirect("/dashboard");
}
