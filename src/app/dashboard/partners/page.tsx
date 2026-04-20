import { getSupabaseAdmin } from "@/lib/supabase";
import PageHeader from "../PageHeader";
import DashboardTable from "../DashboardTable";

type Partner = {
  id: string;
  name: string;
  tier: "partner" | "vriend";
  website: string | null;
  is_active: boolean;
  sort_order: number;
};

async function getPartners(): Promise<Partner[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("nbcm_partners")
    .select("id, name, tier, website, is_active, sort_order")
    .order("tier", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("[dashboard/partners] failed to load", error);
    return [];
  }
  return (data ?? []) as Partner[];
}

export default async function PartnersDashboardPage() {
  const partners = await getPartners();
  const byTier = {
    partner: partners.filter((p) => p.tier === "partner").length,
    vriend: partners.filter((p) => p.tier === "vriend").length,
  };

  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Partners & vrienden van de club"
        description={`${byTier.partner} partners · ${byTier.vriend} vrienden`}
      />

      <DashboardTable
        rows={partners}
        getKey={(p) => p.id}
        columns={[
          {
            header: "Naam",
            key: "name",
            cell: (p) => <span className="font-medium text-pearl">{p.name}</span>,
          },
          {
            header: "Tier",
            key: "tier",
            cell: (p) => (
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-[0.2em] uppercase ${
                  p.tier === "partner"
                    ? "bg-gold/20 text-gold"
                    : "bg-pearl/10 text-pearl-80"
                }`}
              >
                {p.tier}
              </span>
            ),
          },
          {
            header: "Website",
            key: "website",
            cell: (p) =>
              p.website ? (
                <a
                  href={p.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-terracotta hover:text-terracotta-light"
                >
                  {p.website.replace(/^https?:\/\//, "")}
                </a>
              ) : (
                <span className="text-pearl-60">—</span>
              ),
          },
          {
            header: "Actief",
            key: "active",
            cell: (p) => (
              <span
                className={`inline-flex items-center gap-1.5 text-xs ${
                  p.is_active ? "text-olive" : "text-pearl-60"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    p.is_active ? "bg-olive" : "bg-pearl-60"
                  }`}
                />
                {p.is_active ? "Ja" : "Nee"}
              </span>
            ),
          },
        ]}
      />
    </>
  );
}
