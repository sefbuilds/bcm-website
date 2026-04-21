"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { EVENT_TAGS } from "@/lib/constants";
import { ImageUpload, MultiImageUpload } from "../ImageUpload";
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
  const [photosArr, setPhotosArr] = useState<string[]>(
    () => initial?.photos_array ?? [],
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDelete] = useTransition();

  const update = <K extends keyof EventInput>(key: K, value: EventInput[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const payload: EventInput = {
      ...state,
      photos: photosArr.join("\n"),
    };
    startTransition(async () => {
      const res =
        mode === "edit" && eventId
          ? await updateEventAction(eventId, payload)
          : await createEventAction(payload);
      if (res && !res.ok) setError(res.error);
    });
  };

  const handleDelete = () => {
    if (!eventId) return;
    const sure = window.confirm(
      `Weet je zeker dat je "${state.title}" wilt verwijderen? Registraties worden ook verwijderd.`,
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
      <div>
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
          <div>
            <label className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2">
              Tag
            </label>
            <select
              value={state.tag}
              onChange={(e) => update("tag", e.target.value)}
              className="w-full rounded-lg hairline bg-ink px-4 py-2.5 text-sm text-pearl focus:border-terracotta focus:outline-none transition-colors"
            >
              <option value="">— geen —</option>
              {EVENT_TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
              {state.tag &&
                !EVENT_TAGS.includes(
                  state.tag as (typeof EVENT_TAGS)[number],
                ) && <option value={state.tag}>{state.tag}</option>}
            </select>
          </div>
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

        {mode === "edit" && (
          <p className="text-[11px] text-pearl-60">
            Slug (URL): <span className="font-mono text-pearl">{state.slug}</span>
          </p>
        )}
      </div>

      <div className="rounded-2xl hairline bg-ink-2 p-6 md:p-8 space-y-6">
        <h3 className="text-[10px] font-medium tracking-[0.24em] uppercase text-pearl-60">
          Visueel
        </h3>
        <ImageUpload
          label="Hero image"
          hint="JPEG, PNG of WebP. Max 6MB. Wordt gebruikt als achtergrond op homepage en /events."
          folder="events/hero"
          value={state.hero_image}
          onChange={(v) => update("hero_image", v)}
          shape="landscape"
        />

        <MultiImageUpload
          label="Foto's"
          hint="Sfeerbeelden voor het RecentEvent-grid. Sleep-volgorde op hover."
          folder="events/photos"
          value={photosArr}
          onChange={setPhotosArr}
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
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
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
        className="w-full rounded-lg hairline bg-ink px-4 py-2.5 text-sm text-pearl placeholder:text-pearl-60/60 focus:border-terracotta focus:outline-none transition-colors"
      />
      {hint && <p className="mt-1.5 text-[11px] text-pearl-60">{hint}</p>}
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
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
        className="w-full rounded-lg hairline bg-ink px-4 py-2.5 text-sm text-pearl placeholder:text-pearl-60/60 focus:border-terracotta focus:outline-none transition-colors resize-y"
      />
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
