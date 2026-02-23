"use client";

import { useEffect, useRef, useState } from "react";

export function useParallax(speed = 0.12): [React.RefObject<HTMLElement | null>, number] {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf: number;

    const handler = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      setOffset((center - viewCenter) * speed);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(handler);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handler();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return [ref, offset];
}
