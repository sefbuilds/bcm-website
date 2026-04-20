"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutGrid, Users, Handshake, Star, FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { signOutAction } from "./actions";
import type { AdminProfile } from "@/lib/auth";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/leden", label: "Leden", icon: Users },
  { href: "/dashboard/partners", label: "Partners", icon: Handshake },
  { href: "/dashboard/sponsors", label: "Sponsors", icon: Star },
  { href: "/dashboard/intakes", label: "Intakes", icon: FileText },
];

export default function MobileTopbar({ admin }: { admin: AdminProfile }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="sticky top-0 z-40 flex items-center justify-between gap-3 bg-ink-2 hairline-b px-4 py-3">
        <Link href="/" className="inline-flex items-baseline gap-2">
          <span className="font-heading font-bold text-sm tracking-[0.24em] text-pearl">
            NBCM
          </span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-pearl-60">
            Dashboard
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center h-9 w-9 rounded-full glass text-pearl"
          aria-label={open ? "Sluit menu" : "Open menu"}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-[57px] z-30 bg-ink overflow-y-auto p-6">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname?.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors ${
                    active
                      ? "bg-pearl/10 text-pearl"
                      : "text-pearl-80 hover:text-pearl"
                  }`}
                >
                  <Icon size={17} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 pt-6 hairline-t">
            <div className="mb-3">
              <div className="text-sm font-medium text-pearl">
                {admin.name || admin.email}
              </div>
              <div className="text-[10px] tracking-[0.24em] uppercase text-pearl-60 mt-0.5">
                {admin.role}
              </div>
            </div>
            <form action={signOutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 text-xs text-pearl-60"
              >
                <LogOut size={13} aria-hidden="true" />
                Uitloggen
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
