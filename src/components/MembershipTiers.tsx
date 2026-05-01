import Link from "next/link";
import Reveal from "./Reveal";
import { MEMBERSHIP_TIERS, type MembershipTier } from "@/lib/constants";

type Props = {
  background?: "cream" | "sand";
  eyebrow?: string;
  heading?: string;
  italicWord?: string;
};

export default function MembershipTiers({
  background = "cream",
  eyebrow = "Lidmaatschap",
  heading = "Word onderdeel van NBCM.",
  italicWord = "onderdeel",
}: Props) {
  const bgClass = background === "sand" ? "bg-sand" : "bg-cream";

  const renderHeading = () => {
    if (!italicWord) return heading;
    const idx = heading.toLowerCase().indexOf(italicWord.toLowerCase());
    if (idx === -1) return heading;
    return (
      <>
        {heading.slice(0, idx)}
        <em className="italic text-sunset">
          {heading.slice(idx, idx + italicWord.length)}
        </em>
        {heading.slice(idx + italicWord.length)}
      </>
    );
  };

  return (
    <section
      className={`${bgClass} py-20 md:py-24 px-6 md:px-[5vw]`}
      id="lidmaatschap"
    >
      <div className="text-center max-w-[560px] mx-auto mb-14 md:mb-16">
        <Reveal>
          <span className="label block mb-4">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-heading font-light leading-[1.08] text-[clamp(2rem,4vw,3.5rem)] text-text mb-6">
            {renderHeading()}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-[0.98rem] leading-[1.85] text-text-muted">
            Drie manieren om bij te dragen aan en te profiteren van onze
            Nederlandstalige ondernemersgemeenschap op Mallorca.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] max-w-[1000px] mx-auto">
        {MEMBERSHIP_TIERS.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 0.08}>
            <TierCard tier={tier} featured={i === 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TierCard({
  tier,
  featured,
}: {
  tier: MembershipTier;
  featured?: boolean;
}) {
  const cardBg = featured ? "bg-ocean" : "bg-warm-text";
  const titleColor = featured ? "text-warm-text" : "text-text";
  const descColor = featured
    ? "text-warm-text/60"
    : "text-text-muted";
  const benefitColor = featured ? "text-warm-text/85" : "text-text/85";
  const borderColor = featured ? "border-sunset" : "border-transparent";

  return (
    <article
      className={`${cardBg} p-12 px-10 border-t-2 ${borderColor} transition-colors h-full flex flex-col group ${
        featured ? "" : "hover:bg-cream"
      }`}
    >
      <span className="text-[0.6rem] tracking-[0.28em] uppercase text-sunset font-medium mb-4 block">
        {tier.eyebrow}
      </span>
      <h3 className={`font-heading font-light text-[2rem] mb-2 ${titleColor}`}>
        {tier.title}
      </h3>
      <p className={`text-[0.85rem] leading-[1.7] mb-8 ${descColor}`}>
        {tier.description}
      </p>
      <ul className="list-none mb-10 flex-1">
        {tier.benefits.map((b) => (
          <li
            key={b}
            className={`text-[0.83rem] py-2.5 border-b border-sunset/10 flex items-start gap-3 last:border-b-0 ${benefitColor}`}
          >
            <span className="text-sunset text-[0.5rem] mt-2 shrink-0">●</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        href={tier.ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center px-6 py-3.5 bg-sunset text-white text-[0.78rem] font-medium tracking-[0.08em] uppercase font-body transition-colors hover:bg-sunset-light"
      >
        {tier.ctaText}
      </Link>
    </article>
  );
}
