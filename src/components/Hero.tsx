import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Users } from "lucide-react";
import AuroraBg from "./AuroraBg";
import LiveTime from "./LiveTime";
import Reveal from "./Reveal";
import Marquee from "./Marquee";
import { NEXT_EVENT, MEMBERS_TOTAL } from "@/lib/constants";

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

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  compact = false,
  italicWord,
  showBento = false,
}: Props) {
  return (
    <section
      className={`relative overflow-hidden ${
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

      <div className="relative z-10 hairline-b">
        <div className="container-site flex items-center justify-between py-4 text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-pearl-60 font-medium">
          <span className="inline-flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta animate-pulse" />
            Live · Palma ·{" "}
            <LiveTime className="text-pearl" showSeconds />
          </span>
          <span className="hidden sm:inline">
            NBCM · Est. 2019 · Mallorca
          </span>
        </div>
      </div>

      <div
        className={`relative z-10 container-site ${
          compact ? "py-20 md:py-24" : "pt-20 pb-14 md:pt-28 md:pb-20"
        }`}
      >
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-terracotta" />
            <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
              {compact ? "NBCM" : "Business Club · Mallorca"}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1
            className={`mt-10 font-heading font-semibold text-pearl tracking-[-0.035em] leading-[0.92] text-balance ${
              compact
                ? "text-5xl md:text-6xl lg:text-7xl"
                : "text-[2.8rem] sm:text-6xl md:text-7xl lg:text-[7.5rem] xl:text-[9rem]"
            }`}
          >
            {renderTitle(title, italicWord)}
          </h1>
        </Reveal>

        {subtitle && (
          <Reveal delay={0.18}>
            <p
              className={`mt-8 max-w-2xl text-pearl-80 leading-relaxed ${
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
                className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-4 text-white font-medium transition-all hover:bg-terracotta-light hover:scale-[1.02]"
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
                  className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-pearl font-medium transition-all hover:bg-pearl/10"
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
              <BentoNextEvent className="md:col-span-6" />
              <BentoMembers className="md:col-span-3" />
              <BentoLocation className="md:col-span-3" />
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

function BentoNextEvent({ className }: { className?: string }) {
  return (
    <Link
      href="/events"
      className={`group glass rounded-2xl p-7 md:p-8 flex flex-col justify-between min-h-[200px] transition-all hover:bg-pearl/[0.07] ${className}`}
    >
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

      <div className="mt-6 flex items-baseline gap-4">
        <span className="font-heading font-semibold text-pearl text-6xl md:text-7xl leading-none tracking-[-0.04em]">
          {NEXT_EVENT.day}
        </span>
        <div>
          <div className="text-xs tracking-widest uppercase text-pearl">
            {NEXT_EVENT.month} {NEXT_EVENT.year}
          </div>
          <div className="text-[11px] text-pearl-60 mt-0.5">
            {NEXT_EVENT.time}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-heading text-lg md:text-xl font-semibold text-pearl leading-tight">
          {NEXT_EVENT.title}
        </h3>
        <p className="mt-1 inline-flex items-center gap-1 text-xs text-pearl-60">
          <MapPin size={11} aria-hidden="true" />
          {NEXT_EVENT.location}
        </p>
      </div>
    </Link>
  );
}

function BentoMembers({ className }: { className?: string }) {
  return (
    <Link
      href="/lid-worden"
      className={`group glass rounded-2xl p-7 md:p-8 flex flex-col justify-between min-h-[200px] transition-all hover:bg-pearl/[0.07] ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-terracotta">
          <Users size={12} aria-hidden="true" />
          Actieve leden
        </div>
        <ArrowUpRight
          size={16}
          className="text-pearl-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pearl"
          aria-hidden="true"
        />
      </div>

      <div className="mt-6">
        <div className="font-heading font-semibold text-pearl text-6xl md:text-7xl leading-none tracking-[-0.04em]">
          {MEMBERS_TOTAL}
        </div>
        <div className="mt-3 text-[11px] tracking-widest uppercase text-pearl-60">
          Ondernemers · Vlamingen · Zuid-Afrikanen
        </div>
      </div>
    </Link>
  );
}

function BentoLocation({ className }: { className?: string }) {
  return (
    <div
      className={`glass rounded-2xl p-7 md:p-8 flex flex-col justify-between min-h-[200px] ${className}`}
    >
      <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-terracotta">
        <MapPin size={12} aria-hidden="true" />
        Basis
      </div>

      <div className="mt-6">
        <div className="font-heading font-semibold text-pearl text-2xl md:text-3xl leading-tight tracking-[-0.02em]">
          Palma de Mallorca
        </div>
        <div className="mt-3 flex items-center gap-2 text-[11px] tracking-widest uppercase text-pearl-60">
          <span>39.57° N</span>
          <span className="h-1 w-1 rounded-full bg-pearl-60" />
          <span>2.65° E</span>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-pearl-60">
        <span className="h-1.5 w-1.5 rounded-full bg-olive" />
        Balearen · Spanje
      </div>
    </div>
  );
}
