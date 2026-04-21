"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export type EventActionResult = { ok: false; error: string } | { ok: true };

export type EventInput = {
  slug: string;
  title: string;
  description: string;
  location: string;
  start_at_local: string; // "YYYY-MM-DDTHH:MM"
  end_at_local: string; // may be empty
  tag: string;
  hero_image: string;
  photos: string; // newline/comma-separated
  is_featured: boolean;
  is_published: boolean;
  max_attendees: number | null;
  sort_order: number;
};

/* -------------------------------------------------------------------------- */

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Turns a `<input type="datetime-local">` value (e.g. "2026-04-26T14:00")
 * into an ISO string with the Madrid offset applied (+02 in CEST,
 * +01 in CET). Heuristic: CEST from last Sunday of March to last Sunday
 * of October — close enough for event scheduling.
 */
function madridIsoFromLocal(value: string): string {
  if (!value) return "";
  const [datePart, timePart] = value.split("T");
  if (!datePart || !timePart) return "";
  const [y, m, d] = datePart.split("-").map((n) => parseInt(n, 10));

  const lastSundayOfMarch = ((): number => {
    const march31 = new Date(Date.UTC(y, 2, 31));
    return 31 - march31.getUTCDay();
  })();
  const lastSundayOfOctober = ((): number => {
    const oct31 = new Date(Date.UTC(y, 9, 31));
    return 31 - oct31.getUTCDay();
  })();

  const afterSpringTransition =
    m > 3 || (m === 3 && d >= lastSundayOfMarch);
  const beforeFallTransition =
    m < 10 || (m === 10 && d < lastSundayOfOctober);

  const isCEST = afterSpringTransition && beforeFallTransition;
  const offset = isCEST ? "+02:00" : "+01:00";

  const hhmm =
    timePart.length === 5 ? `${timePart}:00` : timePart; // ensure seconds
  return `${datePart}T${hhmm}${offset}`;
}

function parsePhotos(raw: string): string[] {
  if (!raw) return [];
  return raw
    .split(/[\n,]+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

/* -------------------------------------------------------------------------- */

function normalizeInput(input: EventInput): {
  slug: string;
  row: Record<string, unknown>;
  error?: string;
} {
  if (!input.title.trim()) {
    return { slug: "", row: {}, error: "Titel is verplicht." };
  }
  if (!input.start_at_local) {
    return { slug: "", row: {}, error: "Startdatum en -tijd zijn verplicht." };
  }

  const slug = (input.slug.trim() || slugify(input.title)).slice(0, 120);
  if (!slug) {
    return { slug: "", row: {}, error: "Slug kon niet worden bepaald." };
  }

  const start_at = madridIsoFromLocal(input.start_at_local);
  const end_at = input.end_at_local
    ? madridIsoFromLocal(input.end_at_local)
    : null;

  const row = {
    slug,
    title: input.title.trim(),
    description: input.description.trim() || null,
    location: input.location.trim() || null,
    start_at,
    end_at,
    tag: input.tag.trim() || null,
    hero_image: input.hero_image.trim() || null,
    photos: parsePhotos(input.photos),
    is_featured: !!input.is_featured,
    is_published: !!input.is_published,
    max_attendees:
      typeof input.max_attendees === "number" && input.max_attendees > 0
        ? input.max_attendees
        : null,
    sort_order:
      typeof input.sort_order === "number" ? input.sort_order : 0,
  };

  return { slug, row };
}

function invalidateAll() {
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/events/aanmelden");
  revalidatePath("/dashboard/events");
  revalidatePath("/dashboard");
}

/* -------------------------------------------------------------------------- */

export async function createEventAction(
  input: EventInput,
): Promise<EventActionResult> {
  await requireAdmin();
  const { row, error } = normalizeInput(input);
  if (error) return { ok: false, error };

  const supabase = getSupabaseAdmin();
  const { error: dbErr } = await supabase
    .from("nbcm_events")
    .insert(row);

  if (dbErr) {
    if (dbErr.code === "23505") {
      return {
        ok: false,
        error: "Deze slug bestaat al — kies een andere.",
      };
    }
    console.error("[createEvent]", dbErr);
    return { ok: false, error: "Aanmaken mislukt." };
  }

  invalidateAll();
  redirect("/dashboard/events");
}

export async function updateEventAction(
  id: string,
  input: EventInput,
): Promise<EventActionResult> {
  await requireAdmin();
  if (!id) return { ok: false, error: "Event ID ontbreekt." };

  const { row, error } = normalizeInput(input);
  if (error) return { ok: false, error };

  const supabase = getSupabaseAdmin();
  const { error: dbErr } = await supabase
    .from("nbcm_events")
    .update(row)
    .eq("id", id);

  if (dbErr) {
    if (dbErr.code === "23505") {
      return {
        ok: false,
        error: "Deze slug bestaat al — kies een andere.",
      };
    }
    console.error("[updateEvent]", dbErr);
    return { ok: false, error: "Opslaan mislukt." };
  }

  invalidateAll();
  redirect("/dashboard/events");
}

export async function deleteEventAction(id: string): Promise<EventActionResult> {
  await requireAdmin();
  if (!id) return { ok: false, error: "Event ID ontbreekt." };

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("nbcm_events")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[deleteEvent]", error);
    return { ok: false, error: "Verwijderen mislukt." };
  }

  invalidateAll();
  redirect("/dashboard/events");
}
