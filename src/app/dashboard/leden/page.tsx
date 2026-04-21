import Link from "next/link";
import { MapPin, Plus, Pencil } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase";
import PageHeader from "../PageHeader";
import DashboardTable from "../DashboardTable";

type Member = {
  id: string;
  voornaam: string;
  achternaam: string | null;
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
    .select(
      "id, voornaam, achternaam, initials, role, company, location, is_public, sort_order, created_at",
    )
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("[dashboard/leden] failed to load", error);
    return [];
  }
  return (data ?? []) as Member[];
}

export default async function LedenDashboardPage() {
  const members = await getMembers();
  const publicCount = members.filter((m) => m.is_public).length;

  return (
    <>
      <PageHeader
        eyebrow="Leden"
        title={`${members.length} leden · ${publicCount} publiek zichtbaar`}
        description="Publiek zichtbare leden verschijnen op /leden en in de homepage preview."
        action={
          <Link
            href="/dashboard/leden/new"
            className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-white hover:bg-terracotta-light transition-all"
          >
            <Plus size={14} />
            Nieuw lid
          </Link>
        }
      />

      <DashboardTable
        rows={members}
        getKey={(m) => m.id}
        empty="Nog geen leden — klik op 'Nieuw lid' om te beginnen."
        columns={[
          {
            header: "Naam",
            key: "name",
            cell: (m) => (
              <Link
                href={`/dashboard/leden/${m.id}/edit`}
                className="group flex items-center gap-3"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full hairline text-pearl text-[11px] font-semibold">
                  {m.initials}
                </span>
                <span className="font-medium text-pearl group-hover:text-terracotta transition-colors">
                  {[m.voornaam, m.achternaam].filter(Boolean).join(" ")}
                </span>
              </Link>
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
            cell: (m) => (
              <span className="text-pearl-80">{m.company ?? "—"}</span>
            ),
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
          {
            header: "",
            key: "edit",
            cell: (m) => (
              <Link
                href={`/dashboard/leden/${m.id}/edit`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3 py-1.5 text-xs text-pearl-80 hover:text-pearl hover:border-pearl/30 transition-colors"
                aria-label={`Bewerk ${m.voornaam}`}
              >
                <Pencil size={12} />
                Bewerk
              </Link>
            ),
            className: "text-right",
          },
        ]}
      />
    </>
  );
}
