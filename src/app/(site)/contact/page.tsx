import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { SITE_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met de Nederlandstalige Business Club Mallorca voor vragen over lidmaatschap, events of samenwerkingen.",
};

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.6 1.6-1.6h1.7V4.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V14h2.6v8h3.2z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contact."
        subtitle="Vragen over lidmaatschap, events of samenwerking? We horen graag van je."
        compact
      />

      <section className="bg-ink-2 hairline-t">
        <div className="container-site py-24 md:py-32">
          <div className="grid gap-14 md:grid-cols-2 md:gap-20 items-start">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-terracotta" />
                  <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                    Contactgegevens
                  </span>
                </div>
                <h2 className="mt-8 font-heading text-4xl md:text-5xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05]">
                  Laat van{" "}
                  <em className="italic font-light text-terracotta">
                    je horen
                  </em>
                  .
                </h2>
                <p className="mt-8 text-pearl-80 leading-relaxed text-lg">
                  Stuur ons een mail of vul het formulier in. We reageren
                  meestal binnen twee werkdagen.
                </p>

                <ul className="mt-12 space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full glass text-pearl shrink-0">
                      <Mail size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-xs tracking-widest uppercase text-pearl-60">
                        E-mail
                      </div>
                      <a
                        href={`mailto:${SITE_INFO.email}`}
                        className="text-pearl hover:text-terracotta transition-colors"
                      >
                        {SITE_INFO.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full glass text-pearl shrink-0">
                      <MapPin size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-xs tracking-widest uppercase text-pearl-60">
                        Locatie
                      </div>
                      <p className="text-pearl">{SITE_INFO.location}</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-10">
                  <div className="text-xs tracking-widest uppercase text-pearl-60 mb-3">
                    Volg ons
                  </div>
                  <a
                    href={SITE_INFO.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-pearl hover:text-terracotta transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={16} />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="glass-strong rounded-2xl p-8 md:p-10">
                <ContactForm variant="contact" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
