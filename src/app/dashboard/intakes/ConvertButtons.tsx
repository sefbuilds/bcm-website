"use client";

import { useState, useTransition } from "react";
import { UserPlus, ShieldCheck } from "lucide-react";
import {
  convertIntakeToMemberAction,
  convertIntakeToAdminAction,
} from "./actions";

type Props = {
  intakeId: string;
};

type Result =
  | { kind: "member"; memberId: string }
  | { kind: "admin"; tempPassword: string }
  | { kind: "error"; error: string };

export default function ConvertButtons({ intakeId }: Props) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<Result | null>(null);

  const handleToMember = () => {
    if (!window.confirm("Dit lid toevoegen aan de ledenlijst?")) return;
    setResult(null);
    startTransition(async () => {
      const res = await convertIntakeToMemberAction(intakeId);
      if (res.ok && "memberId" in res) {
        setResult({ kind: "member", memberId: res.memberId });
      } else if (!res.ok) {
        setResult({ kind: "error", error: res.error });
      }
    });
  };

  const handleToAdmin = () => {
    if (
      !window.confirm(
        "Bestuurslid aanmaken? Er wordt een auth-account gemaakt met een tijdelijk wachtwoord dat je daarna moet delen.",
      )
    )
      return;
    setResult(null);
    startTransition(async () => {
      const res = await convertIntakeToAdminAction(intakeId);
      if (res.ok && "tempPassword" in res) {
        setResult({ kind: "admin", tempPassword: res.tempPassword });
      } else if (!res.ok) {
        setResult({ kind: "error", error: res.error });
      }
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleToMember}
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-full bg-terracotta px-4 py-2 text-xs font-medium text-white hover:bg-terracotta-light disabled:opacity-60 transition-all"
        >
          <UserPlus size={12} />
          Maak lid
        </button>
        <button
          type="button"
          onClick={handleToAdmin}
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-xs font-medium text-white hover:bg-navy-2 disabled:opacity-60 transition-all"
        >
          <ShieldCheck size={12} />
          Maak bestuurslid
        </button>
      </div>

      {pending && (
        <p className="text-xs text-pearl-60">Even geduld...</p>
      )}

      {result?.kind === "member" && (
        <div className="rounded-lg border border-olive/40 bg-olive/10 px-4 py-3 text-xs text-pearl">
          ✓ Lid aangemaakt. Verschijnt binnen 60s op de site.
        </div>
      )}

      {result?.kind === "admin" && (
        <div className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-xs text-pearl space-y-2">
          <p className="font-medium">✓ Bestuurslid aangemaakt.</p>
          <p>
            Deel dit tijdelijke wachtwoord via een beveiligd kanaal —
            hierna is het niet meer zichtbaar:
          </p>
          <code className="block rounded bg-ink px-3 py-2 font-mono text-[13px] text-gold select-all">
            {result.tempPassword}
          </code>
        </div>
      )}

      {result?.kind === "error" && (
        <div className="rounded-lg border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-xs text-terracotta">
          {result.error}
        </div>
      )}
    </div>
  );
}
