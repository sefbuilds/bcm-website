import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuroraBg from "@/components/AuroraBg";
import { createSupabaseServer } from "@/lib/supabase-server";
import WelcomeForm from "./WelcomeForm";

export const metadata: Metadata = {
  title: "Welkom",
  description: "Rond je account aan bij NBCM.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function WelcomePage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=invite-invalid");
  }

  return (
    <main className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-ink">
      <AuroraBg variant="subtle" />
      <div className="noise" />

      <div className="relative z-10 container-site py-20 md:py-28">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl glass-strong p-8 md:p-10">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-terracotta" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                  NBCM · Welkom
                </span>
              </div>
              <h1 className="mt-6 font-heading text-3xl md:text-4xl font-semibold text-pearl tracking-[-0.03em] leading-tight">
                Kies je wachtwoord.
              </h1>
              <p className="mt-3 text-sm text-pearl-80 leading-relaxed">
                Je bent uitgenodigd voor het dashboard. Stel een wachtwoord
                in om verder te gaan als{" "}
                <span className="text-pearl">{user.email}</span>.
              </p>
            </div>

            <WelcomeForm />
          </div>
        </div>
      </div>
    </main>
  );
}
