import Link from "next/link";
import { Mail } from "lucide-react";
import { NAV_ITEMS, SITE_INFO } from "@/lib/constants";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.6 1.6-1.6h1.7V4.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V14h2.6v8h3.2z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink hairline-t">
      <div className="container-site pt-20 pb-10">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="font-heading font-bold text-2xl tracking-[0.2em] text-pearl">
              {SITE_INFO.name}
            </p>
            <p className="mt-5 text-sm text-pearl-60 leading-relaxed max-w-sm">
              {SITE_INFO.fullName}.
            </p>
            <p className="mt-6 font-heading italic text-gold text-lg leading-relaxed max-w-md">
              Samen kunnen we meer, samen weten we meer en samen verdienen we meer.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-[10px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-5">
              Navigatie
            </h2>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-pearl-80 hover:text-pearl transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-[10px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-5">
              Contact
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="inline-flex items-center gap-2 text-pearl-80 hover:text-pearl transition-colors"
                >
                  <Mail size={14} aria-hidden="true" />
                  {SITE_INFO.email}
                </a>
              </li>
              <li className="text-pearl-80">{SITE_INFO.location}</li>
            </ul>
            <div className="mt-6">
              <a
                href={SITE_INFO.facebookUrl}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-pearl-60 hover:text-pearl transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 hairline-t flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] tracking-widest uppercase text-pearl-60">
          <p>© {year} {SITE_INFO.fullName}</p>
          <p>Palma · Balearen · 39.57° N · 2.65° E</p>
          <p>
            Designed &amp; built by{" "}
            <a
              href="https://astrelon.io"
              target="_blank"
              rel="noreferrer"
              className="text-pearl hover:text-gold transition-colors"
            >
              Astrelon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
