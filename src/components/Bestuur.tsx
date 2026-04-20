import BestuurCard from "./BestuurCard";
import Reveal from "./Reveal";
import { BOARD_MEMBERS } from "@/lib/constants";

type Props = {
  showAmbassador?: boolean;
  showIntakeNote?: boolean;
};

export default function Bestuur({ showIntakeNote = true }: Props) {
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

        <div className="mt-16 grid gap-8 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {BOARD_MEMBERS.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.05}>
              <BestuurCard member={member} />
            </Reveal>
          ))}
        </div>

        {showIntakeNote && (
          <Reveal delay={0.4}>
            <p className="mt-12 pt-8 hairline-t text-sm text-pearl-60 max-w-2xl">
              Uitgebreide profielen, foto&apos;s en achtergronden van de
              bestuursleden worden aangevuld na de lopende intake-ronde.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
