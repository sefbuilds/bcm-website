import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Clock, Calendar } from "lucide-react";
import { getNextEvent, formatEventDay, formatEventTimeRange } from "@/lib/data";
import Reveal from "./Reveal";

export default async function NextEvent() {
  const event = await getNextEvent();
  if (!event) {
    return (
      <section className="bg-ink">
        <div className="container-site py-24 md:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-terracotta" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                  Agenda
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
                Volgende bijeenkomst volgt binnenkort.
              </h2>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  const { day, month, year, weekday } = formatEventDay(event.start_at);
  const timeRange = formatEventTimeRange(event.start_at, event.end_at);
  const hasHero = Boolean(event.hero_image);

  return (
    <section className="bg-ink relative">
      <div className="container-site py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-terracotta" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                  Agenda
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
                Volgende{" "}
                <em className="italic font-light text-terracotta">
                  bijeenkomst
                </em>
                .
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link
              href="/events"
              className="group inline-flex items-center gap-1.5 text-terracotta hover:text-terracotta-light font-medium"
            >
              Alle events
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <article className="relative rounded-3xl overflow-hidden min-h-[520px] md:min-h-[560px]">
            {hasHero ? (
              <>
                <Image
                  src={event.hero_image!}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
                <div
                  className="absolute inset-0 bg-linear-to-r from-ink/95 via-ink/75 to-ink/20"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="noise" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 glass-strong" aria-hidden="true" />
                <div
                  className="absolute -top-1/2 -right-1/4 h-[120%] w-[60%] rounded-full bg-terracotta/15 blur-[120px] pointer-events-none"
                  aria-hidden="true"
                />
                <div className="noise" />
              </>
            )}

            <div className="relative grid md:grid-cols-[auto_1fr]">
              <div
                className={`p-10 md:p-14 md:w-96 flex flex-col justify-between gap-10 ${
                  hasHero
                    ? ""
                    : "hairline-b md:hairline-b-0 md:border-r md:border-r-hairline"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-terracotta">
                    <Calendar size={12} aria-hidden="true" />
                    {weekday}
                  </div>
                  <div className="mt-8 font-heading font-semibold text-pearl text-8xl md:text-9xl leading-[0.85] tracking-[-0.05em]">
                    {day}
                  </div>
                  <div className="mt-4 text-sm tracking-[0.2em] uppercase text-pearl-80">
                    {month} {year}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-pearl-60">
                  <Clock size={14} aria-hidden="true" />
                  {timeRange}
                </div>
              </div>

              <div className="p-10 md:p-14 flex flex-col justify-between">
                <div>
                  {event.tag && (
                    <span className="inline-block text-[10px] font-medium tracking-[0.24em] uppercase text-olive mb-5">
                      {event.tag}
                    </span>
                  )}
                  <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
                    {event.title}
                  </h3>
                  {event.location && (
                    <p className="mt-5 inline-flex items-center gap-1.5 text-pearl-60">
                      <MapPin size={15} aria-hidden="true" />
                      {event.location}
                    </p>
                  )}
                  {event.description && (
                    <p
                      className={`mt-6 leading-relaxed text-lg max-w-xl ${
                        hasHero ? "text-pearl/90" : "text-pearl-80"
                      }`}
                    >
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="mt-10">
                  <Link
                    href={`/events/aanmelden?event=${event.slug}`}
                    className="group/cta inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-4 text-white font-medium transition-all hover:bg-terracotta-light hover:scale-[1.02]"
                  >
                    Meld je aan
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
