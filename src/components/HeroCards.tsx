import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";
import {
  getNextEvent,
  getFeaturedRecentEvent,
  getMemberStats,
  formatEventDay,
} from "@/lib/data";

/**
 * Three-card strip onder de hero — volgt v13 ref
 *  - Kaart 1: volgend event (sunset/ocean)
 *  - Kaart 2: laatste event (foto + dark gradient)
 *  - Kaart 3: stack van leden + locatie (cream cards)
 */
export default async function HeroCards() {
  const [nextEvent, recentEvent, memberStats] = await Promise.all([
    getNextEvent(),
    getFeaturedRecentEvent(),
    getMemberStats(),
  ]);

  return (
    <section className="bg-sand py-12 md:py-14">
      <div className="container-site grid grid-cols-1 md:grid-cols-3 gap-5">
        <NextEventCard event={nextEvent} />
        <RecentEventCard event={recentEvent} />
        <SideStack memberCount={memberStats.total} />
      </div>
    </section>
  );
}

type Event = Awaited<ReturnType<typeof getNextEvent>>;

function NextEventCard({ event }: { event: Event }) {
  const parts = event ? formatEventDay(event.start_at) : null;

  return (
    <Link
      href={
        event ? `/events/aanmelden?event=${event.slug}` : "/events"
      }
      className="group relative block bg-ocean p-8 min-h-[240px] overflow-hidden transition-transform hover:-translate-y-[3px]"
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[0.58rem] tracking-[0.22em] uppercase text-sunset-light font-medium inline-flex items-center gap-2">
            <Calendar size={11} aria-hidden="true" />
            Volgende bijeenkomst
          </span>
          <span className="text-warm-text/40 text-base">→</span>
        </div>
        {event && parts ? (
          <>
            <div className="font-heading text-[5rem] font-light text-white leading-none mb-1">
              {parts.day}
            </div>
            <div className="font-heading text-[1.1rem] text-sunset-light italic mb-1">
              {parts.month} {parts.year}
            </div>
            <div className="text-[0.75rem] text-warm-text/50 mb-4">
              {parts.time}
            </div>
            <div className="text-base font-medium text-white font-body mb-1">
              {event.title}
            </div>
            {event.location && (
              <div className="text-[0.75rem] text-warm-text/45 inline-flex items-center gap-1.5">
                <MapPin size={11} aria-hidden="true" /> {event.location}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="font-heading text-[3rem] font-light text-white leading-none mb-2">
              Binnenkort
            </div>
            <div className="text-[0.75rem] tracking-[0.15em] uppercase text-warm-text/45">
              Nieuwe datum wordt gepland
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

function RecentEventCard({ event }: { event: Event }) {
  const parts = event ? formatEventDay(event.start_at) : null;
  const photo = event?.photos?.[0] || event?.hero_image;

  return (
    <Link
      href="/events"
      className="group relative block min-h-[240px] overflow-hidden bg-ocean-mid transition-transform hover:-translate-y-[3px]"
    >
      {photo && (
        <Image
          src={photo}
          alt={event?.title ?? "Laatste event"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-ocean-deep/30 to-ocean-deep/85" />
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-[0.58rem] tracking-[0.22em] uppercase text-sunset-light font-medium inline-flex items-center gap-2">
            <Calendar size={11} aria-hidden="true" />
            Laatste event
          </span>
          <span className="text-warm-text/40 text-base">→</span>
        </div>
        <div>
          <div className="font-heading text-[1.6rem] font-light text-white leading-tight mb-2">
            {event?.title ?? "Het hele jaar door events"}
          </div>
          <div className="text-[0.72rem] text-warm-text/45 tracking-[0.08em] uppercase">
            {event && parts
              ? `${parts.day} ${parts.month} ${parts.year} · ${event.location ?? "Mallorca"}`
              : "Borrels · Diners · Masterclasses"}
          </div>
        </div>
      </div>
    </Link>
  );
}

function SideStack({ memberCount }: { memberCount: number }) {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/leden"
        className="group block bg-cream p-7 border border-sunset/12 transition-transform hover:-translate-y-[2px] flex-1"
      >
        <div className="flex justify-between items-center">
          <span className="text-[0.58rem] tracking-[0.22em] uppercase text-sunset font-medium inline-flex items-center gap-2">
            <Users size={11} aria-hidden="true" />
            Leden
          </span>
          <span className="text-sunset/50 text-sm">→</span>
        </div>
        <div className="mt-4">
          <div className="font-heading text-[3rem] font-light text-text leading-none flex items-baseline gap-2">
            {memberCount > 0 ? memberCount : "·"}
            <span className="text-[0.95rem] text-text-muted font-body font-light">
              ondernemers
            </span>
          </div>
        </div>
      </Link>
      <div className="bg-cream p-7 border border-sunset/12 flex-1">
        <span className="text-[0.58rem] tracking-[0.22em] uppercase text-sunset font-medium inline-flex items-center gap-2 mb-3">
          <MapPin size={11} aria-hidden="true" />
          Basis
        </span>
        <div className="font-heading text-[1.55rem] font-light text-text mt-2 mb-1">
          Palma de Mallorca
        </div>
        <div className="text-[0.72rem] text-text-muted">
          39.57° N · 2.65° E
        </div>
      </div>
    </div>
  );
}
