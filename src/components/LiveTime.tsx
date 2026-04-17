"use client";

import { useEffect, useState } from "react";

type Props = {
  className?: string;
  showSeconds?: boolean;
};

export default function LiveTime({
  className = "",
  showSeconds = true,
}: Props) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const format = () => {
      const now = new Date();
      return new Intl.DateTimeFormat("nl-NL", {
        hour: "2-digit",
        minute: "2-digit",
        second: showSeconds ? "2-digit" : undefined,
        hour12: false,
        timeZone: "Europe/Madrid",
      }).format(now);
    };
    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, [showSeconds]);

  return (
    <span
      className={`tabular-nums ${className}`}
      suppressHydrationWarning
      aria-live="off"
    >
      {time || "--:--"}
    </span>
  );
}
