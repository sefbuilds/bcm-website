type Props = {
  fillClass?: string;
  flip?: boolean;
  className?: string;
};

export default function WaveDivider({
  fillClass = "fill-cream",
  flip = false,
  className = "",
}: Props) {
  return (
    <div
      className={`w-full leading-none ${className}`}
      aria-hidden="true"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        className={`block w-full h-[48px] md:h-[72px] ${fillClass}`}
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
      >
        <path d="M0,0 C240,48 480,72 720,56 C960,40 1200,0 1440,24 L1440,72 L0,72 Z" />
      </svg>
    </div>
  );
}
