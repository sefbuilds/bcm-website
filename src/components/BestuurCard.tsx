import type { BoardMember } from "@/lib/constants";

type Props = {
  member: BoardMember;
};

export default function BestuurCard({ member }: Props) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] bg-linear-to-br from-ocean-mid to-ocean overflow-hidden mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading font-light text-[3rem] text-sunset/25">
            {member.initials}
          </span>
        </div>
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[0.62rem] tracking-[0.15em] uppercase text-sunset/35 font-medium font-body">
          Foto volgt
        </span>
      </div>
      <span className="text-[0.6rem] tracking-[0.2em] uppercase text-sunset font-medium block mb-2">
        {member.role}
      </span>
      <h3 className="font-heading text-[1.3rem] font-normal text-warm-text mb-2">
        {member.name}
      </h3>
      <p className="text-[0.8rem] text-warm-text/45 leading-[1.65]">
        {member.bio}
      </p>
    </article>
  );
}
