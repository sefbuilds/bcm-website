"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";

export type WelcomeResult = { ok: false; error: string };

export async function completeInviteAction(
  formData: FormData,
): Promise<WelcomeResult> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const name = String(formData.get("name") ?? "").trim();

  if (password.length < 10) {
    return { ok: false, error: "Kies een wachtwoord van minimaal 10 tekens." };
  }
  if (password !== confirm) {
    return { ok: false, error: "De wachtwoorden komen niet overeen." };
  }

  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false,
      error: "Sessie verlopen — open de uitnodigingsmail opnieuw.",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password,
    data: name ? { name } : undefined,
  });

  if (error) {
    console.error("[welcome:completeInvite]", error);
    return {
      ok: false,
      error: "Wachtwoord instellen mislukt. Probeer het opnieuw.",
    };
  }

  redirect("/dashboard");
}
