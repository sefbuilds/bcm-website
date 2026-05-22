"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutGrid, Users, Handshake, Star, FileText, Calendar } from "lucide-react";
import { signOutAction } from "./actions";
import type { AdminProfile } from "@/lib/auth";

type Props = {
  admin: AdminProfile;
};

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/events", label: "Events", icon: Calendar },
  { href: "/dashboard/leden", label: "Leden", icon: Users },
  { href: "/dashboard/partners", label: "Partners", icon: Handshake },
  { href: "/dashboard/sponsors", label: "Sponsors", icon: Star },
  { href: "/dashboard/intakes", label: "Intakes", icon: FileText },
];

export default function Sidebar({ admin }: Props) {
  const pathname = usePathname();
  const displayName = admin.name || admin.email;

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-ink-2 hairline text-pearl min-h-screen sticky top-0 p-6">
      <Link href="/" className="inline-flex items-baseline gap-2 mb-10">
        <span className="font-heading font-bold text-lg tracking-[0.24em] text-pearl">
          NBCM
        </span>
        <span className="text-[9px] tracking-[0.3em] uppercase text-pearl-60">
          Dashboard
        </span>
      </Link>

      <nav className="flex-1 flex flex-col gap-1">
        {NAV.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-pearl/10 text-pearl"
                  : "text-pearl-80 hover:text-pearl hover:bg-pearl/[0.04]"
              }`}
            >
              <Icon size={15} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 hairline-t">
        <div className="mb-3">
          <div className="text-sm font-medium text-pearl truncate">
            {displayName}
          </div>
          <div className="text-[10px] tracking-[0.24em] uppercase text-pearl-60 mt-0.5">
            {admin.role}
          </div>
        </div>
        <form action={signOutAction}>
          <button
            type="submit"
            className="group inline-flex items-center gap-2 text-xs text-pearl-60 hover:text-terracotta transition-colors"
          >
            <LogOut size={13} aria-hidden="true" />
            Uitloggen
          </button>
        </form>
      </div>
    </aside>
  );
}
