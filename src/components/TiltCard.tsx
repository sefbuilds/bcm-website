"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export default function TiltCard({
  children,
  className = "",
  intensity = 6,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 20, mass: 0.4 };
  const rotX = useSpring(
    useTransform(y, [-0.5, 0.5], [intensity, -intensity]),
    springConfig,
  );
  const rotY = useSpring(
    useTransform(x, [-0.5, 0.5], [-intensity, intensity]),
    springConfig,
  );

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const style: MotionStyle = {
    rotateX: rotX,
    rotateY: rotY,
    transformPerspective: 1000,
    transformStyle: "preserve-3d",
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
