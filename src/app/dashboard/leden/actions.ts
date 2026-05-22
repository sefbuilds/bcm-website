"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { autoInitials } from "./initials";

export type MemberActionResult = { ok: false; error: string } | { ok: true };

export type MemberInput = {
  voornaam: string;
  achternaam: string;
  initials: string;
  role: string;
  company: string;
  location: string;
  bio: string;
  image_url: string;
  website: string;
  linkedin: string;
  instagram: string;
  is_public: boolean;
  sort_order: number;
};

function normalize(input: MemberInput): {
  row: Record<string, unknown>;
  error?: string;
} {
  const voornaam = input.voornaam.trim();
  const achternaam = input.achternaam.trim();
  if (!voornaam) return { row: {}, error: "Voornaam is verplicht." };

  const initials =
    (input.initials.trim() || autoInitials(voornaam, achternaam))
      .toUpperCase()
      .slice(0, 4);

  return {
    row: {
      voornaam,
      achternaam: achternaam || null,
      initials,
      role: input.role.trim() || null,
      company: input.company.trim() || null,
      location: input.location.trim() || null,
      bio: input.bio.trim() || null,
      image_url: input.image_url.trim() || null,
      website: input.website.trim() || null,
      linkedin: input.linkedin.trim() || null,
      instagram: input.instagram.trim() || null,
      is_public: !!input.is_public,
      sort_order:
        typeof input.sort_order === "number" ? input.sort_order : 0,
    },
  };
}

function invalidateAll() {
  revalidatePath("/");
  revalidatePath("/leden");
  revalidatePath("/dashboard/leden");
  revalidatePath("/dashboard");
}

export async function createMemberAction(
  input: MemberInput,
): Promise<MemberActionResult> {
  await requireAdmin();
  const { row, error } = normalize(input);
  if (error) return { ok: false, error };

  const supabase = getSupabaseAdmin();
  const { error: dbErr } = await supabase.from("nbcm_members").insert(row);
  if (dbErr) {
    console.error("[createMember]", dbErr);
    return { ok: false, error: "Aanmaken mislukt." };
  }

  invalidateAll();
  redirect("/dashboard/leden");
}

export async function updateMemberAction(
  id: string,
  input: MemberInput,
): Promise<MemberActionResult> {
  await requireAdmin();
  if (!id) return { ok: false, error: "Lid ID ontbreekt." };

  const { row, error } = normalize(input);
  if (error) return { ok: false, error };

  const supabase = getSupabaseAdmin();
  const { error: dbErr } = await supabase
    .from("nbcm_members")
    .update(row)
    .eq("id", id);
  if (dbErr) {
    console.error("[updateMember]", dbErr);
    return { ok: false, error: "Opslaan mislukt." };
  }

  invalidateAll();
  redirect("/dashboard/leden");
}

export async function deleteMemberAction(
  id: string,
): Promise<MemberActionResult> {
  await requireAdmin();
  if (!id) return { ok: false, error: "Lid ID ontbreekt." };

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("nbcm_members").delete().eq("id", id);
  if (error) {
    console.error("[deleteMember]", error);
    return { ok: false, error: "Verwijderen mislukt." };
  }

  invalidateAll();
  redirect("/dashboard/leden");
}
