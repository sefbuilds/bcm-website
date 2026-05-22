"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { ImageUpload } from "../ImageUpload";
import {
  createPartnerAction,
  updatePartnerAction,
  deletePartnerAction,
  type PartnerInput,
} from "./actions";

type Props = {
  mode: "new" | "edit";
  partnerId?: string;
  initial?: Partial<PartnerInput>;
};

const EMPTY: PartnerInput = {
  name: "",
  tier: "partner",
  website: "",
  logo_url: "",
  is_active: true,
  sort_order: 0,
};

export default function PartnerForm({ mode, partnerId, initial }: Props) {
  const [state, setState] = useState<PartnerInput>({ ...EMPTY, ...initial });
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDelete] = useTransition();

  const update = <K extends keyof PartnerInput>(
    key: K,
    value: PartnerInput[K],
  ) => setState((s) => ({ ...s, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res =
        mode === "edit" && partnerId
          ? await updatePartnerAction(partnerId, state)
          : await createPartnerAction(state);
      if (res && !res.ok) setError(res.error);
    });
  };

  const handleDelete = () => {
    if (!partnerId) return;
    const sure = window.confirm(
      `Verwijder "${state.name}" uit partners?`,
    );
    if (!sure) return;
    setError(null);
    startDelete(async () => {
      const res = await deletePartnerAction(partnerId);
      if (res && !res.ok) setError(res.error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Link
          href="/dashboard/partners"
          className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.24em] uppercase text-pearl-60 hover:text-pearl"
        >
          <ArrowLeft size={12} />
          Terug naar partners
        </Link>
      </div>

      <div className="rounded-2xl hairline bg-ink-2 p-6 md:p-8 space-y-5">
        <Field
          label="Naam *"
          value={state.name}
          onChange={(v) => update("name", v)}
          required
          placeholder="Nordico Fiscal Advisors"
        />

        <div>
          <label className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2">
            Tier *
          </label>
          <div className="grid grid-cols-2 gap-2">
            <TierOption
              active={state.tier === "partner"}
              onClick={() => update("tier", "partner")}
              title="Partner"
              hint="Zakelijke samenwerking, zichtbaar als partner-tegel"
            />
            <TierOption
              active={state.tier === "vriend"}
              onClick={() => update("tier", "vriend")}
              title="Vriend"
              hint="Vriend van de club, wordt als naam-lijst getoond"
            />
          </div>
        </div>

        <Field
          label="Website"
          type="url"
          value={state.website}
          onChange={(v) => update("website", v)}
          placeholder="https://partner.com"
        />

        <ImageUpload
          label="Logo"
          hint="JPEG, PNG of WebP. Max 6MB. Wordt getoond op /sponsors."
          folder="partners"
          value={state.logo_url}
          onChange={(v) => update("logo_url", v)}
          shape="landscape"
        />
      </div>

      <div className="rounded-2xl hairline bg-ink-2 p-6 md:p-8 space-y-5">
        <h3 className="text-[10px] font-medium tracking-[0.24em] uppercase text-pearl-60">
          Publicatie
        </h3>
        <Toggle
          label="Actief"
          hint="Uit = niet zichtbaar op /sponsors of in de banner"
          value={state.is_active}
          onChange={(v) => update("is_active", v)}
        />
        <Field
          label="Sorteer-volgorde"
          type="number"
          hint="Lagere waarden komen eerder in de lijst"
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
            href="/dashboard/partners"
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
                : "Partner aanmaken"}
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

function TierOption({
  active,
  onClick,
  title,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-lg hairline px-4 py-3 transition-colors ${
        active
          ? "bg-gold/15 border-gold/40"
          : "bg-ink hover:border-pearl/30"
      }`}
    >
      <div className="text-sm font-medium text-pearl">{title}</div>
      <div className="text-[11px] text-pearl-60 mt-0.5">{hint}</div>
    </button>
  );
}
