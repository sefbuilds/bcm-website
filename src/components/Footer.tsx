import Link from "next/link";
import { SITE_INFO } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-ocean-deep border-t border-sunset/15 py-16 md:py-20 px-6 md:px-[5vw]"
      aria-label="Footer"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 md:gap-14 mb-14 pb-12 border-b border-sunset/15 max-w-[1180px] mx-auto">
        {/* Brand */}
        <div>
          <div className="font-heading text-[1.1rem] font-normal tracking-[0.12em] uppercase text-warm-text mb-2">
            {SITE_INFO.name}
          </div>
          <div className="text-[0.65rem] tracking-[0.16em] uppercase text-sunset font-medium mb-5">
            {SITE_INFO.fullName}
          </div>
          <p className="text-[0.82rem] text-warm-text/40 leading-[1.75] max-w-sm">
            Samen kunnen we meer, samen weten we meer en samen verdienen we
            meer. Het zakelijke thuis voor Nederlandstalige ondernemers op de
            Balearen.
          </p>
        </div>

        {/* Navigation */}
        <FooterColumn title="Navigatie">
          <FooterLink href="/over-ons">Over ons</FooterLink>
          <FooterLink href="/leden">Leden</FooterLink>
          <FooterLink href="/events">Events</FooterLink>
          <FooterLink href="/sponsors">Lidmaatschap</FooterLink>
        </FooterColumn>

        <FooterColumn title="Club">
          <FooterLink href="/sponsors">Sponsors</FooterLink>
          <FooterLink href="/login">Login</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterColumn>

        <FooterColumn title="Contact">
          <FooterLink href={`mailto:${SITE_INFO.email}`}>
            {SITE_INFO.email}
          </FooterLink>
          <FooterLink>{SITE_INFO.location}</FooterLink>
          <FooterLink>39.57° N · 2.65° E</FooterLink>
        </FooterColumn>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[0.72rem] text-warm-text/25 max-w-[1180px] mx-auto">
        <span>
          © {year} {SITE_INFO.name} · {SITE_INFO.fullName}
        </span>
        <span>
          Designed in samenwerking met{" "}
          <a
            href="https://astrelon.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-text/40 hover:text-sunset transition-colors"
          >
            Astrelon
          </a>{" "}
          ·{" "}
          <a
            href="https://clarosea.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-text/40 hover:text-sunset transition-colors"
          >
            CLAROSEA
          </a>
        </span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[0.62rem] tracking-[0.2em] uppercase text-sunset font-medium mb-4">
        {title}
      </div>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  if (!href) {
    return <li className="text-[0.82rem] text-warm-text/45">{children}</li>;
  }
  return (
    <li>
      <Link
        href={href}
        className="text-[0.82rem] text-warm-text/45 hover:text-sunset transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
