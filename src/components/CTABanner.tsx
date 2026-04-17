import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import AuroraBg from "./AuroraBg";

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
      <em className="italic font-light text-terracotta">
        {title.slice(idx, idx + italicWord.length)}
      </em>
      {title.slice(idx + italicWord.length)}
    </>
  );
}

export default function CTABanner({
  title = "Word lid van de club",
  subtitle = "Sluit je aan bij een groeiend netwerk van Nederlandstalige ondernemers op Mallorca.",
  buttonText = "Lid worden",
  buttonHref = "/lid-worden",
  italicWord = "lid",
}: Props) {
  return (
    <section className="relative bg-ink-2 overflow-hidden hairline-t">
      <AuroraBg variant="intense" />
      <div className="noise" />

      <div className="relative container-site py-28 md:py-40">
        <div className="max-w-5xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-terracotta" />
              <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                NBCM
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-10 font-heading text-5xl md:text-7xl lg:text-8xl font-semibold text-pearl tracking-[-0.04em] leading-[0.95] text-balance">
              {renderTitle(title, italicWord)}
            </h2>
          </Reveal>

          {subtitle && (
            <Reveal delay={0.16}>
              <p className="mt-10 max-w-xl text-pearl-80 text-lg md:text-xl leading-relaxed">
                {subtitle}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.24}>
            <div className="mt-14">
              <Link
                href={buttonHref}
                className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-10 py-5 text-white font-medium transition-all hover:bg-terracotta-light hover:scale-[1.02]"
              >
                {buttonText}
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
