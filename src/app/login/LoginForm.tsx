"use client";

import { useState, useTransition, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { requestMagicLinkAction } from "./actions";

type Props = {
  initialError?: string | null;
};

export default function LoginForm({ initialError = null }: Props) {
  const [error, setError] = useState<string | null>(initialError);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    startTransition(async () => {
      const result = await requestMagicLinkAction(formData);
      if (result.ok) {
        setSubmittedEmail(email);
      } else {
        setError(result.error);
      }
    });
  };

  if (submittedEmail) {
    return (
      <div className="rounded-xl border border-olive/40 bg-olive/10 p-6 text-center space-y-3">
        <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-olive/20 text-olive">
          <Mail size={18} aria-hidden="true" />
        </div>
        <h2 className="font-heading text-xl font-semibold text-pearl">
          Check je inbox
        </h2>
        <p className="text-sm text-pearl-80 leading-relaxed">
          Als <span className="text-pearl font-medium">{submittedEmail}</span>{" "}
          een dashboard-account heeft, vind je een login-link in je inbox.
          De link is 60 minuten geldig.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmittedEmail(null);
            setError(null);
          }}
          className="text-xs text-pearl-60 hover:text-pearl transition-colors underline"
        >
          Ander e-mailadres proberen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2"
        >
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          className="w-full rounded-xl glass px-4 py-3 text-pearl placeholder:text-pearl-60/60 focus:border-terracotta focus:outline-none transition-colors"
          placeholder="jij@nbcmallorca.com"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-terracotta-dark"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-white font-medium transition-all hover:bg-terracotta-light hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
      >
        {pending ? "Bezig..." : "Stuur login-link"}
        {!pending && <ArrowRight size={16} aria-hidden="true" />}
      </button>

      <p className="text-center text-[11px] text-pearl-60">
        Geen wachtwoord nodig — we sturen een eenmalige link naar je e-mail.
      </p>
    </form>
  );
}
