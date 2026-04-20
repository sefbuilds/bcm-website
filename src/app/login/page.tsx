import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AuroraBg from "@/components/AuroraBg";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Inloggen",
  description: "Bestuur en dev toegang tot het NBCM dashboard.",
  robots: { index: false, follow: false },
};

type SP = { error?: string };

const ERROR_COPY: Record<string, string> = {
  forbidden:
    "Deze account heeft geen dashboard-toegang. Vraag het bestuur om toevoeging.",
  unavailable:
    "Dashboard tijdelijk niet beschikbaar. Probeer het later opnieuw.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const initialError = sp.error ? (ERROR_COPY[sp.error] ?? null) : null;

  return (
    <main className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-ink">
      <AuroraBg variant="subtle" />
      <div className="noise" />

      <div className="relative z-10 container-site py-20 md:py-28">
        <div className="mx-auto w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 hover:text-pearl transition-colors mb-10"
          >
            <ArrowLeft size={12} aria-hidden="true" />
            Terug naar de site
          </Link>

          <div className="rounded-2xl glass-strong p-8 md:p-10">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-terracotta" />
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-terracotta">
                  NBCM · Dashboard
                </span>
              </div>
              <h1 className="mt-6 font-heading text-3xl md:text-4xl font-semibold text-pearl tracking-[-0.03em] leading-tight">
                Inloggen.
              </h1>
              <p className="mt-3 text-sm text-pearl-80 leading-relaxed">
                Alleen voor bestuursleden en ontwikkelaars. Geen account?
                Neem contact op met het bestuur.
              </p>
            </div>

            <LoginForm initialError={initialError} />
          </div>
        </div>
      </div>
    </main>
  );
}
