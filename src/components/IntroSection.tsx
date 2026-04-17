import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  heading: string;
  body: string | string[];
  imageLabel?: string;
  highlight?: string;
  italicWord?: string;
};

function renderHeading(heading: string, italicWord?: string) {
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
}

export default function IntroSection({
  eyebrow,
  heading,
  body,
  imageLabel = "Mallorca",
  highlight,
  italicWord,
}: Props) {
  const paragraphs = Array.isArray(body) ? body : [body];

  return (
    <section className="bg-ink relative">
      <div className="container-site py-24 md:py-32">
        <div className="grid gap-14 md:gap-20 md:grid-cols-12 items-start">
          <div className="md:col-span-7">
            <Reveal>
              {eyebrow && (
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-terracotta" />
                  <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                    {eyebrow}
                  </span>
                </div>
              )}
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
                {renderHeading(heading, italicWord)}
              </h2>
            </Reveal>

            {highlight && (
              <Reveal delay={0.15}>
                <p className="mt-10 font-heading italic text-xl md:text-2xl text-pearl leading-relaxed max-w-xl">
                  {highlight}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.22}>
              <div className="mt-8 space-y-5 text-pearl-80 leading-relaxed text-lg max-w-xl">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={0.18} direction="left">
              <div className="relative rounded-2xl overflow-hidden glass aspect-[4/5] flex items-center justify-center">
                <div className="noise" />
                <div className="absolute inset-0 bg-linear-to-br from-terracotta/15 via-transparent to-gold/10 pointer-events-none" />
                <div className="relative text-center px-6">
                  <div className="font-heading text-6xl md:text-7xl font-semibold text-pearl/20 tracking-[-0.04em]">
                    2019
                  </div>
                  <div className="mt-2 text-[11px] tracking-[0.24em] uppercase text-pearl-60">
                    {imageLabel}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
