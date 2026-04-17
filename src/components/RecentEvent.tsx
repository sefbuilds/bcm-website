import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import { RECENT_EVENT } from "@/lib/constants";

export default function RecentEvent() {
  const event = RECENT_EVENT;
  const [lead, ...rest] = event.photos ?? [];
  if (!lead) return null;

  return (
    <section className="bg-ink-2 hairline-t hairline-b">
      <div className="container-site py-24 md:py-32">
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-terracotta" />
              <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                Terugblik · {event.day} {event.month} {event.year}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-8 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-pearl tracking-[-0.03em] leading-[1.05] text-balance">
              <em className="italic font-light text-terracotta">
                {event.title}
              </em>
              .
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-5 md:grid-rows-2 md:h-[640px]">
          <Reveal delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden md:col-span-3 md:row-span-2 h-full min-h-[320px] group">
              <Image
                src={lead}
                alt={`${event.title} — hoofdfoto`}
                fill
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-gold mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {event.tag}
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-pearl leading-tight tracking-[-0.02em]">
                  {event.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-pearl/80">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} aria-hidden="true" />
                    {event.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} aria-hidden="true" />
                    {event.time}
                  </span>
                </div>
                <p className="mt-4 text-pearl/85 leading-relaxed max-w-xl">
                  {event.description}
                </p>
              </div>
            </div>
          </Reveal>

          {rest.slice(0, 4).map((src, i) => (
            <Reveal key={src} delay={0.15 + i * 0.05}>
              <div
                className={`relative rounded-2xl overflow-hidden md:col-span-1 h-full min-h-[140px] group ${
                  i === 0 ? "md:col-start-4 md:row-start-1" : ""
                } ${i === 1 ? "md:col-start-5 md:row-start-1" : ""} ${
                  i === 2 ? "md:col-start-4 md:row-start-2" : ""
                } ${i === 3 ? "md:col-start-5 md:row-start-2" : ""}`}
              >
                <Image
                  src={src}
                  alt={`${event.title} — sfeerfoto ${i + 2}`}
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
