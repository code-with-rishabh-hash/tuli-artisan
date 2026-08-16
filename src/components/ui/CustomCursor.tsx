"use client";

import { useEffect, useRef } from "react";

/**
 * A subtle brass ring that trails the pointer and expands over interactive
 * elements. The native cursor stays visible (important for forms/checkout),
 * so this reads as ambient polish, not a replacement. Desktop-only and
 * disabled under reduced-motion.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const ring = ringRef.current;
    if (!ring) return;

    const INTERACTIVE =
      "a, button, [role='button'], [data-cursor], input, select, textarea, label, summary";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let shown = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        ring.style.opacity = "1";
      }
      const el = e.target as Element | null;
      ring.classList.toggle("is-hover", Boolean(el && el.closest(INTERACTIVE)));
    };

    const onLeave = () => {
      shown = false;
      ring.style.opacity = "0";
    };

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div ref={ringRef} className="tuli-cursor" aria-hidden="true" />;
}
