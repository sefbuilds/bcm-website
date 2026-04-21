"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import {
  createEventAction,
  updateEventAction,
  deleteEventAction,
  type EventInput,
} from "./actions";

type Props = {
  mode: "new" | "edit";
  eventId?: string;
  initial?: Partial<EventInput> & { photos_array?: string[] };
};

const EMPTY: EventInput = {
  slug: "",
  title: "",
  description: "",
  location: "",
  start_at_local: "",
  end_at_local: "",
  tag: "",
  hero_image: "",
  photos: "",
  is_featured: false,
  is_published: true,
  max_attendees: null,
  sort_order: 0,
};

export default function EventForm({ mode, eventId, initial }: Props) {
  const [state, setState] = useState<EventInput>(() => ({
    ...EMPTY,
    ...initial,
    photos: initial?.photos ?? initial?.photos_array?.join("\n") ?? "",
  }));
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDelete] = useTransition();

  const update = <K extends keyof EventInput>(
    key: K,
    value: EventInput[K],
  ) => {
    setState((s) => ({ ...s, [key]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res =
        mode === "edit" && eventId
          ? await updateEventAction(eventId, state)
          : await createEventAction(state);
      if (res && !res.ok) setError(res.error);
    });
  };

  const handleDelete = () => {
    if (!eventId) return;
    const sure = window.confirm(
      `Weet je zeker dat je "${state.title}" wilt verwijderen? Registraties voor dit event worden ook verwijderd.`,
    );
    if (!sure) return;
    setError(null);
    startDelete(async () => {
      const res = await deleteEventAction(eventId);
      if (res && !res.ok) setError(res.error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/events"
          className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.24em] uppercase text-pearl-60 hover:text-pearl"
        >
          <ArrowLeft size={12} />
          Terug naar events
        </Link>
      </div>

      <div className="rounded-2xl hairline bg-ink-2 p-6 md:p-8 space-y-5">
        <Field
          label="Titel *"
          value={state.title}
          onChange={(v) => update("title", v)}
          required
        />
        <Field
          label="Slug"
          hint="Wordt automatisch gegenereerd uit de titel als je dit leeg laat. Alleen letters, cijfers en streepjes."
          value={state.slug}
          onChange={(v) => update("slug", v)}
          placeholder="koningsdag-bij-santina-2026"
          monospace
        />
        <Textarea
          label="Omschrijving"
          value={state.description}
          onChange={(v) => update("description", v)}
          rows={4}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Locatie"
            value={state.location}
            onChange={(v) => update("location", v)}
            placeholder="Santina, Mallorca"
          />
          <Field
            label="Tag"
            value={state.tag}
            onChange={(v) => update("tag", v)}
            placeholder="Sociaal · Business · Bestuur"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Start (Madrid) *"
            type="datetime-local"
            value={state.start_at_local}
            onChange={(v) => update("start_at_local", v)}
            required
          />
          <Field
            label="Einde (Madrid)"
            type="datetime-local"
            value={state.end_at_local}
            onChange={(v) => update("end_at_local", v)}
          />
        </div>
      </div>

      <div className="rounded-2xl hairline bg-ink-2 p-6 md:p-8 space-y-5">
        <h3 className="text-[10px] font-medium tracking-[0.24em] uppercase text-pearl-60">
          Visueel
        </h3>
        <Field
          label="Hero image URL of pad"
          hint="Bijvoorbeeld: /events/koningsdag-2026/hero.jpg of een https:// URL"
          value={state.hero_image}
          onChange={(v) => update("hero_image", v)}
          placeholder="/events/slug/hero.jpg"
          monospace
        />
        <Textarea
          label="Foto's"
          hint="Één pad per regel (of komma-gescheiden). Worden getoond in het RecentEvent-grid als dit event een past-event is."
          value={state.photos}
          onChange={(v) => update("photos", v)}
          rows={4}
          mono
        />
      </div>

      <div className="rounded-2xl hairline bg-ink-2 p-6 md:p-8 space-y-5">
        <h3 className="text-[10px] font-medium tracking-[0.24em] uppercase text-pearl-60">
          Publicatie
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Toggle
            label="Gepubliceerd"
            hint="Uit = concept, niet zichtbaar op de site"
            value={state.is_published}
            onChange={(v) => update("is_published", v)}
          />
          <Toggle
            label="Featured"
            hint="Voor later gebruik — highlight op homepage"
            value={state.is_featured}
            onChange={(v) => update("is_featured", v)}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Maximum aantal aanmeldingen"
            type="number"
            value={state.max_attendees?.toString() ?? ""}
            onChange={(v) =>
              update(
                "max_attendees",
                v ? Math.max(0, parseInt(v, 10) || 0) : null,
              )
            }
            placeholder="Leeg = onbeperkt"
          />
          <Field
            label="Sorteer-volgorde"
            type="number"
            hint="Hoger = vroeger in lijsten (zelden nodig, we sorteren op datum)"
            value={state.sort_order.toString()}
            onChange={(v) => update("sort_order", parseInt(v, 10) || 0)}
          />
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-4">
        {mode === "edit" ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deletePending || pending}
            className="inline-flex items-center gap-2 rounded-full border border-terracotta/40 px-5 py-2.5 text-sm text-terracotta hover:bg-terracotta/10 transition-colors disabled:opacity-60"
          >
            <Trash2 size={14} />
            {deletePending ? "Verwijderen..." : "Verwijderen"}
          </button>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/events"
            className="inline-flex items-center rounded-full border border-hairline px-5 py-2.5 text-sm text-pearl-80 hover:text-pearl"
          >
            Annuleren
          </Link>
          <button
            type="submit"
            disabled={pending || deletePending}
            className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-2.5 text-sm font-medium text-white hover:bg-terracotta-light disabled:opacity-60 transition-all"
          >
            <Save size={14} />
            {pending
              ? "Opslaan..."
              : mode === "edit"
                ? "Opslaan"
                : "Event aanmaken"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  monospace,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  monospace?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-lg hairline bg-ink px-4 py-2.5 text-pearl placeholder:text-pearl-60/60 focus:border-terracotta focus:outline-none transition-colors ${
          monospace ? "font-mono text-[13px]" : "text-sm"
        }`}
      />
      {hint && <p className="mt-1.5 text-[11px] text-pearl-60">{hint}</p>}
    </div>
  );
}

function Textarea({
  label,
  hint,
  value,
  onChange,
  rows = 3,
  mono,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`w-full rounded-lg hairline bg-ink px-4 py-2.5 text-pearl placeholder:text-pearl-60/60 focus:border-terracotta focus:outline-none transition-colors resize-y ${
          mono ? "font-mono text-[13px]" : "text-sm"
        }`}
      />
      {hint && <p className="mt-1.5 text-[11px] text-pearl-60">{hint}</p>}
    </div>
  );
}

function Toggle({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-lg hairline px-4 py-3 cursor-pointer transition-colors ${
        value ? "bg-terracotta/10 border-terracotta/40" : "bg-ink"
      }`}
    >
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 accent-terracotta"
      />
      <div>
        <div className="text-sm font-medium text-pearl">{label}</div>
        {hint && <div className="text-[11px] text-pearl-60 mt-0.5">{hint}</div>}
      </div>
    </label>
  );
}
