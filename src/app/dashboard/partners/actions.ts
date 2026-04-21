"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export type PartnerActionResult = { ok: false; error: string } | { ok: true };

export type PartnerInput = {
  name: string;
  tier: "partner" | "vriend";
  website: string;
  logo_url: string;
  is_active: boolean;
  sort_order: number;
};

function normalize(input: PartnerInput): {
  row: Record<string, unknown>;
  error?: string;
} {
  const name = input.name.trim();
  if (!name) return { row: {}, error: "Naam is verplicht." };
  if (input.tier !== "partner" && input.tier !== "vriend") {
    return { row: {}, error: "Kies een geldige tier." };
  }
  return {
    row: {
      name,
      tier: input.tier,
      website: input.website.trim() || null,
      logo_url: input.logo_url.trim() || null,
      is_active: !!input.is_active,
      sort_order:
        typeof input.sort_order === "number" ? input.sort_order : 0,
    },
  };
}

function invalidateAll() {
  revalidatePath("/");
  revalidatePath("/sponsors");
  revalidatePath("/dashboard/partners");
  revalidatePath("/dashboard");
}

export async function createPartnerAction(
  input: PartnerInput,
): Promise<PartnerActionResult> {
  await requireAdmin();
  const { row, error } = normalize(input);
  if (error) return { ok: false, error };

  const supabase = getSupabaseAdmin();
  const { error: dbErr } = await supabase.from("nbcm_partners").insert(row);
  if (dbErr) {
    console.error("[createPartner]", dbErr);
    return { ok: false, error: "Aanmaken mislukt." };
  }

  invalidateAll();
  redirect("/dashboard/partners");
}

export async function updatePartnerAction(
  id: string,
  input: PartnerInput,
): Promise<PartnerActionResult> {
  await requireAdmin();
  if (!id) return { ok: false, error: "Partner ID ontbreekt." };

  const { row, error } = normalize(input);
  if (error) return { ok: false, error };

  const supabase = getSupabaseAdmin();
  const { error: dbErr } = await supabase
    .from("nbcm_partners")
    .update(row)
    .eq("id", id);
  if (dbErr) {
    console.error("[updatePartner]", dbErr);
    return { ok: false, error: "Opslaan mislukt." };
  }

  invalidateAll();
  redirect("/dashboard/partners");
}

export async function deletePartnerAction(
  id: string,
): Promise<PartnerActionResult> {
  await requireAdmin();
  if (!id) return { ok: false, error: "Partner ID ontbreekt." };

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("nbcm_partners")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("[deletePartner]", error);
    return { ok: false, error: "Verwijderen mislukt." };
  }

  invalidateAll();
  redirect("/dashboard/partners");
}
