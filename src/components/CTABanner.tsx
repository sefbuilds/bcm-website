import Link from "next/link";
import Reveal from "./Reveal";

type Props = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  italicWord?: string;
};

function renderTitle(title: string, italicWord?: string) {
  if (!italicWord) return title;
  const idx = title.toLowerCase().indexOf(italicWord.toLowerCase());
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <em className="italic text-sunset-light">
        {title.slice(idx, idx + italicWord.length)}
      </em>
      {title.slice(idx + italicWord.length)}
    </>
  );
}

export default function CTABanner({
  title = "Word onderdeel van het netwerk.",
  subtitle = "Sluit je aan bij een groeiend netwerk van Nederlandstalige ondernemers op Mallorca. Ontmoet ons op de volgende bijeenkomst.",
  buttonText = "Lid worden",
  buttonHref = "/intake?tier=member",
  italicWord = "onderdeel",
}: Props) {
  return (
    <section className="relative bg-ocean-mid py-24 md:py-28 px-6 md:px-[5vw] text-center overflow-hidden">
      {/* NBCM watermark */}
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-light text-[12rem] md:text-[18rem] text-sunset/[0.05] tracking-[0.2em] pointer-events-none select-none whitespace-nowrap leading-none"
      >
        NBCM
      </span>

      <div className="relative">
        <Reveal>
          <h2 className="font-heading font-light leading-[1.08] text-[clamp(2.2rem,5vw,4.5rem)] text-warm-text mb-6 max-w-[820px] mx-auto">
            {renderTitle(title, italicWord)}
          </h2>
        </Reveal>

        {subtitle && (
          <Reveal delay={0.08}>
            <p className="text-[1rem] text-warm-text/60 max-w-[480px] mx-auto leading-[1.85] mb-10">
              {subtitle}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.16}>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={buttonHref}
              className="inline-flex items-center px-8 py-3.5 bg-sunset text-white text-[0.78rem] font-medium tracking-[0.08em] uppercase font-body transition-colors hover:bg-sunset-light"
            >
              {buttonText}
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center px-8 py-3.5 bg-transparent text-warm-text border border-warm-text/25 text-[0.78rem] font-medium tracking-[0.08em] uppercase font-body transition-colors hover:border-warm-text"
            >
              Bekijk events
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
