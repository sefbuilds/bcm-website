import { getSupabasePublic } from "./supabase-public";

export type DBMember = {
  id: string;
  name: string;
  initials: string;
  role: string | null;
  company: string | null;
  location: string | null;
  bio: string | null;
  image_url: string | null;
  linkedin: string | null;
  instagram: string | null;
  website: string | null;
  is_public: boolean;
  sort_order: number;
};

export type DBSponsor = {
  id: string;
  name: string;
  company: string;
  website: string;
  website_label: string;
  image_url: string;
  logo_url: string | null;
  linkedin: string | null;
  instagram: string | null;
  is_active: boolean;
  sort_order: number;
};

export type DBPartner = {
  id: string;
  name: string;
  tier: "partner" | "vriend";
  website: string | null;
  logo_url: string | null;
  is_active: boolean;
  sort_order: number;
};

export type DBEvent = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  location: string | null;
  start_at: string;
  end_at: string | null;
  tag: string | null;
  hero_image: string | null;
  photos: string[];
  is_featured: boolean;
  is_published: boolean;
  max_attendees: number | null;
  sort_order: number;
};

// ---------------------------------------------------------------------------
// Members
// ---------------------------------------------------------------------------

export async function getMembers(): Promise<DBMember[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("nbcm_members")
    .select(
      "id, name, initials, role, company, location, bio, image_url, linkedin, instagram, website, is_public, sort_order",
    )
    .eq("is_public", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[data:getMembers]", error);
    return [];
  }
  return (data ?? []) as DBMember[];
}

export async function getMemberStats(): Promise<{
  total: number;
  locations: string[];
}> {
  const supabase = getSupabasePublic();
  if (!supabase) return { total: 0, locations: [] };
  const { data, error } = await supabase
    .from("nbcm_members")
    .select("location")
    .eq("is_public", true);
  if (error) {
    console.error("[data:getMemberStats]", error);
    return { total: 0, locations: [] };
  }
  const total = data.length;
  const locations = Array.from(
    new Set(
      data
        .map((r) => (r as { location: string | null }).location)
        .filter((v): v is string => !!v),
    ),
  ).sort((a, b) => a.localeCompare(b, "nl"));
  return { total, locations };
}

// ---------------------------------------------------------------------------
// Sponsors
// ---------------------------------------------------------------------------

export async function getSponsors(): Promise<DBSponsor[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("nbcm_sponsors")
    .select(
      "id, name, company, website, website_label, image_url, logo_url, linkedin, instagram, is_active, sort_order",
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[data:getSponsors]", error);
    return [];
  }
  return (data ?? []) as DBSponsor[];
}

// ---------------------------------------------------------------------------
// Partners
// ---------------------------------------------------------------------------

export async function getPartners(): Promise<DBPartner[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("nbcm_partners")
    .select("id, name, tier, website, logo_url, is_active, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[data:getPartners]", error);
    return [];
  }
  return (data ?? []) as DBPartner[];
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export async function getUpcomingEvents(): Promise<DBEvent[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("nbcm_events")
    .select(
      "id, slug, title, description, location, start_at, end_at, tag, hero_image, photos, is_featured, is_published, max_attendees, sort_order",
    )
    .eq("is_published", true)
    .gte("start_at", new Date().toISOString())
    .order("start_at", { ascending: true });

  if (error) {
    console.error("[data:getUpcomingEvents]", error);
    return [];
  }
  return (data ?? []) as DBEvent[];
}

export async function getPastEvents(): Promise<DBEvent[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("nbcm_events")
    .select(
      "id, slug, title, description, location, start_at, end_at, tag, hero_image, photos, is_featured, is_published, max_attendees, sort_order",
    )
    .eq("is_published", true)
    .lt("start_at", new Date().toISOString())
    .order("start_at", { ascending: false });

  if (error) {
    console.error("[data:getPastEvents]", error);
    return [];
  }
  return (data ?? []) as DBEvent[];
}

export async function getNextEvent(): Promise<DBEvent | null> {
  const events = await getUpcomingEvents();
  return events[0] ?? null;
}

export async function getFeaturedRecentEvent(): Promise<DBEvent | null> {
  const supabase = getSupabasePublic();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("nbcm_events")
    .select(
      "id, slug, title, description, location, start_at, end_at, tag, hero_image, photos, is_featured, is_published, max_attendees, sort_order",
    )
    .eq("is_published", true)
    .lt("start_at", new Date().toISOString())
    .not("photos", "is", null)
    .order("start_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("[data:getFeaturedRecentEvent]", error);
    return null;
  }

  const withPhotos = (data ?? []).find(
    (e) => (e.photos as string[] | null)?.length,
  );
  return (withPhotos as DBEvent | undefined) ?? null;
}

export async function getEventBySlug(slug: string): Promise<DBEvent | null> {
  const supabase = getSupabasePublic();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("nbcm_events")
    .select(
      "id, slug, title, description, location, start_at, end_at, tag, hero_image, photos, is_featured, is_published, max_attendees, sort_order",
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("[data:getEventBySlug]", error);
    return null;
  }
  return (data as DBEvent | null) ?? null;
}

// ---------------------------------------------------------------------------
// Event helpers
// ---------------------------------------------------------------------------

export function formatEventDay(startAt: string): {
  day: string;
  month: string;
  year: string;
  time: string;
  weekday: string;
} {
  const d = new Date(startAt);
  const tz = "Europe/Madrid";
  const day = new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    timeZone: tz,
  }).format(d);
  const month = new Intl.DateTimeFormat("nl-NL", {
    month: "short",
    timeZone: tz,
  })
    .format(d)
    .replace(".", "")
    .toUpperCase();
  const year = new Intl.DateTimeFormat("nl-NL", {
    year: "numeric",
    timeZone: tz,
  }).format(d);
  const time = new Intl.DateTimeFormat("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: tz,
  }).format(d);
  const weekday = new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    timeZone: tz,
  })
    .format(d)
    .replace(/^./, (c) => c.toUpperCase());
  return { day, month, year, time, weekday };
}

export function formatEventTimeRange(
  startAt: string,
  endAt: string | null,
): string {
  const tz = "Europe/Madrid";
  const fmt = new Intl.DateTimeFormat("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: tz,
  });
  const start = fmt.format(new Date(startAt));
  if (!endAt) return start;
  const end = fmt.format(new Date(endAt));
  return `${start} - ${end}`;
}
