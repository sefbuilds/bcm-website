import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { MEMBERS, MEMBERS_TOTAL } from "@/lib/constants";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function Members() {
  return (
    <section className="bg-ink relative">
      <div className="container-site py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-terracotta" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                  Leden
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
                Een netwerk van{" "}
                <em className="italic font-light text-terracotta">
                  {MEMBERS_TOTAL} ondernemers
                </em>
                .
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link
              href="/lid-worden"
              className="group inline-flex items-center gap-1.5 text-terracotta hover:text-terracotta-light font-medium"
            >
              Word lid
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERS.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.04}>
              <TiltCard intensity={5}>
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
          <p className="mt-10 text-sm text-pearl-60">
            En nog {MEMBERS_TOTAL - MEMBERS.length} andere leden uit de
            Nederlandstalige gemeenschap op Mallorca.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
