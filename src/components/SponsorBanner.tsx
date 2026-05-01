"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { DBSponsor } from "@/lib/data";

type Props = {
  sponsors: Pick<DBSponsor, "id" | "company" | "website">[];
};

export default function SponsorBanner({ sponsors }: Props) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const bottomDistance =
        document.documentElement.scrollHeight -
        (y + window.innerHeight);
      setVisible(y > 420 && bottomDistance > 260);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/sponsors" || sponsors.length === 0) return null;

  return (
    <aside
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
      aria-label="Hoofdsponsors"
    >
      <div className="bg-ocean-deep/95 backdrop-blur-xl border-t border-sunset/20">
        <div className="container-site flex items-center justify-between gap-6 py-2.5">
          <div className="flex items-center gap-3 md:gap-5 min-w-0 overflow-hidden">
            <span
              className="inline-flex items-center gap-1.5 shrink-0"
              aria-hidden="true"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunset/70 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sunset" />
              </span>
            </span>
            <span className="hidden sm:inline text-[9px] md:text-[10px] tracking-[0.32em] uppercase text-warm-text/55 font-medium shrink-0">
              In samenwerking met
            </span>
            <span
              className="hidden md:inline h-px w-10 bg-sunset/30 shrink-0"
              aria-hidden="true"
            />
            <ul className="flex items-center gap-4 md:gap-6 min-w-0 overflow-hidden whitespace-nowrap">
              {sponsors.map((s, i) => (
                <li
                  key={s.id}
                  className="flex items-center gap-4 md:gap-6 shrink-0"
                >
                  <Link
                    href="/sponsors"
                    className="font-heading text-[13px] md:text-sm font-medium tracking-[0.04em] text-warm-text hover:text-sunset transition-colors"
                  >
                    {s.company}
                  </Link>
                  {i < sponsors.length - 1 && (
                    <span
                      className="text-sunset/50 text-xs"
                      aria-hidden="true"
                    >
                      ◆
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/sponsors"
            className="group hidden sm:inline-flex items-center gap-1 text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-warm-text/55 hover:text-sunset transition-colors shrink-0"
          >
            <span className="hidden md:inline">Partner worden</span>
            <span className="md:hidden">Info</span>
            <ArrowUpRight
              size={11}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </aside>
  );
}
