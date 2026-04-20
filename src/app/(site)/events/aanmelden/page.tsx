import type { Metadata } from "next";
import { Calendar, MapPin, Clock } from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { getUpcomingEvents, formatEventDay, formatEventTimeRange } from "@/lib/data";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Event aanmelden",
  description:
    "Meld je aan voor het volgende NBCM-event op Mallorca. We zien je graag.",
};

export const dynamic = "force-dynamic";

type SP = { event?: string };

export default async function AanmeldenPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const events = await getUpcomingEvents();
  const preselected = sp.event
    ? (events.find((e) => e.slug === sp.event) ?? events[0] ?? null)
    : (events[0] ?? null);

  return (
    <>
      <Hero
        title="Aanmelden."
        subtitle="Reserveer je plek bij de volgende NBCM-bijeenkomst op Mallorca."
        compact
      />

      <section className="bg-ink">
        <div className="container-site py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] md:gap-16 items-start">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-terracotta" />
                  <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                    {preselected ? "Volgende bijeenkomst" : "Geen event geopend"}
                  </span>
                </div>

                {preselected ? (
                  <EventCallout event={preselected} />
                ) : (
                  <div className="mt-8">
                    <h2 className="font-heading text-3xl md:text-4xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05]">
                      Er staat nog geen nieuw event gepland.
                    </h2>
                    <p className="mt-6 text-pearl-80 leading-relaxed">
                      Houd de agenda in de gaten of meld je aan als lid om
                      een persoonlijke uitnodiging te krijgen.
                    </p>
                  </div>
                )}

                {events.length > 1 && (
                  <p className="mt-8 text-sm text-pearl-60">
                    Meerdere events geopend — kies je event in het
                    formulier hiernaast.
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl glass-strong p-6 md:p-8">
                <RegisterForm
                  events={events.map((e) => ({
                    id: e.id,
                    slug: e.slug,
                    title: e.title,
                    start_at: e.start_at,
                    location: e.location,
                  }))}
                  preselectedSlug={sp.event}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function EventCallout({
  event,
}: {
  event: Awaited<ReturnType<typeof getUpcomingEvents>>[number];
}) {
  const { day, month, year, weekday } = formatEventDay(event.start_at);
  const timeRange = formatEventTimeRange(event.start_at, event.end_at);

  return (
    <>
      <h2 className="mt-8 font-heading text-4xl md:text-5xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
        {event.title}
      </h2>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <InfoTile
          icon={<Calendar size={14} aria-hidden="true" />}
          label={weekday}
          value={`${day} ${month} ${year}`}
        />
        <InfoTile
          icon={<Clock size={14} aria-hidden="true" />}
          label="Tijd"
          value={timeRange}
        />
        {event.location && (
          <InfoTile
            icon={<MapPin size={14} aria-hidden="true" />}
            label="Locatie"
            value={event.location}
          />
        )}
      </div>

      {event.description && (
        <p className="mt-8 text-pearl-80 leading-relaxed text-lg max-w-xl">
          {event.description}
        </p>
      )}
    </>
  );
}

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl glass p-4">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-terracotta">
        {icon}
        {label}
      </div>
      <div className="mt-2 font-heading text-lg font-semibold text-pearl tracking-[-0.02em]">
        {value}
      </div>
    </div>
  );
}
