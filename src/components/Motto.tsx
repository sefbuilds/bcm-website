"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MOTTO_LINES } from "@/lib/constants";

export default function Motto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={ref}
      className="relative bg-ink-2 overflow-hidden hairline-t hairline-b"
    >
      <div
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 h-[120%] w-[70%] rounded-full bg-terracotta/10 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="noise" />

      <motion.div
        style={{ y }}
        className="relative container-site py-32 md:py-48"
      >
        <div className="flex items-center gap-3 mb-16 md:mb-24">
          <span className="h-px w-12 bg-terracotta" />
          <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
            Ons motto
          </span>
        </div>

        <div>
          {MOTTO_LINES.map((line, i) => (
            <MottoLine key={line} index={i} line={line} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function MottoLine({ index, line }: { index: number; line: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.15, 1, 1, 0.35],
  );
  const x = useTransform(scrollYProgress, [0, 0.4], [-20, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className={`flex items-baseline gap-6 md:gap-12 py-10 md:py-16 ${
        index < MOTTO_LINES.length - 1 ? "hairline-b" : ""
      }`}
    >
      <span
        className="text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 shrink-0 w-10 pt-3 md:pt-5"
        aria-hidden="true"
      >
        0{index + 1}
      </span>
      <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] xl:text-[9rem] font-semibold text-pearl tracking-[-0.04em] leading-[0.95] text-balance">
        <em className="italic font-light text-terracotta">Samen</em>{" "}
        {line}.
      </h2>
    </motion.div>
  );
}
