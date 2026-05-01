import Hero from "@/components/Hero";
import HeroCards from "@/components/HeroCards";
import PartnerTicker from "@/components/PartnerTicker";
import Manifesto from "@/components/Manifesto";
import IntroSection from "@/components/IntroSection";
import Motto from "@/components/Motto";
import NextEvent from "@/components/NextEvent";
import Members from "@/components/Members";
import Testimonial from "@/components/Testimonial";
import MembershipTiers from "@/components/MembershipTiers";
import Sponsors from "@/components/Sponsors";
import Bestuur from "@/components/Bestuur";
import CTABanner from "@/components/CTABanner";
import { SITE_INFO, STOCK_IMAGES } from "@/lib/constants";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero
        title={SITE_INFO.tagline}
        subtitle={SITE_INFO.subtagline}
        ctaText="Word lid van de club"
        ctaHref="/intake?tier=member"
        italicWord="samen sterker."
        showBento
      />

      <HeroCards />

      <PartnerTicker />

      <Manifesto />

      <IntroSection
        eyebrow="Ons verhaal"
        heading="Een informele groep die uitgroeide tot een hechte business club."
        italicWord="hechte business club"
        highlight="Geen verkooppraatjes, maar oprechte gesprekken, gedeelde kennis en samenwerkingen die ontstaan uit vertrouwen."
        body={[
          "NBCM ontstond in 2019 uit de behoefte van een paar ondernemers om in hun eigen taal zaken te bespreken en elkaar écht te leren kennen. Wat begon rond een lange tafel is uitgegroeid tot een actieve club voor Nederlanders, Vlamingen en Zuid-Afrikanen op Mallorca.",
          "Vandaag organiseren we borrels, diners en masterclasses op de mooiste plekken van het eiland.",
        ]}
        imageLabel="Mallorca — kust"
        imageUrl={STOCK_IMAGES.mediterraneanDinner}
      />

      <Motto />

      <Members />

      <NextEvent />

      <Testimonial />

      <MembershipTiers />

      <Bestuur />

      <Sponsors />

      <CTABanner />
    </>
  );
}
