import type { Metadata } from "next";
import Hero from "@/components/Hero";
import NextEvent from "@/components/NextEvent";
import EventCard from "@/components/EventCard";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { PAST_EVENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Events & Bijeenkomsten",
  description:
    "Een overzicht van de bijeenkomsten, borrels en diners van de Nederlandstalige Business Club Mallorca — inclusief het volgende event.",
};

export default function EventsPage() {
  return (
    <>
      <Hero
        title="Events & Bijeenkomsten."
        subtitle="Elke maand komen we samen op de mooiste plekken van Mallorca."
        compact
      />

      <NextEvent />

      <section className="bg-ink-2 hairline-t hairline-b">
        <div className="container-site py-24 md:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-terracotta" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                  Terugblik
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05]">
                Eerdere{" "}
                <em className="italic font-light text-terracotta">
                  events
                </em>
                .
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 text-pearl-80 leading-relaxed text-lg">
                Een greep uit onze bijeenkomsten van de afgelopen maanden.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-3 md:grid-cols-2">
            {PAST_EVENTS.map((event, i) => (
              <Reveal key={event.id} delay={i * 0.06}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Zin om aan te sluiten?"
        subtitle="Onze events zijn gastvrij voor nieuwe leden. Kom een keer kennismaken."
        buttonText="Meld je aan"
        italicWord="aan te sluiten"
      />
    </>
  );
}
