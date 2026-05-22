import Reveal from "./Reveal";
import { getSupabasePublic } from "@/lib/supabase-public";

async function getStats() {
  const supabase = getSupabasePublic();
  if (!supabase) return { members: 0, events: 0 };
  const [membersRes, eventsRes] = await Promise.all([
    supabase
      .from("nbcm_members")
      .select("id", { count: "exact", head: true })
      .eq("is_public", true),
    supabase
      .from("nbcm_events")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true),
  ]);
  return {
    members: membersRes.count ?? 0,
    events: eventsRes.count ?? 0,
  };
}

export default async function Stats() {
  const { members, events } = await getStats();

  const tiles = [
    { value: "2019", label: "Opgericht" },
    { value: members > 0 ? String(members) : "—", label: "Leden" },
    { value: events > 0 ? `${events}+` : "—", label: "Events per jaar" },
    { value: "NL · BE · ZA", label: "Community" },
  ];

  return (
    <section className="bg-cream border-y border-sunset/15">
      <div className="container-site py-14 md:py-16">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 md:divide-x md:divide-sunset/15">
          {tiles.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div className="md:px-10 first:md:pl-0 last:md:pr-0">
                <dt className="text-[0.62rem] font-medium tracking-[0.16em] uppercase text-text-muted">
                  {stat.label}
                </dt>
                <dd className="mt-3 font-heading font-light text-3xl md:text-[2.4rem] text-text leading-none">
                  {stat.value}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
