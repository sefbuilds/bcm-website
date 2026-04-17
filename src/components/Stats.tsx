import Reveal from "./Reveal";

const STATS = [
  { value: "2019", label: "Opgericht" },
  { value: "42", label: "Leden" },
  { value: "60+", label: "Events" },
  { value: "1", label: "Eiland" },
];

export default function Stats() {
  return (
    <section className="bg-ink hairline-t hairline-b relative">
      <div className="container-site py-16 md:py-20">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 md:divide-x divide-hairline/50">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div className="md:px-10 first:md:pl-0 last:md:pr-0">
                <dt className="text-[10px] font-medium tracking-[0.24em] uppercase text-pearl-60">
                  {stat.label}
                </dt>
                <dd className="mt-5 font-heading font-semibold text-5xl md:text-6xl lg:text-7xl text-pearl tracking-[-0.04em] leading-none">
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
