import PageHeader from "../../PageHeader";
import PartnerForm from "../PartnerForm";

export const dynamic = "force-dynamic";

export default function NewPartnerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners · Nieuw"
        title="Nieuwe partner toevoegen"
        description="Verschijnt op /sponsors zodra 'Actief' aan staat."
      />
      <PartnerForm mode="new" />
    </>
  );
}
