import type { BoardMember } from "@/lib/constants";

type Props = {
  member: BoardMember;
};

export default function BestuurCard({ member }: Props) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] rounded-2xl glass overflow-hidden flex items-center justify-center transition-all group-hover:bg-pearl/[0.06]">
        <div
          className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-terracotta/0 blur-3xl transition-all duration-500 group-hover:bg-terracotta/25"
          aria-hidden="true"
        />
        <div className="noise" />
        <span
          className="relative font-heading text-8xl font-semibold text-pearl/15 tracking-[-0.04em]"
          aria-hidden="true"
        >
          {member.initials}
        </span>
      </div>
      <div className="mt-6">
        <div className="text-[10px] font-medium tracking-[0.24em] uppercase text-terracotta">
          {member.role}
        </div>
        <h3 className="mt-2 font-heading text-xl font-semibold text-pearl tracking-tight">
          {member.name}
        </h3>
        <p className="mt-3 text-sm text-pearl-60 leading-relaxed">
          {member.bio}
        </p>
      </div>
    </article>
  );
}
