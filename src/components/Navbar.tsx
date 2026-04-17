"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_ITEMS, SITE_INFO } from "@/lib/constants";
import LiveTime from "./LiveTime";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/70 backdrop-blur-xl hairline-b"
          : "bg-transparent"
      }`}
    >
      <nav
        className="container-site flex items-center justify-between py-4"
        aria-label="Hoofdnavigatie"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-baseline gap-2"
            aria-label={`${SITE_INFO.name} — Home`}
          >
            <span className="font-heading font-bold text-lg tracking-[0.24em] text-pearl">
              {SITE_INFO.name}
            </span>
            <span className="hidden xl:inline text-[9px] tracking-[0.3em] uppercase text-pearl-60">
              Mallorca
            </span>
          </Link>
          <span
            className="hidden xl:inline-flex items-center gap-2 pl-4 ml-1 border-l border-hairline text-[10px] tracking-[0.24em] uppercase text-pearl-60"
            aria-label="Lokale tijd Palma"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta animate-pulse" />
            <LiveTime className="text-pearl font-medium" showSeconds={false} />
          </span>
        </div>

        <ul className="hidden lg:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-flex px-3.5 py-1.5 rounded-full text-sm transition-all ${
                    active
                      ? "bg-pearl/10 text-pearl"
                      : "text-pearl-80 hover:text-pearl"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/lid-worden"
          className="group hidden lg:inline-flex items-center gap-1.5 rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-terracotta-light hover:scale-[1.02]"
        >
          Lid worden
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full glass text-pearl"
          aria-label={isOpen ? "Sluit menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-x-0 bottom-0 top-[64px] bg-ink z-40 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <ul className="container-site pt-12 flex flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block text-3xl font-heading tracking-[-0.02em] ${
                    pathname === item.href
                      ? "text-terracotta"
                      : "text-pearl"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Link
                href="/lid-worden"
                className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-white font-medium"
              >
                Lid worden
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
