import Link from "next/link";
import Image from "next/image";
import { getMembers } from "@/lib/data";
import Reveal from "./Reveal";

export default async function Members() {
  const members = await getMembers();
  const preview = members.slice(0, 8);
  const remainder = Math.max(0, members.length - preview.length);

  return (
    <section className="bg-sand py-20 md:py-24 px-6 md:px-[5vw]" id="leden">
      <div className="text-center max-w-[560px] mx-auto mb-14 md:mb-16">
        <Reveal>
          <span className="label block mb-4">Het netwerk</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-heading font-light leading-[1.08] text-[clamp(2rem,4vw,3.5rem)] text-text">
            Een groeiend netwerk van{" "}
            <em className="italic text-sunset">
              Nederlandstalige ondernemers.
            </em>
          </h2>
        </Reveal>
      </div>

      {members.length === 0 ? (
        <div className="max-w-[1100px] mx-auto p-12 text-center text-text-muted bg-cream border border-sunset/12">
          Leden worden binnenkort toegevoegd.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] max-w-[1100px] mx-auto">
          {preview.map((member, i) => (
            <Reveal key={member.id} delay={i * 0.04}>
              <article className="group relative bg-cream p-8 cursor-pointer transition-colors hover:bg-[#f7f1e3] overflow-hidden h-full">
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-sunset origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
                <div className="flex flex-col items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-ocean-mid flex items-center justify-center font-heading font-light text-[1.4rem] text-sunset border border-sunset/15 transition-colors group-hover:border-sunset overflow-hidden relative">
                    {member.image_url ? (
                      <Image
                        src={member.image_url}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <span>{member.initials}</span>
                    )}
                  </div>
                  <div className="w-full">
                    <h3 className="font-heading text-[1.1rem] font-normal text-text leading-tight mb-1">
                      {member.name}
                    </h3>
                    {member.role && (
                      <p className="text-[0.72rem] text-text-muted leading-[1.4] mb-2 line-clamp-2">
                        {member.role}
                      </p>
                    )}
                    {member.company && (
                      <p className="text-[0.68rem] tracking-[0.1em] uppercase text-sunset font-medium">
                        {member.company}
                      </p>
                    )}
                    {member.location && (
                      <p className="text-[0.68rem] text-text-muted mt-1.5">
                        {member.location}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-center max-w-[1100px] mx-auto">
        {remainder > 0 && (
          <p className="text-sm text-text-muted">
            En nog {remainder} andere leden uit ons netwerk.
          </p>
        )}
        <Link
          href="/leden"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-sunset text-white text-[0.78rem] font-medium tracking-[0.08em] uppercase font-body transition-colors hover:bg-sunset-light w-fit mx-auto sm:mx-0"
        >
          Word ook lid
        </Link>
      </div>
    </section>
  );
}
