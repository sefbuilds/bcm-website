import Image from "next/image";
import Reveal from "./Reveal";
import { STOCK_IMAGES } from "@/lib/constants";

const PILLARS = [
  {
    number: "01",
    keyword: "Kunnen",
    line: "Samen kunnen we meer.",
    description:
      "Warme introducties die écht werken. Deuren die openen omdat iemand voor je instaat.",
    image: STOCK_IMAGES.wineCheers,
    alt: "Proosten op samenwerking",
  },
  {
    number: "02",
    keyword: "Weten",
    line: "Samen weten we meer.",
    description:
      "Kennis delen over ondernemen op Mallorca — fiscaal, juridisch, cultureel. Niemand staat er alleen voor.",
    image: STOCK_IMAGES.candlelitDinner,
    alt: "Kennis delen aan tafel",
  },
  {
    number: "03",
    keyword: "Verdienen",
    line: "Samen verdienen we meer.",
    description:
      "Samenwerkingen die ontstaan uit vertrouwen. Zakelijke groei op basis van échte connecties.",
    image: STOCK_IMAGES.yachtHarbor,
    alt: "Zakelijke groei op Mallorca",
  },
];

export default function Motto() {
  return (
    <section className="bg-ink-2 hairline-t hairline-b">
      <div className="container-site pt-24 md:pt-32 pb-16 md:pb-20">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-terracotta" />
            <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
              Ons motto
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <blockquote className="mt-10 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-semibold text-pearl tracking-[-0.03em] leading-[1] text-balance max-w-6xl">
            Samen{" "}
            <em className="italic font-light text-terracotta">kunnen</em>{" "}
            we meer, samen{" "}
            <em className="italic font-light text-terracotta">weten</em>{" "}
            we meer, samen{" "}
            <em className="italic font-light text-terracotta">
              verdienen
            </em>{" "}
            we meer.
          </blockquote>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-3">
        {PILLARS.map((pillar, i) => (
          <Reveal key={pillar.keyword} delay={i * 0.08}>
            <Pillar pillar={pillar} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Pillar({ pillar }: { pillar: (typeof PILLARS)[number] }) {
  return (
    <article className="group relative overflow-hidden min-h-[560px] md:min-h-[640px] flex items-end border-t border-hairline md:border-t-0 md:border-l md:first:border-l-0 md:border-l-hairline">
      <Image
        src={pillar.image}
        alt={pillar.alt}
        fill
        className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/10" />
      <div className="absolute inset-0 bg-linear-to-br from-ink/20 via-transparent to-transparent" />

      <div className="absolute top-8 left-8 right-8 md:top-10 md:left-10 md:right-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold" />
          <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-gold">
            Pijler {pillar.number}
          </span>
        </div>
      </div>

      <div className="relative p-8 md:p-10 lg:p-12 w-full">
        <h3 className="font-heading font-semibold text-pearl tracking-[-0.04em] leading-[0.9] text-6xl md:text-7xl lg:text-[5.5rem]">
          <em className="italic font-light text-terracotta">
            {pillar.keyword}.
          </em>
        </h3>
        <p className="mt-6 text-pearl text-base md:text-lg font-medium tracking-tight">
          {pillar.line}
        </p>
        <p className="mt-3 text-pearl-80 leading-relaxed text-sm md:text-base max-w-sm">
          {pillar.description}
        </p>
      </div>
    </article>
  );
}
