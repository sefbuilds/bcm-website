import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import AuroraBg from "./AuroraBg";
import Reveal from "./Reveal";
import Marquee from "./Marquee";
import {
  getNextEvent,
  getFeaturedRecentEvent,
  getMemberStats,
  formatEventDay,
  type DBEvent,
} from "@/lib/data";
import { STOCK_IMAGES } from "@/lib/constants";

type Props = {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  compact?: boolean;
  italicWord?: string;
  showBento?: boolean;
};

function renderTitle(title: string, italicWord?: string) {
  if (!italicWord) return title;
  const idx = title.toLowerCase().indexOf(italicWord.toLowerCase());
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <em className="italic font-light text-terracotta">
        {title.slice(idx, idx + italicWord.length)}
      </em>
      {title.slice(idx + italicWord.length)}
    </>
  );
}

export default async function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  compact = false,
  italicWord,
  showBento = false,
}: Props) {
  const [nextEvent, recentEvent, memberStats] = showBento
    ? await Promise.all([
        getNextEvent(),
        getFeaturedRecentEvent(),
        getMemberStats(),
      ])
    : [null, null, { total: 0, locations: [] }];

  return (
    <section
      className={`relative overflow-hidden pt-20 md:pt-24 ${
        compact ? "min-h-[55vh]" : "min-h-[100vh]"
      }`}
      aria-label="Hero"
    >
      <AuroraBg variant={compact ? "subtle" : "hero"} />
      <div className="noise" />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ink to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div
        className={`relative z-10 container-site ${
          compact ? "py-16 md:py-20" : "pt-8 pb-14 md:pt-12 md:pb-20"
        }`}
      >
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-terracotta" />
            <span className="text-xs font-medium tracking-widest uppercase text-terracotta">
              {compact ? "NBCM" : "Business Club · Mallorca"}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1
            className={`mt-8 font-heading font-semibold text-pearl tracking-[-0.03em] leading-[0.98] text-balance ${
              compact
                ? "text-5xl md:text-6xl lg:text-7xl"
                : "text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem]"
            }`}
          >
            {renderTitle(title, italicWord)}
          </h1>
        </Reveal>

        {subtitle && (
          <Reveal delay={0.18}>
            <p
              className={`mt-10 max-w-2xl text-pearl-80 leading-relaxed ${
                compact ? "text-base md:text-lg" : "text-lg md:text-xl"
              }`}
            >
              {subtitle}
            </p>
          </Reveal>
        )}

        {ctaText && ctaHref && (
          <Reveal delay={0.26}>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link
                href={ctaHref}
                className="group inline-flex items-center gap-2 rounded-full bg-deep-blue px-8 py-4 text-white font-medium transition-colors hover:bg-deep-blue/90"
              >
                {ctaText}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              {!compact && (
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-full border border-deep-blue/20 px-8 py-4 text-deep-blue font-medium transition-colors hover:border-deep-blue"
                >
                  Volgende event
                </Link>
              )}
            </div>
          </Reveal>
        )}

        {showBento && !compact && (
          <Reveal delay={0.35}>
            <div className="mt-16 md:mt-24 grid gap-3 md:grid-cols-12">
              <BentoNextEvent
                className="md:col-span-5"
                event={nextEvent}
              />
              <BentoAtmosphere
                className="md:col-span-4"
                event={recentEvent}
              />
              <div className="md:col-span-3 grid gap-3">
                <BentoMembers total={memberStats.total} />
                <BentoLocation />
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {!compact && (
        <div className="absolute inset-x-0 bottom-0 z-10 hairline-t">
          <div className="py-4">
            <Marquee
              items={[
                "Samen kunnen we meer",
                "Samen weten we meer",
                "Samen verdienen we meer",
                "Ondernemen op Mallorca",
                "Netwerken in het Nederlands",
              ]}
              speed="slow"
              separator={
                <span
                  className="mx-10 text-terracotta/60"
                  aria-hidden="true"
                >
                  ◆
                </span>
              }
              itemClassName="font-heading italic text-pearl/70 text-sm tracking-wide"
              className="mask-fade-x"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function BentoAtmosphere({
  className,
  event,
}: {
  className?: string;
  event: DBEvent | null;
}) {
  const imageSrc =
    event?.photos?.[0] || event?.hero_image || STOCK_IMAGES.mallorcaCoast;
  const startParts = event ? formatEventDay(event.start_at) : null;

  return (
    <Link
      href={event ? `/events` : "/events"}
      className={`group relative rounded-2xl overflow-hidden min-h-[200px] ${className}`}
    >
      <Image
        src={imageSrc}
        alt={event ? `Sfeerbeeld ${event.title}` : "Mallorca"}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/40 to-ink/20" />
      <div className="relative p-7 md:p-8 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-gold">
            <Calendar size={12} aria-hidden="true" />
            {event ? "Laatste event" : "Mallorca"}
          </div>
          <ArrowUpRight
            size={16}
            className="text-pearl transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
        <div>
          <div className="font-heading font-semibold text-pearl text-xl md:text-2xl leading-tight tracking-[-0.02em]">
            {event?.title ?? "Het hele jaar door events"}
          </div>
          <div className="mt-2 text-[11px] tracking-[0.24em] uppercase text-pearl/80">
            {event && startParts
              ? `${startParts.day} ${startParts.month} ${startParts.year} · ${event.location ?? "Mallorca"}`
              : "Borrels · Diners · Masterclasses"}
          </div>
        </div>
      </div>
    </Link>
  );
}

function BentoNextEvent({
  className,
  event,
}: {
  className?: string;
  event: DBEvent | null;
}) {
  const parts = event ? formatEventDay(event.start_at) : null;
  const hasHero = Boolean(event?.hero_image);

  return (
    <Link
      href={event ? `/events/aanmelden?event=${event.slug}` : "/events"}
      className={`group relative rounded-2xl overflow-hidden flex flex-col justify-between min-h-[200px] transition-all ${
        hasHero ? "" : "glass hover:bg-pearl/[0.07]"
      } ${className}`}
    >
      {hasHero && event?.hero_image && (
        <>
          <Image
            src={event.hero_image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-navy/95 via-navy/75 to-navy/45"
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative p-7 md:p-8 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-terracotta">
            <Calendar size={12} aria-hidden="true" />
            Volgende bijeenkomst
          </div>
          <ArrowUpRight
            size={16}
            className="text-pearl-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pearl"
            aria-hidden="true"
          />
        </div>

        {event && parts ? (
          <>
            <div className="mt-6 flex items-baseline gap-4">
              <span className="font-heading font-semibold text-pearl text-6xl md:text-7xl leading-none tracking-[-0.04em]">
                {parts.day}
              </span>
              <div>
                <div className="text-xs tracking-widest uppercase text-pearl">
                  {parts.month} {parts.year}
                </div>
                <div className="text-[11px] text-pearl-60 mt-0.5">
                  {parts.time}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-heading text-lg md:text-xl font-semibold text-pearl leading-tight">
                {event.title}
              </h3>
              {event.location && (
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-pearl-60">
                  <MapPin size={11} aria-hidden="true" />
                  {event.location}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="mt-6">
            <div className="font-heading font-semibold text-pearl text-2xl md:text-3xl leading-tight tracking-[-0.02em]">
              Volgt binnenkort
            </div>
            <div className="mt-3 text-[11px] tracking-widest uppercase text-pearl-60">
              Nieuwe datum wordt gepland
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

function BentoMembers({ className, total }: { className?: string; total: number }) {
  return (
    <Link
      href="/leden"
      className={`group glass rounded-2xl p-5 md:p-6 flex flex-col justify-between min-h-[94px] transition-all hover:bg-pearl/[0.07] ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-terracotta">
          <Users size={12} aria-hidden="true" />
          Leden
        </div>
        <ArrowUpRight
          size={14}
          className="text-pearl-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pearl"
          aria-hidden="true"
        />
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <div className="font-heading font-semibold text-pearl text-4xl md:text-5xl leading-none tracking-[-0.04em]">
          {total}
        </div>
        <div className="text-[10px] tracking-widest uppercase text-pearl-60">
          Ondernemers
        </div>
      </div>
    </Link>
  );
}

function BentoLocation({ className }: { className?: string }) {
  return (
    <div
      className={`glass rounded-2xl p-5 md:p-6 flex flex-col justify-between min-h-[94px] ${className}`}
    >
      <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-terracotta">
        <MapPin size={12} aria-hidden="true" />
        Basis
      </div>

      <div className="mt-3">
        <div className="font-heading font-semibold text-pearl text-xl md:text-2xl leading-tight tracking-[-0.02em]">
          Palma de Mallorca
        </div>
        <div className="mt-2 flex items-center gap-2 text-[10px] tracking-widest uppercase text-pearl-60">
          <span>39.57° N</span>
          <span className="h-1 w-1 rounded-full bg-pearl-60" />
          <span>2.65° E</span>
        </div>
      </div>
    </div>
  );
}
