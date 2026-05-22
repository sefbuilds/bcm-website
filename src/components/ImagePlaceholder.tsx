type Props = {
  label?: string;
  className?: string;
  aspectClassName?: string;
};

export default function ImagePlaceholder({
  label = "Sfeerbeeld",
  className = "",
  aspectClassName = "aspect-[4/3]",
}: Props) {
  return (
    <div
      className={`bg-sand-dark rounded-xl flex items-center justify-center ${aspectClassName} ${className}`}
      aria-label={label}
      role="img"
    >
      <span className="text-deep-blue-60 text-sm tracking-wide">
        {label}
      </span>
    </div>
  );
}
