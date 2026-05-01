import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import {
  getNextEvent,
  getPastEvents,
  formatEventDay,
  formatEventTimeRange,
} from "@/lib/data";
import { STOCK_IMAGES } from "@/lib/constants";
import Reveal from "./Reveal";

export default async function NextEvent() {
  const [event, past] = await Promise.all([
    getNextEvent(),
    getPastEvents(),
  ]);
  const previousEvents = past.slice(0, 3);
  const heroImg =
    event?.hero_image ||
    event?.photos?.[0] ||
    STOCK_IMAGES.mallorcaCoast;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2" id="events">
      {/* Image / brand panel */}
      <div className="relative overflow-hidden min-h-[420px] md:min-h-[480px]">
        {event ? (
          <Image
            src={heroImg}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-ocean-mid flex items-center justify-center p-12">
            <span className="font-heading italic text-warm-text/30 text-[5rem] font-light">
              NBCM
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-r from-ocean-deep/40 to-transparent" />
      </div>

      {/* Agenda card */}
      <div className="bg-ocean px-6 md:px-14 py-16 md:py-20 flex flex-col justify-center">
        <Reveal>
          <span className="label label-light block mb-4">Agenda</span>
        </Reveal>

        {event ? (
          <>
            <AgendaHeader event={event} />

            <Link
              href={`/events/aanmelden?event=${event.slug}`}
              className="self-start inline-flex items-center px-8 py-3.5 bg-sunset text-white text-[0.78rem] font-medium tracking-[0.08em] uppercase font-body transition-colors hover:bg-sunset-light"
            >
              Meld je aan
            </Link>
          </>
        ) : (
          <h3 className="font-heading text-[2rem] font-light text-warm-text mb-6">
            Volgende bijeenkomst volgt binnenkort.
          </h3>
        )}

        {previousEvents.length > 0 && (
          <>
            <div className="w-full h-px bg-warm-text/10 my-8" />
            <span className="text-[0.58rem] tracking-[0.24em] uppercase text-warm-text/30 mb-3 block">
              Vorige bijeenkomsten
            </span>
            <ul className="flex flex-col">
              {previousEvents.map((p) => {
                const parts = formatEventDay(p.start_at);
                return (
                  <li
                    key={p.id}
                    className="flex items-center gap-4 py-3 border-b border-warm-text/8 last:border-b-0"
                  >
                    <span className="font-heading italic text-[0.85rem] text-sunset-light min-w-[80px]">
                      {parts.day} {parts.month.toLowerCase()} {parts.year}
                    </span>
                    <span className="text-[0.84rem] text-warm-text/60 flex-1 truncate">
                      {p.title}
                    </span>
                    <span className="text-sunset/40">→</span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

function AgendaHeader({
  event,
}: {
  event: NonNullable<Awaited<ReturnType<typeof getNextEvent>>>;
}) {
  const parts = formatEventDay(event.start_at);
  const range = formatEventTimeRange(event.start_at, event.end_at);
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-heading text-[4.5rem] font-light text-warm-text leading-none">
          {parts.day}
        </span>
        <span className="font-heading italic text-[1.3rem] font-light text-sunset-light">
          {parts.month} {parts.year}
        </span>
      </div>
      <div className="font-heading text-[2rem] font-light text-warm-text mb-2 inline-flex items-center gap-3">
        <Calendar size={18} className="text-sunset opacity-70" aria-hidden />
        {event.title}
      </div>
      <div className="text-[0.82rem] text-warm-text/45 mb-7 inline-flex flex-wrap gap-x-3 gap-y-1">
        <span>{parts.weekday}</span>
        <span>·</span>
        <span>{range}</span>
        {event.location && (
          <>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={11} aria-hidden /> {event.location}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
