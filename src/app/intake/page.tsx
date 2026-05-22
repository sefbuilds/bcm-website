import type { Metadata } from "next";
import IntakeForm from "./IntakeForm";
import "./intake.css";
import type { IntakeRole, IntakeTier } from "./actions";

export const metadata: Metadata = {
  title: "Intake & Blauwdruk",
  description:
    "Aanmeldformulier en blauwdruk-input voor de Nederlandstalige Business Club Mallorca.",
  robots: { index: false, follow: false },
};

type SP = { role?: string; tier?: string };

function coerceRole(role?: string): IntakeRole | null {
  return role === "lid" || role === "bestuur" ? role : null;
}

function coerceTier(tier?: string): IntakeTier {
  return tier === "member" || tier === "partner" || tier === "sponsor"
    ? tier
    : null;
}

export default async function IntakePage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const tier = coerceTier(sp.tier);
  // tier selection implies "lid" role
  const role = coerceRole(sp.role) ?? (tier ? "lid" : null);

  return (
    <div className="nbcm-intake">
      <IntakeForm initialRole={role} initialTier={tier} />
    </div>
  );
}
