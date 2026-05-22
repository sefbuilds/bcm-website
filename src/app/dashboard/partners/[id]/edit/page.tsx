import { notFound } from "next/navigation";
import PageHeader from "../../../PageHeader";
import PartnerForm from "../../PartnerForm";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type DBRow = {
  id: string;
  name: string;
  tier: "partner" | "vriend";
  website: string | null;
  logo_url: string | null;
  is_active: boolean;
  sort_order: number;
};

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("nbcm_partners")
    .select("id, name, tier, website, logo_url, is_active, sort_order")
    .eq("id", id)
    .maybeSingle<DBRow>();

  if (error || !data) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Partners · Bewerken"
        title={data.name}
        description={`Tier: ${data.tier}`}
      />
      <PartnerForm
        mode="edit"
        partnerId={data.id}
        initial={{
          name: data.name,
          tier: data.tier,
          website: data.website ?? "",
          logo_url: data.logo_url ?? "",
          is_active: data.is_active,
          sort_order: data.sort_order,
        }}
      />
    </>
  );
}
