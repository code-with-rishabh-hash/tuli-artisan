"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { EASE_HOVER } from "@/lib/constants";

interface ImgProps {
  src: string;
  alt?: string;
  aspect?: string;
  style?: CSSProperties;
}

export function Img({ src, alt = "", aspect = "3/4", style: s = {} }: ImgProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
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
          transition: `opacity 0.7s ${EASE_HOVER}`,
          transform: "scale(1.01)",
        }}
      />
    </div>
  );
}
