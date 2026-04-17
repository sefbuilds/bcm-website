import BestuurCard from "./BestuurCard";
import Reveal from "./Reveal";
import { BOARD_MEMBERS, AMBASSADOR } from "@/lib/constants";

type Props = {
  showAmbassador?: boolean;
};

export default function Bestuur({ showAmbassador = true }: Props) {
  return (
    <section className="bg-ink">
      <div className="container-site py-24 md:py-32">
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-terracotta" />
              <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                Bestuur
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
              De mensen{" "}
              <em className="italic font-light text-terracotta">
                achter NBCM
              </em>
              .
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:gap-8 md:grid-cols-3">
          {BOARD_MEMBERS.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <BestuurCard member={member} />
            </Reveal>
          ))}
        </div>

        {showAmbassador && (
          <Reveal delay={0.3}>
            <div className="mt-20 pt-10 hairline-t flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full glass text-pearl font-heading text-sm font-semibold">
                  RN
                </div>
                <div>
                  <div className="text-[10px] font-medium tracking-[0.24em] uppercase text-terracotta">
                    Ambassadeur
                  </div>
                  <div className="mt-1 font-heading text-lg font-semibold text-pearl">
                    {AMBASSADOR.name}
                  </div>
                </div>
              </div>
              <p className="text-sm text-pearl-60 max-w-md md:text-right">
                Vertegenwoordigt NBCM bij lokale en internationale
                gelegenheden.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
