"use client";

import { useState, useTransition, type FormEvent } from "react";
import { LogIn } from "lucide-react";
import { signInAction } from "./actions";

type Props = {
  initialError?: string | null;
};

export default function LoginForm({ initialError = null }: Props) {
  const [error, setError] = useState<string | null>(initialError);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await signInAction(formData);
      if (result && !result.ok) {
        setError(result.error);
      }
    });
  };

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
          placeholder="jij@nbcm.nl"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2"
        >
          Wachtwoord
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          required
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
        {pending ? "Inloggen..." : "Inloggen"}
        {!pending && <LogIn size={16} aria-hidden="true" />}
      </button>
    </form>
  );
}
