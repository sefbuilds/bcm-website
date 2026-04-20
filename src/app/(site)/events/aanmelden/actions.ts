"use server";

import { headers } from "next/headers";
import { createHash } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";

export type EventRegistrationPayload = {
  event_id: string;
  voornaam: string;
  achternaam?: string;
  email: string;
  dial_code?: string;
  telefoon?: string;
  bedrijf?: string;
  guests?: number;
  dietary?: string;
  notes?: string;
};

export type EventRegistrationResult =
  | { ok: true }
  | { ok: false; error: string };

function hashIp(ip: string | null | undefined) {
  if (!ip) return null;
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function registerForEvent(
  payload: EventRegistrationPayload,
): Promise<EventRegistrationResult> {
  if (!payload?.event_id) {
    return { ok: false, error: "Geen event geselecteerd." };
  }
  if (!payload.voornaam?.trim() || !payload.email?.trim()) {
    return { ok: false, error: "Voornaam en e-mail zijn verplicht." };
  }
  if (!/.+@.+\..+/.test(payload.email)) {
    return { ok: false, error: "Ongeldig e-mailadres." };
  }

  const telefoon =
    payload.telefoon?.trim() && payload.dial_code
      ? `+${payload.dial_code} ${payload.telefoon.trim()}`
      : payload.telefoon?.trim() || null;

  const h = await headers();
  const userAgent = h.get("user-agent") ?? null;
  const forwardedFor = h.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : null;

  const supabase = getSupabaseAdmin();

  // Confirm event exists + published
  const { data: event, error: eventErr } = await supabase
    .from("nbcm_events")
    .select("id, is_published, max_attendees")
    .eq("id", payload.event_id)
    .maybeSingle();

  if (eventErr || !event || !event.is_published) {
    return { ok: false, error: "Dit event bestaat niet of is niet meer beschikbaar." };
  }

  if (event.max_attendees) {
    const { count } = await supabase
      .from("nbcm_event_registrations")
      .select("id", { count: "exact", head: true })
      .eq("event_id", payload.event_id);
    if ((count ?? 0) >= event.max_attendees) {
      return {
        ok: false,
        error: "Dit event is vol — neem contact op voor de wachtlijst.",
      };
    }
  }

  const { error } = await supabase.from("nbcm_event_registrations").insert({
    event_id: payload.event_id,
    voornaam: payload.voornaam.trim(),
    achternaam: payload.achternaam?.trim() || null,
    email: payload.email.trim().toLowerCase(),
    telefoon,
    bedrijf: payload.bedrijf?.trim() || null,
    guests: Math.max(0, Math.min(payload.guests ?? 0, 10)),
    dietary: payload.dietary?.trim() || null,
    notes: payload.notes?.trim() || null,
    user_agent: userAgent,
    ip_hash: hashIp(ip),
  });

  if (error) {
    if (error.code === "23505") {
      return {
        ok: false,
        error:
          "Je bent al aangemeld voor dit event met dit e-mailadres. Mail ons als je iets wil wijzigen.",
      };
    }
    console.error("[registerForEvent]", error);
    return { ok: false, error: "Opslaan mislukt. Probeer het opnieuw." };
  }

  return { ok: true };
}
