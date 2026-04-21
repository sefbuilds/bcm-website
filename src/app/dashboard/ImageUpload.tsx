"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent } from "react";
import { Upload, X, Image as ImageIcon, Plus } from "lucide-react";

type SingleProps = {
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
  folder: string;
  required?: boolean;
  shape?: "square" | "circle" | "landscape";
};

async function uploadOne(file: File, folder: string): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const body = (await res.json()) as { url?: string; error?: string };
  if (!res.ok || !body.url) {
    throw new Error(body.error ?? "Upload mislukt.");
  }
  return body.url;
}

function isPreviewable(url: string) {
  return (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://")
  );
}

export function ImageUpload({
  label,
  hint,
  value,
  onChange,
  folder,
  required,
  shape = "square",
}: SingleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const url = await uploadOne(file, folder);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload mislukt.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const preview = isPreviewable(value) && value ? value : null;

  const sizeClass =
    shape === "circle"
      ? "h-20 w-20 rounded-full"
      : shape === "landscape"
        ? "h-32 w-full max-w-[280px] rounded-lg"
        : "h-24 w-24 rounded-lg";

  return (
    <div>
      <label className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60 mb-2">
        {label}
        {required ? " *" : ""}
      </label>

      <div className="flex items-center gap-4">
        <div
          className={`${sizeClass} shrink-0 relative overflow-hidden hairline bg-ink flex items-center justify-center`}
        >
          {preview ? (
            <Image
              src={preview}
              alt=""
              fill
              sizes="150px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <ImageIcon size={18} className="text-pearl-60" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3 py-1.5 text-xs text-pearl-80 hover:text-pearl hover:border-pearl/30 disabled:opacity-60 transition-colors"
            >
              <Upload size={12} />
              {uploading
                ? "Uploaden..."
                : value
                  ? "Vervang"
                  : "Kies bestand"}
            </button>
            {value && !uploading && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3 py-1.5 text-xs text-pearl-60 hover:text-terracotta hover:border-terracotta/40 transition-colors"
              >
                <X size={12} />
                Verwijderen
              </button>
            )}
          </div>
          {hint && <p className="mt-2 text-[11px] text-pearl-60">{hint}</p>}
          {error && (
            <p className="mt-2 text-[11px] text-terracotta">{error}</p>
          )}
          {value && (
            <p className="mt-2 text-[10px] text-pearl-60 font-mono break-all">
              {value}
            </p>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={onFile}
      />
    </div>
  );
}

type MultiProps = {
  label: string;
  hint?: string;
  value: string[];
  onChange: (urls: string[]) => void;
  folder: string;
};

export function MultiImageUpload({
  label,
  hint,
  value,
  onChange,
  folder,
}: MultiProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const onFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setError(null);
    setUploading(true);
    setProgress({ done: 0, total: files.length });
    const uploaded: string[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await uploadOne(files[i], folder);
        uploaded.push(url);
        setProgress({ done: i + 1, total: files.length });
      }
      onChange([...value, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload mislukt.");
      if (uploaded.length > 0) onChange([...value, ...uploaded]);
    } finally {
      setUploading(false);
      setProgress(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = (idx: number) => {
    const next = value.filter((_, i) => i !== idx);
    onChange(next);
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...value];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <label className="block text-[11px] font-medium tracking-[0.24em] uppercase text-pearl-60">
          {label}
        </label>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3 py-1.5 text-xs text-pearl-80 hover:text-pearl hover:border-pearl/30 disabled:opacity-60 transition-colors"
        >
          <Plus size={12} />
          {uploading
            ? `Uploaden... ${progress?.done ?? 0}/${progress?.total ?? ""}`
            : "Foto's toevoegen"}
        </button>
      </div>

      {hint && <p className="text-[11px] text-pearl-60 mb-3">{hint}</p>}
      {error && <p className="text-[11px] text-terracotta mb-3">{error}</p>}

      {value.length === 0 ? (
        <div className="rounded-lg hairline bg-ink p-8 text-center text-sm text-pearl-60">
          Nog geen foto&apos;s toegevoegd.
        </div>
      ) : (
        <ul className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {value.map((url, i) => (
            <li
              key={`${url}-${i}`}
              className="relative group rounded-lg overflow-hidden hairline aspect-square"
            >
              <Image
                src={url}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/60 transition-colors" />
              <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-ink/90 text-pearl text-xs disabled:opacity-30"
                    aria-label="Omhoog"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === value.length - 1}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-ink/90 text-pearl text-xs disabled:opacity-30"
                    aria-label="Omlaag"
                  >
                    →
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-terracotta text-white"
                  aria-label="Verwijder"
                >
                  <X size={12} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={onFiles}
      />
    </div>
  );
}
