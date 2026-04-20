import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { MEMBERS, MEMBERS_TOTAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Leden",
  description:
    "Het netwerk van Nederlandstalige ondernemers binnen NBCM — ontmoet onze leden op Mallorca.",
};

export default function LedenPage() {
  const locations = Array.from(new Set(MEMBERS.map((m) => m.location)));

  return (
    <>
      <Hero
        title="Leden."
        subtitle="Een netwerk van ondernemers, experts en creatives uit Nederland, Vlaanderen en Zuid-Afrika — verspreid over het eiland."
        compact
      />

      <section className="bg-ink hairline-t hairline-b">
        <div className="container-site py-16 md:py-20">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 md:divide-x divide-hairline/50">
            <StatBlock value={MEMBERS_TOTAL.toString()} label="Actieve leden" />
            <StatBlock value={locations.length.toString()} label="Regio's op Mallorca" />
            <StatBlock value="3" label="Nationaliteiten" />
            <StatBlock value="2019" label="Opgericht" />
          </dl>
        </div>
      </section>

      <section className="bg-ink">
        <div className="container-site py-24 md:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-terracotta" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                  Het netwerk
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
                Een greep uit{" "}
                <em className="italic font-light text-terracotta">
                  onze leden
                </em>
                .
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 text-pearl-80 leading-relaxed text-lg max-w-xl">
                De leden hieronder hebben ingestemd met publieke vermelding.
                Het volledige ledenbestand is zichtbaar binnen de besloten
                community.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {MEMBERS.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.03}>
                <TiltCard intensity={4}>
                  <article className="group relative h-full glass rounded-2xl p-6 md:p-7 transition-all hover:bg-pearl/[0.07] overflow-hidden">
                    <div
                      className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-terracotta/0 blur-2xl transition-all duration-500 group-hover:bg-terracotta/25"
                      aria-hidden="true"
                    />
                    <div className="relative flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full hairline text-pearl font-heading text-sm font-semibold">
                        {member.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-pearl leading-tight truncate">
                          {member.name}
                        </div>
                        <div className="text-xs text-pearl-60 mt-0.5">
                          {member.role}
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 pt-5 hairline-t flex items-center justify-between text-[13px]">
                      <span className="text-pearl-80 truncate">
                        {member.company}
                      </span>
                      <span className="inline-flex items-center gap-1 text-pearl-60 shrink-0 ml-3">
                        <MapPin size={11} aria-hidden="true" />
                        {member.location}
                      </span>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-8 hairline-t">
              <p className="text-sm text-pearl-60">
                En nog {MEMBERS_TOTAL - MEMBERS.length} andere leden binnen
                de besloten community.
              </p>
              <a
                href="/lid-worden"
                className="inline-flex items-center gap-1.5 text-terracotta hover:text-terracotta-light font-medium text-sm"
              >
                Word ook lid →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-2 hairline-t hairline-b">
        <div className="container-site py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-terracotta" />
                  <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                    Verspreiding
                  </span>
                </div>
                <h2 className="mt-8 font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05]">
                  Leden over het hele eiland.
                </h2>
                <p className="mt-8 text-pearl-80 leading-relaxed text-lg max-w-xl">
                  Van Palma tot Sóller, van Port d&apos;Andratx tot Deià — onze
                  leden wonen en werken verspreid over Mallorca. Handig als
                  je een contact in de buurt zoekt.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="grid grid-cols-2 gap-y-4 gap-x-6">
                {locations.map((loc) => (
                  <li
                    key={loc}
                    className="flex items-center gap-2 text-pearl-80"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                    {loc}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner
        title="Sluit je aan bij het netwerk"
        subtitle="Een warme club van Nederlandstalige ondernemers op Mallorca — kom een keer kennismaken."
        italicWord="netwerk"
      />
    </>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <Reveal>
      <div className="md:px-10 first:md:pl-0 last:md:pr-0">
        <dt className="text-[10px] font-medium tracking-[0.24em] uppercase text-pearl-60">
          {label}
        </dt>
        <dd className="mt-5 font-heading font-semibold text-5xl md:text-6xl lg:text-7xl text-pearl tracking-[-0.04em] leading-none">
          {value}
        </dd>
      </div>
    </Reveal>
  );
}
