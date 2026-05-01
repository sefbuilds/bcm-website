import Link from "next/link";
import Image from "next/image";
import { getSponsors, getPartners } from "@/lib/data";
import Reveal from "./Reveal";

export default async function Sponsors() {
  const [hoofdsponsors, partners] = await Promise.all([
    getSponsors(),
    getPartners(),
  ]);

  const partnerCells = [
    ...hoofdsponsors.map((s) => ({
      key: `s-${s.id}`,
      badge: "Hoofdsponsor",
      name: s.company,
      person: s.name,
      website: s.website,
      logo: s.logo_url,
    })),
    ...partners
      .filter((p) => p.tier === "partner")
      .map((p) => ({
        key: `p-${p.id}`,
        badge: "Partner",
        name: p.name,
        person: undefined,
        website: p.website,
        logo: p.logo_url,
      })),
    ...partners
      .filter((p) => p.tier === "vriend")
      .map((p) => ({
        key: `v-${p.id}`,
        badge: "Vriend van de club",
        name: p.name,
        person: undefined,
        website: p.website,
        logo: p.logo_url,
      })),
  ];

  if (partnerCells.length === 0) return null;

  return (
    <section
      className="bg-sand py-20 md:py-24 px-6 md:px-[5vw]"
      aria-label="Partners"
    >
      <div className="text-center max-w-[560px] mx-auto mb-12 md:mb-14">
        <Reveal>
          <span className="label block mb-4">Partners</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-heading font-light leading-[1.08] text-[clamp(2rem,4vw,3.5rem)] text-text mb-6">
            Met dank aan onze{" "}
            <em className="italic text-sunset">partners.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-[0.98rem] leading-[1.85] text-text-muted">
            Zij maken onze bijeenkomsten mogelijk en versterken het
            Nederlandstalige ondernemersnetwerk op Mallorca.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="flex flex-wrap gap-[1px] max-w-[900px] mx-auto border border-sunset/15 mt-12">
          {partnerCells.map(({ key, ...cell }) => (
            <PartnerCell key={key} {...cell} />
          ))}
        </div>
      </Reveal>

      <div className="text-center mt-12">
        <Link
          href="/sponsors"
          className="inline-flex items-center px-8 py-3 bg-transparent text-sunset border border-sunset text-[0.78rem] font-medium tracking-[0.08em] uppercase font-body transition-colors hover:bg-sunset hover:text-white"
        >
          Word ook partner
        </Link>
      </div>
    </section>
  );
}

function PartnerCell({
  badge,
  name,
  person,
  website,
  logo,
}: {
  badge: string;
  name: string;
  person?: string;
  website?: string | null;
  logo?: string | null;
}) {
  const inner = (
    <div className="flex flex-col gap-2 p-8 transition-colors hover:bg-sunset/5 h-full bg-cream">
      <span className="text-[0.58rem] tracking-[0.2em] uppercase text-sunset font-medium">
        {badge}
      </span>
      {logo ? (
        <div className="relative h-9 w-32 my-1">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain object-left"
            sizes="128px"
          />
        </div>
      ) : (
        <div className="font-heading text-[1.1rem] font-normal text-text">
          {name}
        </div>
      )}
      {person && (
        <span className="text-[0.78rem] text-text-muted">{person}</span>
      )}
    </div>
  );

  return (
    <div className="flex-1 min-w-[180px]">
      {website ? (
        <Link href={website} target="_blank" rel="noopener noreferrer">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}
