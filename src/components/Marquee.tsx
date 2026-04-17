type Props = {
  items: string[];
  speed?: "slow" | "normal" | "fast";
  separator?: React.ReactNode;
  className?: string;
  itemClassName?: string;
};

const SPEED_CLASS = {
  slow: "60s",
  normal: "40s",
  fast: "24s",
};

export default function Marquee({
  items,
  speed = "normal",
  separator,
  className = "",
  itemClassName = "text-deep-blue",
}: Props) {
  const sep = separator ?? (
    <span
      className="mx-8 h-1 w-1 rounded-full bg-deep-blue/30 shrink-0"
      aria-hidden="true"
    />
  );

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={
        {
          "--marquee-duration": SPEED_CLASS[speed],
        } as React.CSSProperties
      }
      aria-label={items.join(", ")}
    >
      <div className="flex w-max animate-[marquee_var(--marquee-duration)_linear_infinite]">
        {[0, 1].map((pass) => (
          <div
            key={pass}
            className="flex items-center shrink-0"
            aria-hidden={pass === 1}
          >
            {items.map((item, i) => (
              <div
                key={`${pass}-${i}`}
                className="flex items-center shrink-0"
              >
                <span className={`shrink-0 whitespace-nowrap ${itemClassName}`}>
                  {item}
                </span>
                {sep}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
