"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { EASE, EASE_HOVER } from "@/lib/constants";

interface HoverImgProps {
  src: string;
  alt?: string;
  aspect?: string;
  style?: CSSProperties;
}

export function HoverImg({ src, alt = "", aspect = "3/4", style: s = {} }: HoverImgProps) {
  const [hov, setHov] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        aspectRatio: aspect,
        overflow: "hidden",
        background: "var(--color-img-placeholder)",
        position: "relative",
        ...s,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          opacity: loaded ? 1 : 0,
          transform: hov ? "scale(1.05)" : "scale(1)",
          transition: `transform 0.8s ${EASE}, opacity 0.6s ${EASE_HOVER}`,
        }}
      />
    </div>
  );
}
