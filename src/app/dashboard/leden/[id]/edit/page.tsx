import { notFound } from "next/navigation";
import PageHeader from "../../../PageHeader";
import MemberForm from "../../MemberForm";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type DBRow = {
  id: string;
  voornaam: string;
  achternaam: string | null;
  initials: string;
  role: string | null;
  company: string | null;
  location: string | null;
  bio: string | null;
  image_url: string | null;
  website: string | null;
  linkedin: string | null;
  instagram: string | null;
  is_public: boolean;
  sort_order: number;
};

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("nbcm_members")
    .select(
      "id, voornaam, achternaam, initials, role, company, location, bio, image_url, website, linkedin, instagram, is_public, sort_order",
    )
    .eq("id", id)
    .maybeSingle<DBRow>();

  if (error || !data) notFound();

  const fullName = [data.voornaam, data.achternaam]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <PageHeader
        eyebrow="Leden · Bewerken"
        title={fullName}
        description={data.role ? `${data.role} · ${data.company ?? ""}` : undefined}
      />
      <MemberForm
        mode="edit"
        memberId={data.id}
        initial={{
          voornaam: data.voornaam,
          achternaam: data.achternaam ?? "",
          initials: data.initials,
          role: data.role ?? "",
          company: data.company ?? "",
          location: data.location ?? "",
          bio: data.bio ?? "",
          image_url: data.image_url ?? "",
          website: data.website ?? "",
          linkedin: data.linkedin ?? "",
          instagram: data.instagram ?? "",
          is_public: data.is_public,
          sort_order: data.sort_order,
        }}
      />
    </>
  );
}
