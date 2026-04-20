"use client";

import { useState, useTransition, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { completeInviteAction } from "./actions";

export default function WelcomeForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await completeInviteAction(fd);
      if (res && !res.ok) setError(res.error);
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2"
        >
          Naam (optioneel)
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Volledige naam"
          className="w-full rounded-xl glass px-4 py-3 text-pearl placeholder:text-pearl-60/60 focus:border-terracotta focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2"
        >
          Kies een wachtwoord
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={10}
          className="w-full rounded-xl glass px-4 py-3 text-pearl placeholder:text-pearl-60/60 focus:border-terracotta focus:outline-none transition-colors"
        />
        <p className="mt-2 text-[11px] text-pearl-60">
          Minimaal 10 tekens.
        </p>
      </div>

      <div>
        <label
          htmlFor="confirm"
          className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2"
        >
          Herhaal wachtwoord
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={10}
          className="w-full rounded-xl glass px-4 py-3 text-pearl placeholder:text-pearl-60/60 focus:border-terracotta focus:outline-none transition-colors"
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
        {pending ? "Opslaan..." : "Open het dashboard"}
        {!pending && <ArrowUpRight size={16} aria-hidden="true" />}
      </button>
    </form>
  );
}
