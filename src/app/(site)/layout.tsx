import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SponsorBanner from "@/components/SponsorBanner";
import { getOptionalAdmin } from "@/lib/auth";
import { getSponsors } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [admin, sponsors] = await Promise.all([
    getOptionalAdmin().catch(() => null),
    getSponsors().catch(() => []),
  ]);

  return (
    <>
      <Navbar isAdmin={!!admin} />
      <main className="flex-1">{children}</main>
      <Footer />
      <SponsorBanner
        sponsors={sponsors.map((s) => ({
          id: s.id,
          company: s.company,
          website: s.website,
        }))}
      />
    </>
  );
}
