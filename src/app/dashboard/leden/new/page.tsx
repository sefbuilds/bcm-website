import PageHeader from "../../PageHeader";
import MemberForm from "../MemberForm";

export const dynamic = "force-dynamic";

export default function NewMemberPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leden · Nieuw"
        title="Nieuw lid toevoegen"
        description="Verschijnt op de site zodra 'Publiek zichtbaar' aan staat."
      />
      <MemberForm mode="new" />
    </>
  );
}
