import BestuurCard from "./BestuurCard";
import Reveal from "./Reveal";
import { BOARD_MEMBERS } from "@/lib/constants";

type Props = {
  showAmbassador?: boolean;
  showIntakeNote?: boolean;
};

export default function Bestuur({ showIntakeNote = true }: Props) {
  return (
    <section
      className="bg-ocean py-20 md:py-24 px-6 md:px-[5vw]"
      id="bestuur"
    >
      <div className="max-w-[600px] mb-14 md:mb-16">
        <Reveal>
          <span className="text-[0.62rem] tracking-[0.32em] uppercase text-sunset font-medium mb-4 block">
            Bestuur
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-heading font-light leading-[1.08] text-[clamp(2rem,4vw,3.5rem)] text-warm-text mb-6">
            De mensen{" "}
            <em className="italic text-sunset-light">achter NBCM.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-[0.98rem] leading-[1.85] text-warm-text/55">
            Het bestuur bestaat uit actieve ondernemers die de club leiden
            vanuit eigen ervaring op Mallorca.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-[1000px] mx-auto">
        {BOARD_MEMBERS.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.05}>
            <BestuurCard member={member} />
          </Reveal>
        ))}
      </div>

      {showIntakeNote && (
        <p className="mt-14 pt-8 border-t border-sunset/15 text-sm text-warm-text/45 max-w-2xl">
          Uitgebreide profielen, foto&apos;s en achtergronden van de
          bestuursleden worden aangevuld na de lopende intake-ronde.
        </p>
      )}
    </section>
  );
}
