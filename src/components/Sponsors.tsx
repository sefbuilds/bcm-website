import { SPONSORS } from "@/lib/constants";
import Reveal from "./Reveal";
import Marquee from "./Marquee";

export default function Sponsors() {
  const hoofdsponsors = SPONSORS.filter((s) => s.tier === "hoofdsponsor");
  const partners = SPONSORS.filter((s) => s.tier === "partner");
  const vrienden = SPONSORS.filter((s) => s.tier === "vriend");
  const allNames = SPONSORS.map((s) => s.name);

  return (
    <section className="bg-ink relative">
      <div className="container-site py-24 md:py-32">
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-terracotta" />
              <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                Partners
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
              Met dank aan{" "}
              <em className="italic font-light text-terracotta">
                onze partners
              </em>
              .
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-pearl-80 leading-relaxed text-lg max-w-xl">
              Zij maken onze bijeenkomsten mogelijk en versterken het
              Nederlandstalige ondernemersnetwerk op Mallorca.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-14">
          <Reveal delay={0.2}>
            <TierHeader label="Hoofdsponsors" />
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {hoofdsponsors.map((s) => (
                <div
                  key={s.name}
                  className="group glass rounded-2xl px-8 py-14 md:px-10 md:py-16 flex items-center justify-center text-center transition-all hover:bg-pearl/[0.07] relative overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-linear-to-br from-terracotta/0 to-gold/0 transition-all duration-500 group-hover:from-terracotta/8 group-hover:to-gold/5"
                    aria-hidden="true"
                  />
                  <span className="relative font-heading text-2xl md:text-3xl font-semibold text-pearl tracking-[-0.02em]">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <TierHeader label="Partners" />
            <div className="mt-6 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {partners.map((s) => (
                <div
                  key={s.name}
                  className="glass rounded-xl px-4 py-7 text-center transition-all hover:bg-pearl/[0.07]"
                >
                  <span className="font-heading text-sm font-medium text-pearl-80">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.36}>
            <TierHeader label="Vrienden van de club" />
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {vrienden.map((s) => (
                <li key={s.name} className="text-pearl-80 font-medium">
                  {s.name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-20 hairline-t pt-10">
          <Marquee
            items={allNames}
            speed="slow"
            itemClassName="font-heading text-pearl/30 text-sm tracking-[0.24em] uppercase"
            separator={
              <span
                className="mx-10 text-terracotta/40"
                aria-hidden="true"
              >
                ◆
              </span>
            }
            className="mask-fade-x"
          />
        </div>
      </div>
    </section>
  );
}

function TierHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[10px] font-medium tracking-[0.24em] uppercase text-pearl-60">
        {label}
      </span>
      <span className="flex-1 h-px bg-hairline" />
    </div>
  );
}
