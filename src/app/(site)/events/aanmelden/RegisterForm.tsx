"use client";

import { useState, useTransition, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { COUNTRY_CODES } from "@/lib/constants";
import { registerForEvent } from "./actions";
import type { DBEvent } from "@/lib/data";

type Props = {
  events: Pick<DBEvent, "id" | "slug" | "title" | "start_at" | "location">[];
  preselectedSlug?: string;
};

export default function RegisterForm({ events, preselectedSlug }: Props) {
  const initialEvent =
    events.find((e) => e.slug === preselectedSlug) ?? events[0] ?? null;

  const [eventId, setEventId] = useState<string>(initialEvent?.id ?? "");
  const [dialCode, setDialCode] = useState("34");
  const [guests, setGuests] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    if (!eventId) {
      setError("Kies eerst een event.");
      return;
    }
    startTransition(async () => {
      const res = await registerForEvent({
        event_id: eventId,
        voornaam: String(fd.get("voornaam") ?? "").trim(),
        achternaam: String(fd.get("achternaam") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim(),
        dial_code: dialCode,
        telefoon: String(fd.get("telefoon") ?? "").trim(),
        bedrijf: String(fd.get("bedrijf") ?? "").trim(),
        guests,
        dietary: String(fd.get("dietary") ?? "").trim(),
        notes: String(fd.get("notes") ?? "").trim(),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(res.error);
      }
    });
  };

  if (events.length === 0) {
    return (
      <div className="rounded-2xl glass p-10 text-center text-pearl-80">
        Er zijn op dit moment geen events geopend voor aanmelding. Kom
        binnenkort terug of mail ons.
      </div>
    );
  }

  if (submitted) {
    const ev = events.find((e) => e.id === eventId);
    return (
      <div className="rounded-2xl glass-strong p-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-olive/15 text-olive mx-auto">
          <Check size={22} aria-hidden="true" />
        </div>
        <h2 className="mt-6 font-heading text-3xl font-semibold text-pearl tracking-[-0.02em]">
          Je staat op de lijst.
        </h2>
        <p className="mt-4 text-pearl-80 max-w-md mx-auto">
          Bedankt voor je aanmelding{ev ? ` voor ${ev.title}` : ""}. Je
          ontvangt binnenkort een bevestiging met alle details.
        </p>
        <p className="mt-8 text-xs tracking-[0.24em] uppercase text-pearl-60">
          Tot snel op Mallorca
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {events.length > 1 && (
        <div>
          <label
            htmlFor="event"
            className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2"
          >
            Event
          </label>
          <select
            id="event"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full rounded-xl glass px-4 py-3 text-pearl focus:border-terracotta focus:outline-none transition-colors appearance-none"
          >
            {events.map((ev) => (
              <option key={ev.id} value={ev.id} className="bg-ink">
                {ev.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="voornaam" label="Voornaam" required />
        <Field name="achternaam" label="Achternaam" />
      </div>

      <Field name="email" label="E-mail" type="email" required />

      <div>
        <label
          htmlFor="telefoon"
          className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2"
        >
          Telefoon / WhatsApp
        </label>
        <div className="flex gap-2">
          <select
            value={dialCode}
            onChange={(e) => setDialCode(e.target.value)}
            className="rounded-xl glass px-3 py-3 text-pearl focus:border-terracotta focus:outline-none transition-colors appearance-none w-28 shrink-0"
            aria-label="Landcode"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.iso} value={c.code} className="bg-ink">
                {c.flag} +{c.code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="telefoon"
            name="telefoon"
            placeholder="6 12 34 56 78"
            className="flex-1 rounded-xl glass px-4 py-3 text-pearl placeholder:text-pearl-60/60 focus:border-terracotta focus:outline-none transition-colors"
          />
        </div>
      </div>

      <Field name="bedrijf" label="Bedrijfsnaam" />

      <div>
        <label className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2">
          Aantal extra gasten
        </label>
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setGuests(n)}
              className={`h-10 w-12 rounded-lg border text-sm font-medium transition-colors ${
                guests === n
                  ? "border-terracotta bg-terracotta/15 text-terracotta"
                  : "border-hairline text-pearl-80 hover:text-pearl hover:border-pearl/40"
              }`}
            >
              {n === 0 ? "Alleen" : `+${n}`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="dietary"
          className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2"
        >
          Dieet of allergieën
        </label>
        <input
          type="text"
          id="dietary"
          name="dietary"
          placeholder="Vegetarisch, glutenvrij, ..."
          className="w-full rounded-xl glass px-4 py-3 text-pearl placeholder:text-pearl-60/60 focus:border-terracotta focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2"
        >
          Opmerking (optioneel)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
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
        className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-4 text-white font-medium transition-all hover:bg-terracotta-light hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
      >
        {pending ? "Aanmelden..." : "Bevestig aanmelding"}
        {!pending && <ArrowUpRight size={16} aria-hidden="true" />}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2"
      >
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        className="w-full rounded-xl glass px-4 py-3 text-pearl placeholder:text-pearl-60/60 focus:border-terracotta focus:outline-none transition-colors"
      />
    </div>
  );
}
