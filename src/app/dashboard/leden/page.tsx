import { MapPin } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase";
import PageHeader from "../PageHeader";
import DashboardTable from "../DashboardTable";

type Member = {
  id: string;
  name: string;
  initials: string;
  role: string | null;
  company: string | null;
  location: string | null;
  is_public: boolean;
  sort_order: number;
  created_at: string;
};

async function getMembers(): Promise<Member[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("nbcm_members")
    .select("id, name, initials, role, company, location, is_public, sort_order, created_at")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("[dashboard/leden] failed to load", error);
    return [];
  }
  return (data ?? []) as Member[];
}

export default async function LedenDashboardPage() {
  const members = await getMembers();

  return (
    <>
      <PageHeader
        eyebrow="Leden"
        title={`${members.length} leden in de database`}
        description="Publiek zichtbare leden worden op /leden en op de homepage getoond."
      />

      <DashboardTable
        rows={members}
        getKey={(m) => m.id}
        columns={[
          {
            header: "Naam",
            key: "name",
            cell: (m) => (
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full hairline text-pearl text-[11px] font-semibold">
                  {m.initials}
                </span>
                <span className="font-medium text-pearl">{m.name}</span>
              </div>
            ),
          },
          {
            header: "Rol",
            key: "role",
            cell: (m) => <span className="text-pearl-80">{m.role ?? "—"}</span>,
          },
          {
            header: "Bedrijf",
            key: "company",
            cell: (m) => <span className="text-pearl-80">{m.company ?? "—"}</span>,
          },
          {
            header: "Locatie",
            key: "location",
            cell: (m) => (
              <span className="inline-flex items-center gap-1 text-pearl-60 text-xs">
                <MapPin size={11} aria-hidden />
                {m.location ?? "—"}
              </span>
            ),
          },
          {
            header: "Publiek",
            key: "public",
            cell: (m) => (
              <span
                className={
                  m.is_public
                    ? "inline-flex items-center gap-1.5 text-xs text-olive"
                    : "inline-flex items-center gap-1.5 text-xs text-pearl-60"
                }
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    m.is_public ? "bg-olive" : "bg-pearl-60"
                  }`}
                />
                {m.is_public ? "Zichtbaar" : "Verborgen"}
              </span>
            ),
          },
        ]}
      />
    </>
  );
}
