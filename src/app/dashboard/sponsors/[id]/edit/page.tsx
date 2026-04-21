import { notFound } from "next/navigation";
import PageHeader from "../../../PageHeader";
import SponsorForm from "../../SponsorForm";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type DBRow = {
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

export default async function EditSponsorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("nbcm_sponsors")
    .select(
      "id, name, company, website, website_label, image_url, linkedin, instagram, is_active, sort_order",
    )
    .eq("id", id)
    .maybeSingle<DBRow>();

  if (error || !data) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Sponsors · Bewerken"
        title={data.company}
        description={`Contact: ${data.name}`}
      />
      <SponsorForm
        mode="edit"
        sponsorId={data.id}
        initial={{
          name: data.name,
          company: data.company,
          website: data.website,
          website_label: data.website_label,
          image_url: data.image_url,
          linkedin: data.linkedin ?? "",
          instagram: data.instagram ?? "",
          is_active: data.is_active,
          sort_order: data.sort_order,
        }}
      />
    </>
  );
}
