import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Users } from "lucide-react";
import AuroraBg from "./AuroraBg";
import Reveal from "./Reveal";
import Marquee from "./Marquee";
import { NEXT_EVENT, MEMBERS_TOTAL, RECENT_EVENT, STOCK_IMAGES } from "@/lib/constants";

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
              <BentoNextEvent className="md:col-span-5" />
              <BentoAtmosphere className="md:col-span-4" />
              <div className="md:col-span-3 grid gap-3">
                <BentoMembers />
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

function BentoAtmosphere({ className }: { className?: string }) {
  return (
    <Link
      href="/events"
      className={`group relative rounded-2xl overflow-hidden min-h-[200px] ${className}`}
    >
      <Image
        src={RECENT_EVENT.photos?.[0] ?? STOCK_IMAGES.mallorcaCoast}
        alt={`Sfeerbeeld ${RECENT_EVENT.title}`}
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
            Laatste event
          </div>
          <ArrowUpRight
            size={16}
            className="text-pearl transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
        <div>
          <div className="font-heading font-semibold text-pearl text-xl md:text-2xl leading-tight tracking-[-0.02em]">
            {RECENT_EVENT.title}
          </div>
          <div className="mt-2 text-[11px] tracking-[0.24em] uppercase text-pearl/80">
            {RECENT_EVENT.day} {RECENT_EVENT.month} {RECENT_EVENT.year} ·{" "}
            {RECENT_EVENT.location}
          </div>
        </div>
      </div>
    </Link>
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
          {MEMBERS_TOTAL}
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
