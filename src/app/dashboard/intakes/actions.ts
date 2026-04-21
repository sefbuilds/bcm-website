"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export type ConvertResult =
  | { ok: true; memberId: string }
  | { ok: true; authUserId: string; tempPassword: string }
  | { ok: false; error: string };

function autoInitials(voornaam: string, achternaam: string): string {
  const strip = (s: string) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const v = strip(voornaam.trim());
  const a = strip(achternaam.trim());
  const first = v ? v[0] : "";
  const lastWord = a ? a.split(/\s+/).pop() ?? "" : "";
  const last = lastWord ? lastWord[0] : "";
  return `${first}${last}`.toUpperCase() || v.slice(0, 2).toUpperCase();
}

function randomPassword(): string {
  const alphabet = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => alphabet[b % alphabet.length])
    .join("");
}

export async function convertIntakeToMemberAction(
  intakeId: string,
): Promise<ConvertResult> {
  await requireAdmin();
  if (!intakeId) return { ok: false, error: "Intake ID ontbreekt." };

  const supabase = getSupabaseAdmin();
  const { data: intake, error } = await supabase
    .from("nbcm_intakes")
    .select(
      "voornaam, achternaam, email, bedrijf, woonplaats, website, data",
    )
    .eq("id", intakeId)
    .maybeSingle();

  if (error || !intake) {
    return { ok: false, error: "Intake niet gevonden." };
  }

  const voornaam = (intake.voornaam ?? "").trim();
  const achternaam = (intake.achternaam ?? "").trim();
  if (!voornaam) return { ok: false, error: "Voornaam ontbreekt." };

  // Bio uit "wat breng jij" + "wat zoek je voor type mensen"
  const d = (intake.data ?? {}) as Record<string, unknown>;
  const bio = [d.q_breng_waarde, d.q_netwerk_type]
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    .join(" · ") || null;

  const { data: inserted, error: insertErr } = await supabase
    .from("nbcm_members")
    .insert({
      voornaam,
      achternaam: achternaam || null,
      initials: autoInitials(voornaam, achternaam),
      role: null,
      company: intake.bedrijf ?? null,
      location: intake.woonplaats ?? null,
      bio,
      website: intake.website ?? null,
      is_public: true,
      sort_order: 1000, // recently added lands at the back
    })
    .select("id")
    .single();

  if (insertErr) {
    console.error("[convertIntakeToMember]", insertErr);
    return { ok: false, error: "Toevoegen mislukt." };
  }

  revalidatePath("/");
  revalidatePath("/leden");
  revalidatePath("/dashboard/leden");
  revalidatePath("/dashboard/intakes");
  revalidatePath("/dashboard");

  return { ok: true, memberId: inserted.id };
}

export async function convertIntakeToAdminAction(
  intakeId: string,
): Promise<ConvertResult> {
  await requireAdmin();
  if (!intakeId) return { ok: false, error: "Intake ID ontbreekt." };

  const supabase = getSupabaseAdmin();
  const { data: intake, error } = await supabase
    .from("nbcm_intakes")
    .select("voornaam, achternaam, email")
    .eq("id", intakeId)
    .maybeSingle();

  if (error || !intake) {
    return { ok: false, error: "Intake niet gevonden." };
  }

  const email = (intake.email ?? "").trim().toLowerCase();
  const voornaam = (intake.voornaam ?? "").trim();
  const achternaam = (intake.achternaam ?? "").trim();
  if (!email || !voornaam) {
    return { ok: false, error: "E-mail of voornaam ontbreekt." };
  }

  const fullName = [voornaam, achternaam].filter(Boolean).join(" ");
  const tempPassword = randomPassword();

  // Create auth user via admin API (auto-confirmed, no invite email sent)
  const { data: created, error: createErr } =
    await supabase.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { name: fullName },
    });

  let userId = created?.user?.id;

  if (createErr) {
    // If user already exists, look them up
    const msg = createErr.message?.toLowerCase() ?? "";
    if (msg.includes("already") || msg.includes("registered")) {
      const { data: list } = await supabase.auth.admin.listUsers();
      const existing = list?.users?.find(
        (u) => u.email?.toLowerCase() === email,
      );
      if (!existing) {
        return { ok: false, error: "Kon bestaande user niet vinden." };
      }
      userId = existing.id;
    } else {
      console.error("[convertIntakeToAdmin] createUser", createErr);
      return { ok: false, error: "Auth user aanmaken mislukt." };
    }
  }

  if (!userId) return { ok: false, error: "User ID ontbreekt." };

  const { error: adminErr } = await supabase.from("nbcm_admins").upsert(
    {
      user_id: userId,
      name: fullName,
      role: "bestuur",
    },
    { onConflict: "user_id" },
  );

  if (adminErr) {
    console.error("[convertIntakeToAdmin] admins upsert", adminErr);
    return { ok: false, error: "Admin-rij aanmaken mislukt." };
  }

  revalidatePath("/dashboard/intakes");
  revalidatePath("/dashboard");

  return { ok: true, authUserId: userId, tempPassword };
}
