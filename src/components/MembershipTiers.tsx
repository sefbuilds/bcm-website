import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "./Reveal";
import { MEMBERSHIP_TIERS, type MembershipTier } from "@/lib/constants";

type Props = {
  background?: "ink" | "ink-2";
  eyebrow?: string;
  heading?: string;
  italicWord?: string;
};

const ACCENT_STYLES = {
  terracotta: {
    eyebrow: "text-terracotta",
    divider: "bg-terracotta",
    iconWrap: "bg-terracotta/10 text-terracotta",
    cta: "bg-terracotta hover:bg-terracotta-light text-white",
  },
  gold: {
    eyebrow: "text-gold",
    divider: "bg-gold",
    iconWrap: "bg-gold/15 text-gold",
    cta: "bg-gold hover:bg-gold-light text-ink",
  },
  navy: {
    eyebrow: "text-navy-light",
    divider: "bg-navy-2",
    iconWrap: "bg-navy/40 text-white border border-navy-light/30",
    cta: "bg-navy hover:bg-navy-2 text-white border border-navy-light/30",
  },
} as const;

export default function MembershipTiers({
  background = "ink",
  eyebrow = "Lidmaatschap",
  heading = "Word onderdeel van NBCM.",
  italicWord = "onderdeel",
}: Props) {
  const bgClass = background === "ink-2" ? "bg-ink-2" : "bg-ink";

  const renderHeading = () => {
    if (!italicWord) return heading;
    const idx = heading.toLowerCase().indexOf(italicWord.toLowerCase());
    if (idx === -1) return heading;
    return (
      <>
        {heading.slice(0, idx)}
        <em className="italic font-light text-terracotta">
          {heading.slice(idx, idx + italicWord.length)}
        </em>
        {heading.slice(idx + italicWord.length)}
      </>
    );
  };

  return (
    <section className={`${bgClass} hairline-t hairline-b`}>
      <div className="container-site py-24 md:py-32">
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-terracotta" />
              <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                {eyebrow}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
              {renderHeading()}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-pearl-80 leading-relaxed text-lg max-w-2xl">
              Drie manieren om bij te dragen aan en te profiteren van onze
              Nederlandstalige ondernemersgemeenschap op Mallorca.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-3 md:items-stretch">
          {MEMBERSHIP_TIERS.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.08}>
              <TierCard tier={tier} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: MembershipTier }) {
  const styles = ACCENT_STYLES[tier.accent];

  return (
    <article className="group relative h-full glass rounded-2xl p-8 md:p-10 flex flex-col transition-all hover:bg-pearl/[0.07] overflow-hidden">
      <div
        className={`absolute inset-x-0 top-0 h-px ${styles.divider}`}
        aria-hidden="true"
      />
      <div
        className={`absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          tier.accent === "terracotta"
            ? "bg-terracotta/25"
            : tier.accent === "gold"
              ? "bg-gold/25"
              : "bg-navy-2/40"
        }`}
        aria-hidden="true"
      />

      <div className="relative">
        <span
          className={`text-[10px] font-medium tracking-[0.24em] uppercase ${styles.eyebrow}`}
        >
          {tier.eyebrow}
        </span>
        <h3 className="mt-4 font-heading text-2xl md:text-3xl font-semibold text-pearl tracking-[-0.02em] leading-tight">
          {tier.title}
        </h3>
        <p className="mt-4 text-pearl-80 leading-relaxed">
          {tier.description}
        </p>
      </div>

      <ul className="relative mt-8 pt-6 hairline-t space-y-3 flex-1">
        {tier.benefits.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm text-pearl">
            <span
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${styles.iconWrap}`}
            >
              <Check size={12} aria-hidden="true" />
            </span>
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-8">
        <Link
          href={tier.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/cta inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all hover:scale-[1.02] ${styles.cta}`}
        >
          {tier.ctaText}
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
