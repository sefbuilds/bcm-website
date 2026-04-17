import type { Metadata } from "next";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import Bestuur from "@/components/Bestuur";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { AMBASSADOR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Maak kennis met de Nederlandstalige Business Club Mallorca: onze missie, onze visie, het bestuur en onze ambassadeur op de Balearen.",
};

export default function OverOns() {
  return (
    <>
      <Hero
        title="Over de club."
        subtitle="Een warm, Nederlandstalig netwerk voor ondernemers op Mallorca."
        compact
      />

      <IntroSection
        eyebrow="Ons verhaal"
        heading="Een informele groep die uitgroeide tot een hechte business club."
        italicWord="hechte business club"
        body={[
          "NBCM ontstond in 2019 uit de behoefte van een paar ondernemers om in hun eigen taal zaken te kunnen bespreken en elkaar echt te leren kennen. Wat begon rond een lange tafel is uitgegroeid tot een actieve club met leden uit Nederland, Vlaanderen en Zuid-Afrika.",
          "Vandaag organiseren we maandelijks borrels, diners en masterclasses op de mooiste plekken van het eiland. Geen verkooppraatjes, wel oprechte gesprekken, kennis delen en samenwerkingen die ontstaan uit vertrouwen.",
        ]}
        imageLabel="Mallorca"
      />

      <section className="bg-ink-2 hairline-t hairline-b">
        <div className="container-site py-24 md:py-32">
          <div className="grid gap-14 md:grid-cols-2 md:gap-20">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-terracotta" />
                  <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                    Missie
                  </span>
                </div>
                <h2 className="mt-8 font-heading text-3xl md:text-4xl font-semibold text-pearl tracking-[-0.03em] leading-[1.1]">
                  Verbinden,{" "}
                  <em className="italic font-light text-terracotta">
                    versterken
                  </em>{" "}
                  en vieren.
                </h2>
                <p className="mt-8 text-pearl-80 leading-relaxed text-lg">
                  We verbinden Nederlandstalige ondernemers op Mallorca,
                  versterken elkaar met kennis en introducties, en vieren
                  de momenten waarop samenwerken leidt tot mooie
                  resultaten.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-terracotta" />
                  <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                    Visie
                  </span>
                </div>
                <h2 className="mt-8 font-heading text-3xl md:text-4xl font-semibold text-pearl tracking-[-0.03em] leading-[1.1]">
                  Het eerste adres voor Nederlandstalig ondernemen op de{" "}
                  <em className="italic font-light text-terracotta">
                    Balearen
                  </em>
                  .
                </h2>
                <p className="mt-8 text-pearl-80 leading-relaxed text-lg">
                  We willen dé plek zijn waar iedere Nederlandstalige
                  ondernemer op Mallorca terecht kan: voor een warm
                  welkom, de juiste contacten en een netwerk dat met je
                  meegroeit.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Bestuur showAmbassador={false} />

      <section className="bg-ink-2 hairline-t">
        <div className="container-site py-24 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <div className="flex items-center gap-3 justify-center">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-gold">
                  Ambassadeur
                </span>
                <span className="h-px w-10 bg-gold" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05]">
                {AMBASSADOR.name}
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 text-pearl-80 leading-relaxed text-lg">
                Als ambassadeur van NBCM vertegenwoordigt Roel de club bij
                lokale en internationale gelegenheden en draagt hij bij
                aan de warme, professionele uitstraling van ons netwerk.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ook onderdeel worden van NBCM?"
        subtitle="Meld je aan en ontmoet het bestuur en de leden op onze volgende bijeenkomst."
        italicWord="onderdeel"
      />
    </>
  );
}
