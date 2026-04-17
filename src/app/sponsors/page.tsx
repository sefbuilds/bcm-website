import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Handshake, Users, Calendar } from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { SPONSORS, SITE_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sponsors & Partners",
  description:
    "De partners en sponsors van de Nederlandstalige Business Club Mallorca — bedrijven die de club mede mogelijk maken.",
};

const PARTNER_BENEFITS = [
  {
    icon: Users,
    title: "Bereik",
    description:
      "Direct contact met Nederlandstalige ondernemers en beslissers op Mallorca.",
  },
  {
    icon: Handshake,
    title: "Zichtbaarheid",
    description:
      "Vermelding op onze website, in communicatie en bij events — gepositioneerd binnen een warm netwerk.",
  },
  {
    icon: Calendar,
    title: "Event-aanwezigheid",
    description:
      "Mogelijkheid om events mede te hosten of een gastoptreden te geven tijdens onze bijeenkomsten.",
  },
];

export default function SponsorsPage() {
  const hoofdsponsors = SPONSORS.filter((s) => s.tier === "hoofdsponsor");
  const partners = SPONSORS.filter((s) => s.tier === "partner");
  const vrienden = SPONSORS.filter((s) => s.tier === "vriend");
  const allNames = SPONSORS.map((s) => s.name);

  return (
    <>
      <Hero
        title="Sponsors & Partners."
        subtitle="Bedrijven die NBCM ondersteunen en onze Nederlandstalige ondernemersgemeenschap op Mallorca mogelijk maken."
        compact
      />

      <section className="bg-ink hairline-t">
        <div className="container-site py-24 md:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-gold">
                  Hoofdsponsors
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
                De bedrijven{" "}
                <em className="italic font-light text-terracotta">
                  naast ons
                </em>
                .
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-3 md:grid-cols-2">
            {hoofdsponsors.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08}>
                <div className="group glass rounded-2xl px-8 py-16 md:px-12 md:py-20 flex flex-col items-center justify-center text-center transition-all hover:bg-pearl/[0.07] relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-linear-to-br from-terracotta/0 to-gold/0 transition-all duration-500 group-hover:from-terracotta/10 group-hover:to-gold/8"
                    aria-hidden="true"
                  />
                  <span className="relative text-[10px] tracking-[0.24em] uppercase text-gold mb-4">
                    Hoofdsponsor
                  </span>
                  <span className="relative font-heading text-3xl md:text-4xl font-semibold text-pearl tracking-[-0.02em]">
                    {s.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-2 hairline-t hairline-b">
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
              <h2 className="mt-8 font-heading text-4xl md:text-5xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05]">
                Partners van de club.
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {partners.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <div className="glass rounded-xl px-4 py-10 text-center transition-all hover:bg-pearl/[0.07] h-full flex items-center justify-center">
                  <span className="font-heading text-sm md:text-base font-medium text-pearl-80">
                    {s.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 pt-10 hairline-t">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60">
                  Vrienden van de club
                </span>
                <span className="flex-1 h-px bg-hairline" />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {vrienden.map((s) => (
                  <li key={s.name} className="text-pearl-80 font-medium">
                    {s.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="mt-16 pt-10 hairline-t">
            <Marquee
              items={allNames}
              speed="slow"
              itemClassName="font-heading text-pearl/30 text-sm tracking-[0.24em] uppercase"
              separator={
                <span className="mx-10 text-terracotta/40" aria-hidden="true">
                  ◆
                </span>
              }
              className="mask-fade-x"
            />
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="container-site py-24 md:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-terracotta" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                  Partner worden
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
                Waarom{" "}
                <em className="italic font-light text-terracotta">
                  partner
                </em>{" "}
                worden van NBCM?
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 text-pearl-80 leading-relaxed text-lg max-w-2xl">
                NBCM is een warm, actief netwerk van Nederlandstalige
                ondernemers op Mallorca. Als partner ben je zichtbaar bij
                een relevante, betrokken doelgroep — zonder harde sales,
                wel met echte verbinding.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-3 md:grid-cols-3">
            {PARTNER_BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <article className="group glass rounded-2xl p-8 md:p-10 h-full transition-all hover:bg-pearl/[0.07]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full hairline text-pearl group-hover:text-terracotta transition-colors">
                    <b.icon size={18} aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 font-heading text-xl md:text-2xl font-semibold text-pearl tracking-tight">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-pearl-60 leading-relaxed">
                    {b.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-2 hairline-t">
        <div className="container-site py-24 md:py-28">
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05]">
                Geïnteresseerd in een samenwerking?
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-pearl-80 leading-relaxed text-lg">
                We bespreken graag persoonlijk wat jouw doelen zijn en hoe
                een samenwerking met NBCM eruit kan zien. Mail ons via{" "}
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="text-terracotta hover:text-terracotta-light transition-colors"
                >
                  {SITE_INFO.email}
                </a>{" "}
                of gebruik het contactformulier.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-4 text-white font-medium transition-all hover:bg-terracotta-light hover:scale-[1.02]"
                >
                  Neem contact op
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
