"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { MALLORCA_REGIONS } from "@/lib/constants";
import {
  createMemberAction,
  updateMemberAction,
  deleteMemberAction,
  type MemberInput,
} from "./actions";
import { autoInitials } from "./initials";

type Props = {
  mode: "new" | "edit";
  memberId?: string;
  initial?: Partial<MemberInput>;
};

const EMPTY: MemberInput = {
  name: "",
  initials: "",
  role: "",
  company: "",
  location: "",
  bio: "",
  image_url: "",
  website: "",
  linkedin: "",
  instagram: "",
  is_public: true,
  sort_order: 0,
};

export default function MemberForm({ mode, memberId, initial }: Props) {
  const [state, setState] = useState<MemberInput>({ ...EMPTY, ...initial });
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDelete] = useTransition();

  const update = <K extends keyof MemberInput>(key: K, value: MemberInput[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const onNameBlur = () => {
    if (!state.initials.trim() && state.name.trim()) {
      update("initials", autoInitials(state.name));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res =
        mode === "edit" && memberId
          ? await updateMemberAction(memberId, state)
          : await createMemberAction(state);
      if (res && !res.ok) setError(res.error);
    });
  };

  const handleDelete = () => {
    if (!memberId) return;
    const sure = window.confirm(
      `Verwijder "${state.name}" uit de ledenlijst?`,
    );
    if (!sure) return;
    setError(null);
    startDelete(async () => {
      const res = await deleteMemberAction(memberId);
      if (res && !res.ok) setError(res.error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Link
          href="/dashboard/leden"
          className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.24em] uppercase text-pearl-60 hover:text-pearl"
        >
          <ArrowLeft size={12} />
          Terug naar leden
        </Link>
      </div>

      <div className="rounded-2xl hairline bg-ink-2 p-6 md:p-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
          <Field
            label="Naam *"
            value={state.name}
            onChange={(v) => update("name", v)}
            onBlur={onNameBlur}
            required
            placeholder="Volledige naam"
          />
          <Field
            label="Initialen"
            hint="Automatisch afgeleid van naam als leeg"
            value={state.initials}
            onChange={(v) => update("initials", v.toUpperCase())}
            placeholder="SB"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Rol / beroep"
            value={state.role}
            onChange={(v) => update("role", v)}
            placeholder="Interieurontwerper"
          />
          <Field
            label="Bedrijf"
            value={state.company}
            onChange={(v) => update("company", v)}
            placeholder="Studio Van den Berg"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2">
            Locatie
          </label>
          <select
            value={state.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full rounded-lg hairline bg-ink px-4 py-2.5 text-sm text-pearl focus:border-terracotta focus:outline-none transition-colors"
          >
            <option value="">— geen —</option>
            {MALLORCA_REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
            {state.location &&
              !MALLORCA_REGIONS.includes(
                state.location as (typeof MALLORCA_REGIONS)[number],
              ) && <option value={state.location}>{state.location}</option>}
          </select>
        </div>

        <Textarea
          label="Bio"
          hint="Korte omschrijving — nog niet publiek getoond, handig voor eigen bestuurs-overzicht"
          value={state.bio}
          onChange={(v) => update("bio", v)}
          rows={3}
        />
      </div>

      <div className="rounded-2xl hairline bg-ink-2 p-6 md:p-8 space-y-5">
        <h3 className="text-[10px] font-medium tracking-[0.24em] uppercase text-pearl-60">
          Profiel &amp; links
        </h3>

        <Field
          label="Profielfoto (pad of URL)"
          hint="Bijv. /members/sophie.jpg of https://…"
          value={state.image_url}
          onChange={(v) => update("image_url", v)}
          placeholder="/members/sophie.jpg"
          monospace
        />

        <div className="grid gap-5 sm:grid-cols-3">
          <Field
            label="Website"
            value={state.website}
            onChange={(v) => update("website", v)}
            placeholder="https://..."
          />
          <Field
            label="LinkedIn"
            value={state.linkedin}
            onChange={(v) => update("linkedin", v)}
            placeholder="https://linkedin.com/in/..."
          />
          <Field
            label="Instagram"
            value={state.instagram}
            onChange={(v) => update("instagram", v)}
            placeholder="https://instagram.com/..."
          />
        </div>
      </div>

      <div className="rounded-2xl hairline bg-ink-2 p-6 md:p-8 space-y-5">
        <h3 className="text-[10px] font-medium tracking-[0.24em] uppercase text-pearl-60">
          Zichtbaarheid
        </h3>
        <Toggle
          label="Publiek zichtbaar"
          hint="Uit = alleen binnen dashboard, niet op /leden of homepage"
          value={state.is_public}
          onChange={(v) => update("is_public", v)}
        />
        <Field
          label="Sorteer-volgorde"
          type="number"
          hint="Lagere waarden verschijnen eerder op de ledenlijst"
          value={state.sort_order.toString()}
          onChange={(v) => update("sort_order", parseInt(v, 10) || 0)}
        />
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
            href="/dashboard/leden"
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
                : "Lid aanmaken"}
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
  onBlur,
  type = "text",
  placeholder,
  required,
  monospace,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
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
        onBlur={onBlur}
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
}: {
  label: string;
  hint?: string;
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
