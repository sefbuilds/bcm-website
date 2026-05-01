import { getSponsors, getPartners } from "@/lib/data";

/**
 * Edge-to-edge ticker met partners + sponsors, op ocean.
 * Dubbelt de items voor naadloze loop.
 */
export default async function PartnerTicker() {
  const [sponsors, partners] = await Promise.all([
    getSponsors(),
    getPartners(),
  ]);

  const items = [
    ...sponsors.map((s) => s.company),
    ...partners.map((p) => p.name),
  ];

  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <section
      className="bg-ocean border-y border-sunset/20 overflow-hidden py-4 whitespace-nowrap"
      aria-label="Partners en sponsors"
    >
      <div className="inline-flex gap-16 animate-ticker">
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="font-heading italic font-light text-base text-warm-text/65 inline-flex items-center gap-3"
          >
            <span className="text-sunset text-[0.6rem]">◆</span>
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
