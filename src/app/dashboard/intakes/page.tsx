import { getSupabaseAdmin } from "@/lib/supabase";
import PageHeader from "../PageHeader";
import DashboardTable from "../DashboardTable";

type Intake = {
  id: string;
  created_at: string;
  role: "lid" | "bestuur";
  tier: "member" | "partner" | "sponsor" | null;
  voornaam: string;
  achternaam: string | null;
  email: string;
  bedrijf: string | null;
  woonplaats: string | null;
  fase: string | null;
};

async function getIntakes(): Promise<Intake[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("nbcm_intakes")
    .select(
      "id, created_at, role, tier, voornaam, achternaam, email, bedrijf, woonplaats, fase",
    )
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) {
    console.error("[dashboard/intakes] failed to load", error);
    return [];
  }
  return (data ?? []) as Intake[];
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default async function IntakesDashboardPage() {
  const intakes = await getIntakes();

  return (
    <>
      <PageHeader
        eyebrow="Intakes"
        title={`${intakes.length} laatste inzendingen`}
        description="Aanmeldingen en bestuur-blauwdrukken vanuit /intake. Klik op een e-mail om direct te reageren."
      />

      <DashboardTable
        rows={intakes}
        empty="Nog geen intakes ontvangen."
        getKey={(r) => r.id}
        columns={[
          {
            header: "Datum",
            key: "date",
            cell: (r) => (
              <span className="text-pearl-80 text-xs tabular-nums">
                {formatDate(r.created_at)}
              </span>
            ),
          },
          {
            header: "Naam",
            key: "name",
            cell: (r) => (
              <div>
                <div className="font-medium text-pearl">
                  {r.voornaam}
                  {r.achternaam ? ` ${r.achternaam}` : ""}
                </div>
                <div className="text-[11px] text-pearl-60 mt-0.5">
                  {r.bedrijf ?? "—"}
                  {r.woonplaats ? ` · ${r.woonplaats}` : ""}
                </div>
              </div>
            ),
          },
          {
            header: "E-mail",
            key: "email",
            cell: (r) => (
              <a
                href={`mailto:${r.email}`}
                className="text-terracotta hover:text-terracotta-light"
              >
                {r.email}
              </a>
            ),
          },
          {
            header: "Rol",
            key: "role",
            cell: (r) => {
              const tone =
                r.role === "bestuur"
                  ? "bg-navy/50 text-pearl"
                  : "bg-pearl/10 text-pearl-80";
              return (
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-[0.2em] uppercase ${tone}`}
                >
                  {r.role}
                </span>
              );
            },
          },
          {
            header: "Tier",
            key: "tier",
            cell: (r) => {
              if (!r.tier) return <span className="text-pearl-60">—</span>;
              const tone =
                r.tier === "sponsor"
                  ? "bg-navy/50 text-pearl"
                  : r.tier === "partner"
                    ? "bg-gold/20 text-gold"
                    : "bg-terracotta/15 text-terracotta";
              return (
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-[0.2em] uppercase ${tone}`}
                >
                  {r.tier}
                </span>
              );
            },
          },
        ]}
      />
    </>
  );
}
