import Reveal from "./Reveal";

const PILLARS = [
  {
    num: "01",
    keyword: "Kunnen",
    line: "Warme introducties.",
    body: "Deuren die openen omdat iemand voor je instaat. Introducties die écht werken binnen een vertrouwd netwerk van Nederlandstalige ondernemers.",
  },
  {
    num: "02",
    keyword: "Weten",
    line: "Kennis delen.",
    body: "Ondernemen op Mallorca is anders. Fiscaal, juridisch, cultureel. In dit netwerk sta je er niet alleen voor en leer je van mensen die het al doen.",
  },
  {
    num: "03",
    keyword: "Verdienen",
    line: "Samen groeien.",
    body: "Samenwerkingen die ontstaan uit vertrouwen. Zakelijke groei op basis van échte connecties op het eiland.",
  },
];

export default function Motto() {
  return (
    <section className="bg-ocean-deep py-20 md:py-24 px-6 md:px-[5vw]" id="waarom">
      <div className="max-w-[520px] mb-12 md:mb-14">
        <Reveal>
          <span className="text-[0.62rem] tracking-[0.32em] uppercase text-sunset font-medium mb-4 block">
            Waarom NBCM
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-heading font-light leading-[1.08] text-[clamp(2rem,4vw,3.5rem)] text-warm-text">
            Drie redenen om{" "}
            <em className="italic text-sunset-light">lid te worden.</em>
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
        {PILLARS.map((p, i) => (
          <Reveal key={p.num} delay={i * 0.08}>
            <article
              className={`p-10 md:p-9 h-full border-t-2 border-sunset ${
                i % 2 === 0 ? "bg-ocean" : "bg-ocean-mid"
              }`}
            >
              <div className="font-heading italic font-light text-[2.5rem] text-sunset opacity-60 leading-none mb-5">
                {p.num}
              </div>
              <div className="font-heading font-light text-[1.5rem] text-warm-text mb-3">
                <em className="italic text-sunset-light">{p.keyword}.</em>{" "}
                {p.line}
              </div>
              <p className="text-[0.85rem] text-warm-text/65 leading-[1.75]">
                {p.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
