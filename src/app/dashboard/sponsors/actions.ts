"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export type SponsorActionResult = { ok: false; error: string } | { ok: true };

export type SponsorInput = {
  name: string;
  company: string;
  website: string;
  website_label: string;
  image_url: string;
  logo_url: string;
  linkedin: string;
  instagram: string;
  is_active: boolean;
  sort_order: number;
};

function deriveWebsiteLabel(url: string): string {
  return url
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .toLowerCase();
}

function normalize(input: SponsorInput): {
  row: Record<string, unknown>;
  error?: string;
} {
  const name = input.name.trim();
  const company = input.company.trim();
  const website = input.website.trim();
  const image_url = input.image_url.trim();

  if (!name) return { row: {}, error: "Contactnaam is verplicht." };
  if (!company) return { row: {}, error: "Bedrijfsnaam is verplicht." };
  if (!website) return { row: {}, error: "Website is verplicht." };
  if (!image_url)
    return { row: {}, error: "Profielfoto (URL of pad) is verplicht." };

  const website_label =
    input.website_label.trim() || deriveWebsiteLabel(website);

  return {
    row: {
      name,
      company,
      website,
      website_label,
      image_url,
      logo_url: input.logo_url.trim() || null,
      linkedin: input.linkedin.trim() || null,
      instagram: input.instagram.trim() || null,
      is_active: !!input.is_active,
      sort_order:
        typeof input.sort_order === "number" ? input.sort_order : 0,
    },
  };
}

function invalidateAll() {
  revalidatePath("/");
  revalidatePath("/sponsors");
  revalidatePath("/dashboard/sponsors");
  revalidatePath("/dashboard");
}

export async function createSponsorAction(
  input: SponsorInput,
): Promise<SponsorActionResult> {
  await requireAdmin();
  const { row, error } = normalize(input);
  if (error) return { ok: false, error };

  const supabase = getSupabaseAdmin();
  const { error: dbErr } = await supabase.from("nbcm_sponsors").insert(row);
  if (dbErr) {
    console.error("[createSponsor]", dbErr);
    return { ok: false, error: "Aanmaken mislukt." };
  }

  invalidateAll();
  redirect("/dashboard/sponsors");
}

export async function updateSponsorAction(
  id: string,
  input: SponsorInput,
): Promise<SponsorActionResult> {
  await requireAdmin();
  if (!id) return { ok: false, error: "Sponsor ID ontbreekt." };

  const { row, error } = normalize(input);
  if (error) return { ok: false, error };

  const supabase = getSupabaseAdmin();
  const { error: dbErr } = await supabase
    .from("nbcm_sponsors")
    .update(row)
    .eq("id", id);
  if (dbErr) {
    console.error("[updateSponsor]", dbErr);
    return { ok: false, error: "Opslaan mislukt." };
  }

  invalidateAll();
  redirect("/dashboard/sponsors");
}

export async function deleteSponsorAction(
  id: string,
): Promise<SponsorActionResult> {
  await requireAdmin();
  if (!id) return { ok: false, error: "Sponsor ID ontbreekt." };

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("nbcm_sponsors")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("[deleteSponsor]", error);
    return { ok: false, error: "Verwijderen mislukt." };
  }

  invalidateAll();
  redirect("/dashboard/sponsors");
}
