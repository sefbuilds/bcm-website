import PageHeader from "../../PageHeader";
import SponsorForm from "../SponsorForm";

export const dynamic = "force-dynamic";

export default function NewSponsorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sponsors · Nieuw"
        title="Nieuwe hoofdsponsor toevoegen"
        description="Verschijnt prominent op /sponsors en in de sponsorbanner zodra 'Actief' aan staat."
      />
      <SponsorForm mode="new" />
    </>
  );
}
