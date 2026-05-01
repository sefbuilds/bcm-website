import Link from "next/link";
import Image from "next/image";
import { getMemberStats } from "@/lib/data";
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
      <em className="italic font-light text-sunset-light">
        {title.slice(idx, idx + italicWord.length)}
      </em>
      {title.slice(idx + italicWord.length)}
    </>
  );
}

export default async function Hero({
  title,
  subtitle,
  ctaText = "Word lid van de club",
  ctaHref = "/intake?tier=member",
  compact = false,
  italicWord,
  showBento = false,
}: Props) {
  const memberStats = showBento
    ? await getMemberStats()
    : { total: 0, locations: [] };

  if (compact) {
    return (
      <section
        className="relative bg-ocean-deep min-h-[55vh] flex items-end pt-24 md:pt-28 pb-16 md:pb-20"
        aria-label="Hero"
      >
        <div className="relative z-10 container-site">
          <p className="flex items-center gap-4 text-[0.62rem] tracking-[0.32em] uppercase text-sunset-light font-medium mb-6">
            <span className="block w-8 h-px bg-sunset" />
            NBCM · Mallorca
          </p>
          <h1 className="font-heading text-warm-text font-light leading-[1.02] text-5xl md:text-6xl">
            {renderTitle(title, italicWord)}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-xl text-warm-text/65 text-base md:text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative bg-ocean-deep grid md:grid-cols-2 min-h-screen pt-[72px]"
      aria-label="Hero"
    >
      {/* Left: text */}
      <div className="flex flex-col justify-center px-6 md:px-[5vw] py-20 md:py-24 relative z-10">
        <p className="flex items-center gap-4 text-[0.62rem] tracking-[0.32em] uppercase text-sunset-light font-medium mb-7">
          <span className="block w-8 h-px bg-sunset" />
          Mallorca · Est. 2019
        </p>

        <h1 className="font-heading font-light text-warm-text leading-[1.02] mb-6 text-[clamp(2.8rem,5vw,5.5rem)]">
          {renderTitle(title, italicWord)}
        </h1>

        {subtitle && (
          <p className="max-w-md text-warm-text/65 text-base md:text-[1rem] leading-[1.82] mb-10">
            {subtitle}
          </p>
        )}

        {ctaText && ctaHref && (
          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href={ctaHref}
              className="inline-flex items-center px-8 py-3.5 bg-sunset text-white font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase transition-colors hover:bg-sunset-light"
            >
              {ctaText}
            </Link>
            <Link
              href="/over-ons"
              className="inline-flex items-center px-8 py-3.5 bg-transparent text-warm-text font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase border border-warm-text/30 transition-colors hover:border-warm-text"
            >
              Lees meer over ons
            </Link>
          </div>
        )}

        {showBento && (
          <div className="flex border-t border-warm-text/12 pt-8 gap-8">
            <HeroStat value="2019" label="Opgericht" hasBorder />
            <HeroStat
              value={memberStats.total > 0 ? `${memberStats.total}` : "Groeiend"}
              label="Ondernemers"
              hasBorder
            />
            <HeroStat value="NL · BE · ZA" label="Community" />
          </div>
        )}
      </div>

      {/* Right: image */}
      <div className="relative overflow-hidden min-h-[60vh] md:min-h-screen">
        <Image
          src={STOCK_IMAGES.coastSunset}
          alt="Mallorca — kust bij zonsondergang"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-ocean-deep/40 to-transparent md:to-transparent md:from-ocean-deep/40"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

function HeroStat({
  value,
  label,
  hasBorder = false,
}: {
  value: string;
  label: string;
  hasBorder?: boolean;
}) {
  return (
    <div
      className={`pr-6 md:pr-12 ${hasBorder ? "md:mr-12 md:border-r md:border-warm-text/10" : ""}`}
    >
      <span className="block font-heading text-3xl md:text-[2.2rem] font-light text-warm-text leading-none">
        {value}
      </span>
      <span className="block mt-2 text-[0.62rem] font-medium tracking-[0.15em] uppercase text-warm-text/40">
        {label}
      </span>
    </div>
  );
}
