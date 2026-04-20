import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getSponsors, getPartners } from "@/lib/data";
import Reveal from "./Reveal";
import Marquee from "./Marquee";

export default async function Sponsors() {
  const [hoofdsponsors, partners] = await Promise.all([
    getSponsors(),
    getPartners(),
  ]);

  const regularPartners = partners.filter((p) => p.tier === "partner");
  const vrienden = partners.filter((p) => p.tier === "vriend");
  const allNames = [
    ...hoofdsponsors.map((h) => h.company),
    ...partners.map((p) => p.name),
  ];

  return (
    <section className="bg-sand relative">
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
          <Reveal delay={0.2}>
            <Link
              href="/sponsors"
              className="group mt-6 inline-flex items-center gap-1.5 text-terracotta hover:text-terracotta-light font-medium"
            >
              Alle sponsors & partner worden
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 space-y-14">
          {hoofdsponsors.length > 0 && (
            <Reveal delay={0.2}>
              <TierHeader label="Hoofdsponsors" />
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {hoofdsponsors.map((s) => (
                  <Link
                    key={s.id}
                    href="/sponsors"
                    className="group glass rounded-2xl p-6 md:p-8 transition-all hover:bg-pearl/[0.07] flex items-center gap-5"
                  >
                    <div className="relative h-16 w-16 md:h-20 md:w-20 shrink-0 rounded-full overflow-hidden hairline">
                      <Image
                        src={s.image_url}
                        alt={s.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] tracking-[0.24em] uppercase text-gold">
                        Hoofdsponsor
                      </div>
                      <h3 className="mt-1 font-heading text-xl md:text-2xl font-semibold text-pearl tracking-[-0.02em] leading-tight truncate">
                        {s.company}
                      </h3>
                      <div className="mt-1 text-sm text-pearl-60">
                        {s.name}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-pearl-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pearl"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </Reveal>
          )}

          {regularPartners.length > 0 && (
            <Reveal delay={0.28}>
              <TierHeader label="Partners" />
              <div className="mt-6 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {regularPartners.map((s) => (
                  <div
                    key={s.id}
                    className="glass rounded-xl px-4 py-7 text-center transition-all hover:bg-pearl/[0.07]"
                  >
                    <span className="font-heading text-sm font-medium text-pearl-80">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {vrienden.length > 0 && (
            <Reveal delay={0.36}>
              <TierHeader label="Vrienden van de club" />
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {vrienden.map((s) => (
                  <li key={s.id} className="text-pearl-80 font-medium">
                    {s.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        {allNames.length > 0 && (
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
        )}
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
