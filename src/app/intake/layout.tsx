import type { ReactNode } from "react";

/**
 * Standalone layout for the /intake experience.
 * Rendered without the site Navbar, Footer, or SponsorBanner so the form
 * feels like its own focused environment in a new tab.
 */
export default function IntakeLayout({ children }: { children: ReactNode }) {
  return <main className="flex-1">{children}</main>;
}
