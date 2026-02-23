"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { EASE } from "@/lib/constants";
import type { RevealDirection } from "@/types";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  className?: string;
  style?: CSSProperties;
}

const TRANSFORMS: Record<RevealDirection, string> = {
  up: "translateY(36px)",
  down: "translateY(-36px)",
  left: "translateX(48px)",
  right: "translateX(-48px)",
  none: "none",
  scale: "scale(0.97)",
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  style = {},
}: RevealProps) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : TRANSFORMS[direction],
        transition: `opacity 1s ${EASE} ${delay}s, transform 1s ${EASE} ${delay}s`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
