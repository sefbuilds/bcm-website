import type { Metadata } from "next";
import Hero from "@/components/Hero";
import NextEvent from "@/components/NextEvent";
import EventCard from "@/components/EventCard";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import Image from "next/image";
import { PAST_EVENTS, GALLERY_IMAGES } from "@/lib/constants";

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

      <section className="bg-ink">
        <div className="container-site py-24 md:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-terracotta" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                  Sfeer
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05]">
                Foto-{" "}
                <em className="italic font-light text-terracotta">
                  impressie
                </em>
                .
              </h2>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {GALLERY_IMAGES.map((img, i) => {
              const spans =
                i === 0 || i === 5
                  ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto"
                  : "aspect-square";
              return (
                <Reveal key={img.src} delay={i * 0.05}>
                  <div
                    className={`relative rounded-2xl overflow-hidden group ${spans}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-3 left-4 right-4 text-[11px] tracking-widest uppercase text-pearl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {img.alt}
                    </div>
                  </div>
                </Reveal>
              );
            })}
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
