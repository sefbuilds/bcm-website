import { notFound } from "next/navigation";
import PageHeader from "../../../PageHeader";
import EventForm from "../../EventForm";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type DBRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  location: string | null;
  start_at: string;
  end_at: string | null;
  tag: string | null;
  hero_image: string | null;
  photos: string[] | null;
  is_featured: boolean;
  is_published: boolean;
  max_attendees: number | null;
  sort_order: number;
};

/** Converts a stored TIMESTAMPTZ ISO to a datetime-local string in Madrid. */
function toMadridLocal(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const fmt = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return fmt.format(d).replace(" ", "T");
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("nbcm_events")
    .select(
      "id, slug, title, description, location, start_at, end_at, tag, hero_image, photos, is_featured, is_published, max_attendees, sort_order",
    )
    .eq("id", id)
    .maybeSingle<DBRow>();

  if (error || !data) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Events · Bewerken"
        title={data.title}
        description={`Slug: ${data.slug}`}
      />
      <EventForm
        mode="edit"
        eventId={data.id}
        initial={{
          slug: data.slug,
          title: data.title,
          description: data.description ?? "",
          location: data.location ?? "",
          start_at_local: toMadridLocal(data.start_at),
          end_at_local: toMadridLocal(data.end_at),
          tag: data.tag ?? "",
          hero_image: data.hero_image ?? "",
          photos_array: data.photos ?? [],
          is_featured: data.is_featured,
          is_published: data.is_published,
          max_attendees: data.max_attendees,
          sort_order: data.sort_order,
        }}
      />
    </>
  );
}
