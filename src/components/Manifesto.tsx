/**
 * Manifesto band — drie pijlers in horizontale strip op ocean.
 * Vervangt de oude Motto-implementatie als snel statement onder de hero.
 */
const PILLARS = [
  { num: "01", text: "Samen", em: "kunnen", tail: "we meer" },
  { num: "02", text: "Samen", em: "weten", tail: "we meer" },
  { num: "03", text: "Samen", em: "verdienen", tail: "we meer" },
];

export default function Manifesto() {
  return (
    <section
      className="bg-ocean border-y border-sunset/20 px-[5vw] py-14 grid grid-cols-1 md:grid-cols-3"
      aria-label="Manifesto"
    >
      {PILLARS.map((p, i) => (
        <div
          key={p.num}
          className={`flex items-center gap-6 px-6 md:px-10 py-6 ${
            i < PILLARS.length - 1
              ? "md:border-r border-sunset/15 border-b md:border-b-0"
              : ""
          }`}
        >
          <span className="font-heading italic font-light text-3xl text-warm-text/35 leading-none shrink-0">
            {p.num}
          </span>
          <p className="font-heading text-[1.3rem] font-light text-warm-text/90 leading-[1.35]">
            {p.text}{" "}
            <em className="italic text-sunset-light">{p.em}</em>{" "}
            {p.tail}
          </p>
        </div>
      ))}
    </section>
  );
}
