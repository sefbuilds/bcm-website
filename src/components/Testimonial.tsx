import { Star } from "lucide-react";
import Reveal from "./Reveal";

type Quote = {
  body: string;
  author: string;
  role: string;
  initials: string;
};

const DEFAULT_QUOTE: Quote = {
  body: "Ik had geen idee dat er zoveel Nederlanders op het eiland wonen, laat staan dat er zoveel ondernemers zijn. Fijn om te groeien en te leren in een netwerk van gelijkgestemden.",
  author: "Sophie van den Berg",
  role: "Interieurontwerper · Santa Ponsa · Lid sinds 2023",
  initials: "SB",
};

type Props = {
  quote?: Quote;
};

export default function Testimonial({ quote = DEFAULT_QUOTE }: Props) {
  return (
    <section className="bg-ocean-deep py-20 md:py-24 px-6 md:px-[5vw] text-center">
      <Reveal>
        <div className="inline-flex items-center gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className="text-sunset fill-sunset"
              aria-hidden
            />
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <blockquote className="font-heading italic font-light text-[clamp(1.3rem,2.5vw,1.9rem)] text-warm-text/90 max-w-[680px] mx-auto leading-[1.6] mb-8">
          {quote.body}
        </blockquote>
      </Reveal>

      <Reveal delay={0.16}>
        <div>
          <div className="font-heading text-[0.95rem] font-normal text-warm-text mb-1">
            {quote.author}
          </div>
          <div className="text-[0.75rem] text-warm-text/40">{quote.role}</div>
        </div>
      </Reveal>
    </section>
  );
}
