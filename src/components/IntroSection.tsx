import Image from "next/image";
import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  heading: string;
  body: string | string[];
  imageLabel?: string;
  imageUrl?: string;
  highlight?: string;
  italicWord?: string;
  yearBadge?: string;
  yearLabel?: string;
};

function renderHeading(heading: string, italicWord?: string) {
  if (!italicWord) return heading;
  const idx = heading.toLowerCase().indexOf(italicWord.toLowerCase());
  if (idx === -1) return heading;
  return (
    <>
      {heading.slice(0, idx)}
      <em className="italic font-light text-sunset">
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
  imageUrl,
  highlight,
  italicWord,
  yearBadge = "2019",
  yearLabel = "Opgericht",
}: Props) {
  const paragraphs = Array.isArray(body) ? body : [body];

  return (
    <section className="bg-cream" id="over">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[560px] w-full">
        {/* Image side */}
        <div className="relative overflow-hidden min-h-[420px] md:min-h-[560px]">
          <Reveal direction="left">
            <div className="absolute inset-0">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={imageLabel}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-ocean to-ocean-deep" />
              )}
              <div className="absolute inset-0 bg-linear-to-br from-ocean-deep/30 to-transparent" />
            </div>
          </Reveal>
          <div className="absolute bottom-8 left-8 bg-sunset text-text px-6 py-4 font-heading text-[1.8rem] font-light leading-none">
            {yearBadge}
            <span className="block font-body font-medium text-[0.58rem] tracking-[0.16em] uppercase mt-1 opacity-85">
              {yearLabel}
            </span>
          </div>
        </div>

        {/* Text side */}
        <div className="px-6 md:px-14 py-16 md:py-20 bg-cream flex flex-col justify-center">
          {eyebrow && (
            <Reveal>
              <span className="label mb-4 block">{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <h2 className="font-heading font-light leading-[1.08] text-[clamp(1.8rem,3.5vw,3rem)] text-text mb-6">
              {renderHeading(heading, italicWord)}
            </h2>
          </Reveal>
          <span className="block w-11 h-px bg-sunset/60 mb-7" />
          {paragraphs[0] && (
            <Reveal delay={0.18}>
              <p className="text-[0.98rem] leading-[1.85] text-text-muted mb-6 max-w-xl">
                {paragraphs[0]}
              </p>
            </Reveal>
          )}
          {highlight && (
            <Reveal delay={0.22}>
              <blockquote className="font-heading italic font-light text-[1.3rem] leading-[1.55] text-text/85 border-l-2 border-sunset pl-6 my-2 max-w-xl">
                {highlight}
              </blockquote>
            </Reveal>
          )}
          {paragraphs.slice(1).map((p, i) => (
            <Reveal key={i} delay={0.28 + i * 0.05}>
              <p className="text-[0.98rem] leading-[1.85] text-text-muted mt-6 max-w-xl">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
