import PageHeader from "../../PageHeader";
import EventForm from "../EventForm";

export const dynamic = "force-dynamic";

export default function NewEventPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events · Nieuw"
        title="Nieuw event aanmaken"
        description="Komt live op de site zodra 'Gepubliceerd' aan staat."
      />
      <EventForm mode="new" />
    </>
  );
}
