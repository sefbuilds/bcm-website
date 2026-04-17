type Props = {
  className?: string;
  variant?: "hero" | "subtle" | "intense";
};

export default function AuroraBg({
  className = "",
  variant = "hero",
}: Props) {
  const intensity = {
    hero: { opacity: "opacity-70", blur: "blur-[110px]" },
    subtle: { opacity: "opacity-40", blur: "blur-[130px]" },
    intense: { opacity: "opacity-90", blur: "blur-[90px]" },
  }[variant];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className={`absolute -top-1/4 -left-1/4 h-[55%] w-[55%] rounded-full bg-terracotta/25 ${intensity.blur} ${intensity.opacity}`}
        style={{ animation: "aurora-drift 22s ease-in-out infinite" }}
      />
      <div
        className={`absolute top-1/3 -right-1/4 h-[60%] w-[60%] rounded-full bg-gold/30 ${intensity.blur} ${intensity.opacity}`}
        style={{ animation: "aurora-drift 28s ease-in-out -5s infinite" }}
      />
      <div
        className={`absolute -bottom-1/4 left-1/4 h-[50%] w-[50%] rounded-full bg-olive/20 ${intensity.blur} ${intensity.opacity}`}
        style={{ animation: "aurora-drift 34s ease-in-out -10s infinite" }}
      />
      <div
        className={`absolute bottom-1/4 right-1/3 h-[35%] w-[35%] rounded-full bg-terracotta/20 ${intensity.blur} ${intensity.opacity}`}
        style={{ animation: "aurora-drift 26s ease-in-out -15s infinite" }}
      />
    </div>
  );
}
