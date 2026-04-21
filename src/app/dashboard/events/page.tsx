import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase";
import PageHeader from "../PageHeader";
import DashboardTable from "../DashboardTable";

type Event = {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  start_at: string;
  tag: string | null;
  is_featured: boolean;
  is_published: boolean;
  photos: string[] | null;
  max_attendees: number | null;
};

type EventWithCount = Event & { registration_count: number };

async function getEvents(): Promise<EventWithCount[]> {
  const supabase = getSupabaseAdmin();
  const { data: events, error } = await supabase
    .from("nbcm_events")
    .select(
      "id, slug, title, location, start_at, tag, is_featured, is_published, photos, max_attendees",
    )
    .order("start_at", { ascending: false });
  if (error) {
    console.error("[dashboard/events] load events", error);
    return [];
  }

  const { data: regs, error: regErr } = await supabase
    .from("nbcm_event_registrations")
    .select("event_id");
  if (regErr) {
    console.error("[dashboard/events] load registrations", regErr);
  }
  const countByEvent = new Map<string, number>();
  for (const r of regs ?? []) {
    const id = (r as { event_id: string }).event_id;
    countByEvent.set(id, (countByEvent.get(id) ?? 0) + 1);
  }

  return (events ?? []).map((e) => ({
    ...(e as Event),
    registration_count: countByEvent.get((e as Event).id) ?? 0,
  }));
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Madrid",
  }).format(new Date(iso));
}

export default async function EventsDashboardPage() {
  const events = await getEvents();
  const now = Date.now();
  const upcoming = events.filter((e) => new Date(e.start_at).getTime() >= now);
  const past = events.filter((e) => new Date(e.start_at).getTime() < now);

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title={`${upcoming.length} komend · ${past.length} verleden`}
        description="Beheer de agenda. Wijzigingen zijn direct zichtbaar op de site."
        action={
          <Link
            href="/dashboard/events/new"
            className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-white hover:bg-terracotta-light transition-all"
          >
            <Plus size={14} />
            Nieuw event
          </Link>
        }
      />

      <DashboardTable
        rows={events}
        empty="Nog geen events aangemaakt — klik op 'Nieuw event' om te beginnen."
        getKey={(e) => e.id}
        columns={[
          {
            header: "Datum",
            key: "date",
            cell: (e) => {
              const ts = new Date(e.start_at).getTime();
              const isFuture = ts >= now;
              return (
                <div>
                  <div className="text-pearl-80 text-xs tabular-nums">
                    {formatDate(e.start_at)}
                  </div>
                  <div
                    className={`mt-0.5 text-[10px] tracking-[0.2em] uppercase ${
                      isFuture ? "text-terracotta" : "text-pearl-60"
                    }`}
                  >
                    {isFuture ? "Komend" : "Geweest"}
                  </div>
                </div>
              );
            },
          },
          {
            header: "Titel",
            key: "title",
            cell: (e) => (
              <Link
                href={`/dashboard/events/${e.id}/edit`}
                className="group block"
              >
                <div className="font-medium text-pearl group-hover:text-terracotta transition-colors">
                  {e.title}
                </div>
                <div className="text-[11px] text-pearl-60 mt-0.5 font-mono">
                  {e.slug}
                </div>
              </Link>
            ),
          },
          {
            header: "Locatie",
            key: "location",
            cell: (e) => (
              <span className="text-pearl-80 text-sm">
                {e.location ?? "—"}
              </span>
            ),
          },
          {
            header: "Tag",
            key: "tag",
            cell: (e) =>
              e.tag ? (
                <span className="inline-flex rounded-full bg-pearl/10 text-pearl-80 px-2.5 py-0.5 text-[10px] tracking-[0.2em] uppercase">
                  {e.tag}
                </span>
              ) : (
                <span className="text-pearl-60">—</span>
              ),
          },
          {
            header: "Aanmeldingen",
            key: "regs",
            cell: (e) => (
              <span className="text-pearl font-medium tabular-nums">
                {e.registration_count}
                {e.max_attendees ? (
                  <span className="text-pearl-60 font-normal">
                    {" "}
                    / {e.max_attendees}
                  </span>
                ) : null}
              </span>
            ),
          },
          {
            header: "Status",
            key: "status",
            cell: (e) => (
              <span
                className={`inline-flex items-center gap-1.5 text-xs ${
                  e.is_published ? "text-olive" : "text-pearl-60"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    e.is_published ? "bg-olive" : "bg-pearl-60"
                  }`}
                />
                {e.is_published ? "Live" : "Concept"}
                {e.is_featured && (
                  <span className="ml-2 text-gold text-[10px] tracking-[0.2em] uppercase">
                    · Featured
                  </span>
                )}
              </span>
            ),
          },
          {
            header: "",
            key: "edit",
            cell: (e) => (
              <Link
                href={`/dashboard/events/${e.id}/edit`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3 py-1.5 text-xs text-pearl-80 hover:text-pearl hover:border-pearl/30 transition-colors"
                aria-label={`Bewerk ${e.title}`}
              >
                <Pencil size={12} />
                Bewerk
              </Link>
            ),
            className: "text-right",
          },
        ]}
      />
    </>
  );
}
