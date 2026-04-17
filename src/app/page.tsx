import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import IntroSection from "@/components/IntroSection";
import Motto from "@/components/Motto";
import ValueProps from "@/components/ValueProps";
import NextEvent from "@/components/NextEvent";
import Members from "@/components/Members";
import Testimonial from "@/components/Testimonial";
import Sponsors from "@/components/Sponsors";
import Bestuur from "@/components/Bestuur";
import CTABanner from "@/components/CTABanner";
import { SITE_INFO, STOCK_IMAGES } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Hero
        title={SITE_INFO.tagline}
        subtitle={SITE_INFO.subtagline}
        ctaText="Sluit je aan"
        ctaHref="/lid-worden"
        italicWord="samen sterker."
        showBento
      />

      <Stats />

      <IntroSection
        eyebrow="Over NBCM"
        heading="Sinds 2019 het zakelijke thuis voor Nederlandstalige ondernemers."
        italicWord="zakelijke thuis"
        highlight="Warme gesprekken, oprechte connecties, échte samenwerkingen."
        body="Wat begon als een informele groep is uitgegroeid tot een actieve business club voor Nederlanders, Vlamingen en Zuid-Afrikanen op Mallorca. Onder het genot van een hapje en drankje delen we kennis, verkennen we samenwerkingen en bouwen we aan een sterk professioneel netwerk."
        imageLabel="Mediterraans diner op Mallorca"
        imageUrl={STOCK_IMAGES.mediterraneanDinner}
      />

      <Motto />

      <ValueProps
        eyebrow="Waarom NBCM"
        heading="Waarom leden aansluiten."
        italicWord="aansluiten"
      />

      <NextEvent />

      <Members />

      <Testimonial />

      <Sponsors />

      <Bestuur />

      <CTABanner />
    </>
  );
}
