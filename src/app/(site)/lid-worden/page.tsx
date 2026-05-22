import type { Metadata } from "next";
import { Check } from "lucide-react";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { MEMBERSHIP_STEPS, MEMBERSHIP_BENEFITS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Lid worden",
  description:
    "Meld je aan als lid van de Nederlandstalige Business Club Mallorca en sluit je aan bij een warm netwerk van ondernemers op de Balearen.",
};

export default function LidWordenPage() {
  return (
    <>
      <Hero
        title="Lid worden."
        subtitle="Sluit je aan bij een netwerk van Nederlandstalige ondernemers op Mallorca."
        compact
      />

      <ValueProps eyebrow="Voordelen" heading="Wat je als lid mag verwachten" />

      <section className="bg-ink-2 hairline-t hairline-b">
        <div className="container-site py-24 md:py-32">
          <div className="grid gap-14 md:grid-cols-2 md:gap-20 items-start">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-terracotta" />
                  <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                    Alles op een rij
                  </span>
                </div>
                <h2 className="mt-8 font-heading text-4xl md:text-5xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05]">
                  Inbegrepen bij het lidmaatschap.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-4">
                {MEMBERSHIP_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta/15 text-terracotta">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <span className="text-pearl-80 leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
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
                  Aanmelden
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05]">
                Hoe het werkt.
              </h2>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-3 md:grid-cols-3">
            {MEMBERSHIP_STEPS.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08}>
                <article className="glass rounded-2xl p-8 md:p-10 h-full">
                  <div className="font-heading text-terracotta text-2xl font-semibold tracking-tight">
                    {step.step}
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-semibold text-pearl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-pearl-60 leading-relaxed">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-2 hairline-t">
        <div className="container-site py-24 md:py-32">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center gap-3 justify-center">
                <span className="h-px w-10 bg-terracotta" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                  Aanmeldformulier
                </span>
                <span className="h-px w-10 bg-terracotta" />
              </div>
              <h2 className="mt-8 font-heading text-4xl md:text-5xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05]">
                Laat van je horen.
              </h2>
              <p className="mt-8 text-pearl-80 leading-relaxed text-lg">
                Vul het formulier in en we nemen persoonlijk contact met
                je op.
              </p>
            </div>
            <div className="mt-14 glass rounded-2xl p-8 md:p-10">
              <ContactForm variant="signup" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
