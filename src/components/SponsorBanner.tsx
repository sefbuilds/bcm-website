"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { HOOFDSPONSORS } from "@/lib/constants";

export default function SponsorBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 320);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/sponsors") return null;

  return (
    <aside
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
      aria-label="Hoofdsponsors"
    >
      <div
        className="bg-navy/85 backdrop-blur-xl border-t"
        style={{ borderColor: "rgb(241 232 214 / 0.1)" }}
      >
        <div className="container-site flex items-center justify-between gap-4 py-2.5 md:py-3">
          <div className="flex items-center gap-4 md:gap-6 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[9px] md:text-[10px] tracking-[0.24em] uppercase text-gold font-medium">
                Hoofdsponsors
              </span>
            </div>
            <ul className="flex items-center gap-4 md:gap-6 min-w-0">
              {HOOFDSPONSORS.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center gap-2 md:gap-2.5 min-w-0"
                >
                  <div className="relative h-6 w-6 md:h-7 md:w-7 shrink-0 rounded-full overflow-hidden ring-1 ring-pearl/20">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="28px"
                    />
                  </div>
                  <span className="text-sm font-medium text-pearl truncate hidden sm:inline">
                    {s.company}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/sponsors"
            className="group inline-flex items-center gap-1 text-[11px] md:text-xs text-pearl/80 hover:text-pearl transition-colors shrink-0"
          >
            <span className="hidden md:inline">Partner worden</span>
            <span className="md:hidden">Meer</span>
            <ArrowUpRight
              size={12}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </aside>
  );
}
