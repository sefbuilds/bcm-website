import Reveal from "./Reveal";

type Quote = {
  body: string;
  author: string;
  role: string;
  initials: string;
};

const DEFAULT_QUOTE: Quote = {
  body: "Binnen drie maanden had ik via NBCM mijn boekhouder, mijn advocaat én mijn eerste Spaanse klant. Geen harde pitches, maar warme introducties — precies zoals ondernemen zou moeten voelen.",
  author: "Sophie van den Berg",
  role: "Interieurontwerper · Santa Ponsa",
  initials: "SB",
};

type Props = {
  quote?: Quote;
};

export default function Testimonial({ quote = DEFAULT_QUOTE }: Props) {
  return (
    <section className="relative bg-ink-2 overflow-hidden hairline-t hairline-b">
      <div
        className="absolute top-1/2 -left-1/4 -translate-y-1/2 h-[80%] w-[60%] rounded-full bg-gold/10 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="noise" />
      <div className="relative container-site py-28 md:py-40">
        <div className="max-w-6xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-gold" />
              <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-gold">
                Wat leden zeggen
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <blockquote className="mt-14 font-heading text-4xl md:text-6xl lg:text-7xl text-pearl font-semibold tracking-[-0.03em] leading-[1.1] text-balance">
              <span className="text-gold/60 italic font-light mr-1">
                &ldquo;
              </span>
              {quote.body}
              <span className="text-gold/60 italic font-light ml-1">
                &rdquo;
              </span>
            </blockquote>
          </Reveal>

          <Reveal delay={0.2}>
            <figcaption className="mt-16 flex items-center gap-4 hairline-t pt-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full glass text-pearl font-heading text-sm font-semibold">
                {quote.initials}
              </span>
              <div>
                <div className="font-medium text-pearl">
                  {quote.author}
                </div>
                <div className="text-sm text-pearl-60">{quote.role}</div>
              </div>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
