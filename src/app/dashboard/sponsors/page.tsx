import Image from "next/image";
import { getSupabaseAdmin } from "@/lib/supabase";
import PageHeader from "../PageHeader";
import DashboardTable from "../DashboardTable";

type Sponsor = {
  id: string;
  name: string;
  company: string;
  website: string;
  website_label: string;
  image_url: string;
  linkedin: string | null;
  instagram: string | null;
  is_active: boolean;
  sort_order: number;
};

async function getSponsors(): Promise<Sponsor[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("nbcm_sponsors")
    .select(
      "id, name, company, website, website_label, image_url, linkedin, instagram, is_active, sort_order",
    )
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("[dashboard/sponsors] failed to load", error);
    return [];
  }
  return (data ?? []) as Sponsor[];
}

export default async function SponsorsDashboardPage() {
  const sponsors = await getSponsors();

  return (
    <>
      <PageHeader
        eyebrow="Sponsors"
        title="Hoofdsponsors"
        description="Prominent getoond op /sponsors en in de sponsorbanner."
      />

      <DashboardTable
        rows={sponsors}
        getKey={(s) => s.id}
        columns={[
          {
            header: "Bedrijf",
            key: "company",
            cell: (s) => (
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 shrink-0 rounded-full overflow-hidden hairline">
                  <Image
                    src={s.image_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div>
                  <div className="font-medium text-pearl">{s.company}</div>
                  <div className="text-[11px] text-pearl-60">{s.name}</div>
                </div>
              </div>
            ),
          },
          {
            header: "Website",
            key: "website",
            cell: (s) => (
              <a
                href={s.website}
                target="_blank"
                rel="noreferrer"
                className="text-terracotta hover:text-terracotta-light"
              >
                {s.website_label}
              </a>
            ),
          },
          {
            header: "Socials",
            key: "socials",
            cell: (s) => (
              <div className="flex gap-3 text-xs">
                {s.linkedin && (
                  <a
                    href={s.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pearl-80 hover:text-pearl"
                  >
                    LinkedIn
                  </a>
                )}
                {s.instagram && (
                  <a
                    href={s.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pearl-80 hover:text-pearl"
                  >
                    Instagram
                  </a>
                )}
                {!s.linkedin && !s.instagram && (
                  <span className="text-pearl-60">—</span>
                )}
              </div>
            ),
          },
          {
            header: "Actief",
            key: "active",
            cell: (s) => (
              <span
                className={`inline-flex items-center gap-1.5 text-xs ${
                  s.is_active ? "text-olive" : "text-pearl-60"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    s.is_active ? "bg-olive" : "bg-pearl-60"
                  }`}
                />
                {s.is_active ? "Ja" : "Nee"}
              </span>
            ),
          },
        ]}
      />
    </>
  );
}
