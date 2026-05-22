import Link from "next/link";
import { ArrowUpRight, Users, Handshake, Star, FileText, Calendar } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase";
import PageHeader from "./PageHeader";

async function getCounts() {
  const supabase = getSupabaseAdmin();
  const weekAgo = new Date(Date.now() - 7 * 86400 * 1000).toISOString();
  const now = new Date().toISOString();

  const queries = await Promise.all([
    supabase.from("nbcm_members").select("id", { count: "exact", head: true }),
    supabase.from("nbcm_partners").select("id", { count: "exact", head: true }),
    supabase.from("nbcm_sponsors").select("id", { count: "exact", head: true }),
    supabase.from("nbcm_intakes").select("id", { count: "exact", head: true }),
    supabase
      .from("nbcm_intakes")
      .select("id", { count: "exact", head: true })
      .gte("created_at", weekAgo),
    supabase
      .from("nbcm_events")
      .select("id", { count: "exact", head: true })
      .gte("start_at", now),
    supabase
      .from("nbcm_event_registrations")
      .select("id", { count: "exact", head: true })
      .gte("created_at", weekAgo),
  ]);

  return {
    members: queries[0].count ?? 0,
    partners: queries[1].count ?? 0,
    sponsors: queries[2].count ?? 0,
    intakes: queries[3].count ?? 0,
    intakesWeek: queries[4].count ?? 0,
    upcomingEvents: queries[5].count ?? 0,
    eventRegsWeek: queries[6].count ?? 0,
  };
}

type Tile = {
  label: string;
  value: number;
  sub?: string;
  href: string;
  icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
};

export default async function DashboardOverviewPage() {
  const counts = await getCounts();

  const tiles: Tile[] = [
    { label: "Leden", value: counts.members, href: "/dashboard/leden", icon: Users },
    {
      label: "Komende events",
      value: counts.upcomingEvents,
      sub:
        counts.eventRegsWeek > 0
          ? `+${counts.eventRegsWeek} aanmeldingen deze week`
          : undefined,
      href: "/dashboard/events",
      icon: Calendar,
    },
    { label: "Partners", value: counts.partners, href: "/dashboard/partners", icon: Handshake },
    { label: "Sponsors", value: counts.sponsors, href: "/dashboard/sponsors", icon: Star },
    {
      label: "Intakes",
      value: counts.intakes,
      sub:
        counts.intakesWeek > 0
          ? `+${counts.intakesWeek} deze week`
          : undefined,
      href: "/dashboard/intakes",
      icon: FileText,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Korte status van leden, partners, sponsors en binnengekomen intakes."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.label}
              href={tile.href}
              className="group relative rounded-2xl hairline bg-ink-2 p-6 transition-colors hover:bg-pearl/[0.04]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-pearl-60">
                  <Icon size={12} aria-hidden />
                  {tile.label}
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-pearl-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pearl"
                  aria-hidden
                />
              </div>
              <div className="mt-6 font-heading font-semibold text-5xl text-pearl tracking-[-0.04em] leading-none">
                {tile.value}
              </div>
              {tile.sub && (
                <div className="mt-2 text-[11px] tracking-[0.2em] uppercase text-terracotta">
                  {tile.sub}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
