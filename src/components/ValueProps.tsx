import { Users, Briefcase, TrendingUp } from "lucide-react";
import { VALUE_PROPS, type ValueProp } from "@/lib/constants";
import Reveal from "./Reveal";

const ICONS = {
  users: Users,
  briefcase: Briefcase,
  trending: TrendingUp,
} as const;

type Props = {
  heading?: string;
  eyebrow?: string;
  italicWord?: string;
  items?: ValueProp[];
};

export default function ValueProps({
  heading = "Wat brengt het je?",
  eyebrow,
  italicWord,
  items = VALUE_PROPS,
}: Props) {
  const renderHeading = () => {
    if (!italicWord) return heading;
    const idx = heading.toLowerCase().indexOf(italicWord.toLowerCase());
    if (idx === -1) return heading;
    return (
      <>
        {heading.slice(0, idx)}
        <em className="italic font-light text-terracotta">
          {heading.slice(idx, idx + italicWord.length)}
        </em>
        {heading.slice(idx + italicWord.length)}
      </>
    );
  };

  return (
    <section className="bg-ink">
      <div className="container-site py-24 md:py-32">
        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-terracotta" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                  {eyebrow}
                </span>
              </div>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
              {renderHeading()}
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-3 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon];
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <article className="group relative h-full glass rounded-2xl p-8 md:p-10 transition-all hover:bg-pearl/[0.07] overflow-hidden">
                  <div
                    className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-terracotta/0 blur-3xl transition-all duration-500 group-hover:bg-terracotta/20"
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full hairline text-pearl transition-colors group-hover:text-terracotta">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60">
                      {num}
                    </span>
                  </div>
                  <h3 className="relative mt-14 font-heading text-xl md:text-2xl font-semibold text-pearl tracking-tight">
                    {item.title}
                  </h3>
                  <p className="relative mt-4 text-pearl-80 leading-relaxed">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
