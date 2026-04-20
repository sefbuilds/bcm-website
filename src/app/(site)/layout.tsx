import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SponsorBanner from "@/components/SponsorBanner";
import { getOptionalAdmin } from "@/lib/auth";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await getOptionalAdmin().catch(() => null);

  return (
    <>
      <Navbar isAdmin={!!admin} />
      <main className="flex-1">{children}</main>
      <Footer />
      <SponsorBanner />
    </>
  );
}
