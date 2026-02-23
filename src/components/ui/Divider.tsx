import type { CSSProperties } from "react";

interface DividerProps {
  width?: string;
  color?: string;
  style?: CSSProperties;
}

export function Divider({ width = "48px", color, style: s = {} }: DividerProps) {
  return (
    <div
      style={{
        width,
        height: "1px",
        background: color || "var(--color-gold)",
        ...s,
      }}
    />
  );
}
