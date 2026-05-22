import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase";
import PageHeader from "../PageHeader";
import IntakeDetail from "./IntakeDetail";

type IntakeListRow = {
  id: string;
  created_at: string;
  role: "lid" | "bestuur";
  tier: "member" | "partner" | "sponsor" | null;
  voornaam: string;
  achternaam: string | null;
  email: string;
  bedrijf: string | null;
  woonplaats: string | null;
};

type IntakeFull = IntakeListRow & {
  telefoon: string | null;
  website: string | null;
  fase: string | null;
  data: Record<string, unknown>;
};

type SP = { id?: string };

async function getIntakes(): Promise<IntakeListRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("nbcm_intakes")
    .select(
      "id, created_at, role, tier, voornaam, achternaam, email, bedrijf, woonplaats",
    )
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    console.error("[dashboard/intakes] list", error);
    return [];
  }
  return (data ?? []) as IntakeListRow[];
}

async function getIntakeById(id: string): Promise<IntakeFull | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("nbcm_intakes")
    .select(
      "id, created_at, role, tier, voornaam, achternaam, email, telefoon, woonplaats, bedrijf, website, fase, data",
    )
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("[dashboard/intakes] detail", error);
    return null;
  }
  return (data as IntakeFull | null) ?? null;
}

function formatShort(iso: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  }).format(new Date(iso));
}

export default async function IntakesDashboardPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const [intakes, selected] = await Promise.all([
    getIntakes(),
    sp.id ? getIntakeById(sp.id) : Promise.resolve(null),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Intakes"
        title={`${intakes.length} inzendingen`}
        description="Klik op een rij voor het volledige antwoordprofiel — deelbare link via ?id=…"
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <aside
          className={`rounded-2xl hairline bg-ink-2 overflow-hidden ${
            selected ? "hidden lg:block" : "block"
          }`}
        >
          {intakes.length === 0 ? (
            <div className="p-10 text-center text-sm text-pearl-60">
              Nog geen intakes ontvangen.
            </div>
          ) : (
            <ul className="divide-y divide-hairline max-h-[calc(100vh-220px)] overflow-y-auto">
              {intakes.map((i) => {
                const active = selected?.id === i.id;
                return (
                  <li key={i.id}>
                    <Link
                      href={`/dashboard/intakes?id=${i.id}`}
                      scroll={false}
                      className={`block px-5 py-4 transition-colors ${
                        active
                          ? "bg-pearl/[0.06]"
                          : "hover:bg-pearl/[0.04]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-medium text-pearl truncate">
                            {i.voornaam}
                            {i.achternaam ? ` ${i.achternaam}` : ""}
                          </div>
                          <div className="text-xs text-pearl-60 mt-0.5 truncate">
                            {i.bedrijf ?? i.email}
                          </div>
                        </div>
                        <span className="text-[10px] text-pearl-60 shrink-0 tabular-nums whitespace-nowrap">
                          {formatShort(i.created_at)}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-medium tracking-[0.2em] uppercase ${
                            i.role === "bestuur"
                              ? "bg-navy/50 text-pearl"
                              : "bg-pearl/10 text-pearl-80"
                          }`}
                        >
                          {i.role}
                        </span>
                        {i.tier && (
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-medium tracking-[0.2em] uppercase ${
                              i.tier === "sponsor"
                                ? "bg-navy/50 text-pearl"
                                : i.tier === "partner"
                                  ? "bg-gold/20 text-gold"
                                  : "bg-terracotta/15 text-terracotta"
                            }`}
                          >
                            {i.tier}
                          </span>
                        )}
                        {i.woonplaats && (
                          <span className="ml-auto text-[10px] text-pearl-60 truncate">
                            {i.woonplaats}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        <section className={selected ? "block" : "hidden lg:block"}>
          <IntakeDetail intake={selected} />
        </section>
      </div>
    </>
  );
}
