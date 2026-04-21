import Link from "next/link";
import { Mail, Phone, MapPin, Building2, Globe, X } from "lucide-react";
import {
  INTAKE_FIELDS,
  labelForValue,
  type IntakeField,
} from "@/lib/intake-schema";
import ConvertButtons from "./ConvertButtons";

type Intake = {
  id: string;
  created_at: string;
  role: "lid" | "bestuur";
  tier: "member" | "partner" | "sponsor" | null;
  voornaam: string;
  achternaam: string | null;
  email: string;
  telefoon: string | null;
  woonplaats: string | null;
  bedrijf: string | null;
  website: string | null;
  fase: string | null;
  data: Record<string, unknown>;
};

function formatFullDate(iso: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  }).format(new Date(iso));
}

function Empty() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center h-full min-h-[400px] rounded-2xl hairline bg-ink-2 p-10 text-center">
      <div className="text-[10px] tracking-[0.24em] uppercase text-pearl-60">
        Intake
      </div>
      <p className="mt-4 text-pearl-80">
        Kies een intake uit de lijst om de volledige antwoorden te bekijken.
      </p>
    </div>
  );
}

export default function IntakeDetail({ intake }: { intake: Intake | null }) {
  if (!intake) return <Empty />;

  // Group fields by block, filter fields relevant to this role, and only
  // render when a value is present.
  const blocks = INTAKE_FIELDS.filter(
    (f) => !f.roles || f.roles.includes(intake.role),
  ).reduce<Record<number, { title: string; items: { field: IntakeField; value: unknown }[] }>>(
    (acc, field) => {
      const value =
        field.key === "fase" ? intake.fase : intake.data?.[field.key];
      const resolved = labelForValue(field, value);
      if (resolved == null || (Array.isArray(resolved) && resolved.length === 0))
        return acc;
      if (!acc[field.block]) {
        acc[field.block] = { title: field.blockTitle, items: [] };
      }
      acc[field.block].items.push({ field, value });
      return acc;
    },
    {},
  );

  const orderedBlocks = Object.entries(blocks).sort(
    ([a], [b]) => Number(a) - Number(b),
  );

  const fullName = [intake.voornaam, intake.achternaam]
    .filter(Boolean)
    .join(" ");

  return (
    <article className="relative rounded-2xl hairline bg-ink-2 overflow-hidden">
      <Link
        href="/dashboard/intakes"
        className="lg:hidden absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full glass text-pearl-60 hover:text-pearl transition-colors"
        aria-label="Sluit"
      >
        <X size={14} />
      </Link>

      <header className="p-6 md:p-8 hairline-b">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-[0.2em] uppercase ${
              intake.role === "bestuur"
                ? "bg-navy/50 text-pearl"
                : "bg-pearl/10 text-pearl-80"
            }`}
          >
            {intake.role}
          </span>
          {intake.tier && (
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-[0.2em] uppercase ${
                intake.tier === "sponsor"
                  ? "bg-navy/50 text-pearl"
                  : intake.tier === "partner"
                    ? "bg-gold/20 text-gold"
                    : "bg-terracotta/15 text-terracotta"
              }`}
            >
              {intake.tier}
            </span>
          )}
          <span className="text-[11px] text-pearl-60 ml-auto">
            {formatFullDate(intake.created_at)}
          </span>
        </div>

        <h2 className="mt-5 font-heading text-2xl md:text-3xl font-semibold text-pearl tracking-[-0.02em]">
          {fullName}
        </h2>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2 text-sm">
          <InfoRow
            icon={<Mail size={13} />}
            label="E-mail"
            value={
              <a
                href={`mailto:${intake.email}`}
                className="text-terracotta hover:text-terracotta-light break-all"
              >
                {intake.email}
              </a>
            }
          />
          {intake.telefoon && (
            <InfoRow
              icon={<Phone size={13} />}
              label="Telefoon"
              value={
                <a
                  href={`tel:${intake.telefoon.replace(/\s+/g, "")}`}
                  className="text-pearl hover:text-terracotta"
                >
                  {intake.telefoon}
                </a>
              }
            />
          )}
          {intake.bedrijf && (
            <InfoRow
              icon={<Building2 size={13} />}
              label="Bedrijf"
              value={<span className="text-pearl">{intake.bedrijf}</span>}
            />
          )}
          {intake.woonplaats && (
            <InfoRow
              icon={<MapPin size={13} />}
              label="Regio"
              value={<span className="text-pearl">{intake.woonplaats}</span>}
            />
          )}
          {intake.website && (
            <InfoRow
              icon={<Globe size={13} />}
              label="Website"
              value={
                <a
                  href={
                    intake.website.startsWith("http")
                      ? intake.website
                      : `https://${intake.website}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-terracotta hover:text-terracotta-light break-all"
                >
                  {intake.website.replace(/^https?:\/\//, "")}
                </a>
              }
            />
          )}
        </dl>

        <div className="mt-6 pt-5 hairline-t">
          <ConvertButtons intakeId={intake.id} />
        </div>
      </header>

      <div className="p-6 md:p-8 space-y-10">
        {orderedBlocks.length === 0 ? (
          <p className="text-sm text-pearl-60">
            Deze intake heeft geen extra antwoorden ingevuld.
          </p>
        ) : (
          orderedBlocks.map(([blockNum, block]) => (
            <section key={blockNum}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-medium tracking-[0.24em] uppercase text-terracotta">
                  Blok {blockNum} · {block.title}
                </span>
                <span className="flex-1 h-px bg-hairline" />
              </div>
              <div className="space-y-5">
                {block.items.map(({ field, value }) => (
                  <Answer key={field.key} field={field} value={value} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </article>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-1 text-pearl-60 shrink-0">{icon}</span>
      <div className="min-w-0">
        <dt className="text-[10px] tracking-[0.24em] uppercase text-pearl-60">
          {label}
        </dt>
        <dd className="mt-1">{value}</dd>
      </div>
    </div>
  );
}

function Answer({
  field,
  value,
}: {
  field: IntakeField;
  value: unknown;
}) {
  const resolved = labelForValue(field, value);
  if (resolved == null) return null;

  return (
    <div>
      <div className="text-sm font-medium text-pearl">{field.question}</div>
      <div className="mt-2">
        {field.type === "text" && typeof resolved === "string" && (
          <p className="text-sm text-pearl-80 leading-relaxed whitespace-pre-wrap">
            {resolved}
          </p>
        )}
        {field.type === "single" && typeof resolved === "string" && (
          <span className="inline-flex rounded-md hairline bg-ink px-3 py-1.5 text-xs text-pearl">
            {resolved}
          </span>
        )}
        {field.type === "multi" && Array.isArray(resolved) && (
          <div className="flex flex-wrap gap-1.5">
            {(resolved as string[]).map((v, i) => (
              <span
                key={`${v}-${i}`}
                className="inline-flex rounded-md hairline bg-ink px-3 py-1.5 text-xs text-pearl"
              >
                {v}
              </span>
            ))}
          </div>
        )}
        {field.type === "rank" &&
          Array.isArray(resolved) &&
          typeof resolved[0] === "object" && (
            <ol className="space-y-1.5">
              {(resolved as { item: string; rank: number }[]).map((r) => (
                <li
                  key={r.item}
                  className="flex items-center gap-3 rounded-md hairline bg-ink px-3 py-2 text-sm"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-terracotta/15 text-terracotta text-xs font-semibold">
                    {r.rank}
                  </span>
                  <span className="text-pearl">{r.item}</span>
                </li>
              ))}
            </ol>
          )}
      </div>
    </div>
  );
}
