"use server";

import { headers } from "next/headers";
import { createHash } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";

export type IntakeRole = "lid" | "bestuur";
export type IntakeTier = "member" | "partner" | "sponsor" | null;

export type IntakePayload = {
  role: IntakeRole;
  tier?: IntakeTier;
  voornaam: string;
  achternaam?: string;
  email: string;
  telefoon?: string;
  woonplaats?: string;
  bedrijf?: string;
  website?: string;
  fase?: string;
  // Everything else (textareas, radios, multi-selects, ranks)
  data?: Record<string, unknown>;
};

export type IntakeResult =
  | { ok: true }
  | { ok: false; error: string };

function hashIp(ip: string | null | undefined) {
  if (!ip) return null;
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function submitIntake(
  payload: IntakePayload,
): Promise<IntakeResult> {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Ongeldige invoer." };
  }
  if (!payload.voornaam?.trim() || !payload.email?.trim()) {
    return { ok: false, error: "Voornaam en e-mail zijn verplicht." };
  }
  if (payload.role !== "lid" && payload.role !== "bestuur") {
    return { ok: false, error: "Rol ontbreekt." };
  }
  // Very light email sanity check — just prevents obvious garbage
  if (!/.+@.+\..+/.test(payload.email)) {
    return { ok: false, error: "Ongeldig e-mailadres." };
  }

  const h = await headers();
  const userAgent = h.get("user-agent") ?? null;
  const forwardedFor = h.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : null;

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("nbcm_intakes").insert({
      role: payload.role,
      tier: payload.tier ?? null,
      voornaam: payload.voornaam.trim(),
      achternaam: payload.achternaam?.trim() || null,
      email: payload.email.trim().toLowerCase(),
      telefoon: payload.telefoon?.trim() || null,
      woonplaats: payload.woonplaats?.trim() || null,
      bedrijf: payload.bedrijf?.trim() || null,
      website: payload.website?.trim() || null,
      fase: payload.fase || null,
      data: payload.data ?? {},
      user_agent: userAgent,
      ip_hash: hashIp(ip),
    });

    if (error) {
      console.error("[submitIntake] Supabase insert error", error);
      return {
        ok: false,
        error: "Opslaan mislukt. Probeer het opnieuw of mail ons direct.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[submitIntake] unexpected error", err);
    return {
      ok: false,
      error:
        "Onverwachte fout. Probeer het opnieuw of stuur je antwoorden per e-mail.",
    };
  }
}
