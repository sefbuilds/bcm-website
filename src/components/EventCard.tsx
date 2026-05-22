import { MapPin, Clock } from "lucide-react";
import { formatEventDay, formatEventTimeRange, type DBEvent } from "@/lib/data";

type Props = {
  event: DBEvent;
  variant?: "default" | "featured";
};

export default function EventCard({ event, variant = "default" }: Props) {
  const isFeatured = variant === "featured";
  const { day, month, year } = formatEventDay(event.start_at);
  const timeRange = formatEventTimeRange(event.start_at, event.end_at);

  return (
    <article
      className={`group relative rounded-2xl border border-sand-dark bg-white overflow-hidden transition-all hover:border-terracotta/40 ${
        isFeatured ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-stretch">
        <div className="relative shrink-0 w-28 md:w-32 bg-deep-blue text-white flex flex-col items-center justify-center text-center px-4 py-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-linear-to-b from-deep-blue via-deep-blue to-deep-blue/85"
            aria-hidden="true"
          />
          <div
            className="absolute -inset-4 bg-terracotta/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="font-heading font-bold text-4xl leading-none tracking-tight">
              {day}
            </div>
            <div className="text-[10px] tracking-widest mt-2 text-gold">
              {month}
            </div>
            <div className="text-[10px] text-white/50 mt-1">{year}</div>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-7">
          {event.tag && (
            <span className="inline-block text-[10px] font-medium tracking-widest uppercase text-olive mb-2">
              {event.tag}
            </span>
          )}
          <h3
            className={`font-heading font-semibold text-deep-blue tracking-tight ${
              isFeatured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
            }`}
          >
            {event.title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-deep-blue-60">
            {event.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} aria-hidden="true" />
                {event.location}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {timeRange}
            </span>
          </div>
          {event.description && (
            <p className="mt-4 text-deep-blue-80 leading-relaxed text-sm md:text-base">
              {event.description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
