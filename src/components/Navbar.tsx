"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, LogIn, LayoutGrid } from "lucide-react";
import { NAV_ITEMS, SITE_INFO } from "@/lib/constants";

type NavbarProps = {
  isAdmin?: boolean;
};

export default function Navbar({ isAdmin = false }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-400 ease-out backdrop-blur-2xl border-b border-sunset/20 ${
        scrolled
          ? "bg-ocean-deep/97 py-[0.9rem]"
          : "bg-ocean-deep/97 py-[1.4rem]"
      }`}
      style={{ paddingLeft: "5vw", paddingRight: "5vw" }}
    >
      <nav
        className="flex items-center justify-between"
        aria-label="Hoofdnavigatie"
      >
        <Link
          href="/"
          className="flex flex-col gap-0.5 leading-none"
          aria-label={`${SITE_INFO.name} — Home`}
        >
          <span className="font-heading text-[1.6rem] font-medium tracking-[0.22em] text-white uppercase leading-none">
            {SITE_INFO.name}
          </span>
          <span className="text-[0.72rem] tracking-[0.15em] uppercase text-white/90 font-normal">
            {SITE_INFO.fullName}
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-9">
          {NAV_ITEMS.map((item) => {
            if (item.href === "/") return null;
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-[0.75rem] tracking-[0.1em] uppercase font-normal transition-colors ${
                    active ? "text-sunset" : "text-warm-text/55 hover:text-sunset"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            {isAdmin ? (
              <Link
                href="/dashboard"
                className="text-[0.75rem] tracking-[0.1em] uppercase font-medium text-warm-text/55 hover:text-sunset inline-flex items-center gap-1.5"
              >
                <LayoutGrid size={13} aria-hidden="true" />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-[0.75rem] tracking-[0.1em] uppercase font-medium text-warm-text/55 hover:text-sunset inline-flex items-center gap-1.5"
              >
                <LogIn size={13} aria-hidden="true" />
                Log in
              </Link>
            )}
          </li>
          <li>
            <Link
              href="/intake?tier=member"
              className="px-5 py-2 border border-sunset text-sunset text-[0.75rem] tracking-[0.1em] uppercase font-medium transition-colors hover:bg-sunset hover:text-warm-text"
            >
              Lid worden
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 text-warm-text border border-sunset/30"
          aria-label={isOpen ? "Sluit menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-x-0 bottom-0 top-[64px] bg-ocean-deep z-40 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <ul className="px-6 pt-12 flex flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block text-3xl font-heading font-light tracking-tight ${
                    pathname === item.href
                      ? "text-sunset"
                      : "text-warm-text"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-6 flex flex-col gap-3">
              <Link
                href="/intake?tier=member"
                className="inline-flex items-center justify-center px-6 py-3 bg-sunset text-warm-text font-medium uppercase tracking-wider text-sm"
              >
                Lid worden
              </Link>
              {isAdmin ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-sunset/30 text-warm-text uppercase tracking-wider text-sm"
                >
                  <LayoutGrid size={14} aria-hidden="true" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-sunset/30 text-warm-text uppercase tracking-wider text-sm"
                >
                  <LogIn size={14} aria-hidden="true" />
                  Log in
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
