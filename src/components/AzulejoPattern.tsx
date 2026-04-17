type Props = {
  className?: string;
  opacity?: number;
  color?: string;
  size?: number;
};

export default function AzulejoPattern({
  className = "",
  opacity = 0.08,
  color = "currentColor",
  size = 72,
}: Props) {
  const id = `azulejo-${size}`;

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id={id}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M${size / 2} 2 L${size - 2} ${size / 2} L${size / 2} ${size - 2} L2 ${size / 2} Z`}
            fill="none"
            stroke={color}
            strokeWidth="0.75"
          />
          <circle cx={size / 2} cy={size / 2} r="2.5" fill={color} />
          <circle cx="0" cy="0" r="1" fill={color} />
          <circle cx={size} cy="0" r="1" fill={color} />
          <circle cx="0" cy={size} r="1" fill={color} />
          <circle cx={size} cy={size} r="1" fill={color} />
          <path
            d={`M${size / 2} ${size / 4} L${(size * 3) / 4} ${size / 2} L${size / 2} ${(size * 3) / 4} L${size / 4} ${size / 2} Z`}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
