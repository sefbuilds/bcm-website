import type { ReactNode } from "react";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import Sidebar from "./Sidebar";
import MobileTopbar from "./MobileTopbar";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-ink text-pearl flex flex-col lg:flex-row">
      <Sidebar admin={admin} />
      <div className="flex-1 flex flex-col">
        <MobileTopbar admin={admin} />
        <main className="flex-1 p-6 md:p-10 max-w-6xl w-full">{children}</main>
      </div>
    </div>
  );
}
