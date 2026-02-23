"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Collection } from "@/types";

interface CollectionsSliderProps {
  collections: Collection[];
}

export function CollectionsSlider({ collections }: CollectionsSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef(0);
  const total = collections.length;

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      setCurrent(next);
      if (trackRef.current) {
        trackRef.current.scrollTo({ left: next * trackRef.current.offsetWidth, behavior: "smooth" });
      }
    },
    [total]
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-advance every 6s
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => goTo(current + 1), 6000);
    return () => clearInterval(timer);
  }, [current, isPaused, total, goTo]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    },
    [prev, next]
  );

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartRef.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) { next(); } else { prev(); }
      }
    },
    [next, prev]
  );

  // Sync scroll position on snap
  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const w = trackRef.current.offsetWidth;
    if (w === 0) return;
    const idx = Math.round(trackRef.current.scrollLeft / w);
    if (idx !== current && idx >= 0 && idx < total) {
      setCurrent(idx);
    }
  }, [current, total]);

  if (total === 0) return null;

  return (
    <section style={{ padding: "0 32px", background: "var(--color-bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal direction="scale">
          <div
            style={{ position: "relative", overflow: "hidden" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            tabIndex={0}
            role="region"
            aria-label="Collections carousel"
            aria-roledescription="carousel"
          >
            {/* Scrollable Track */}
            <div
              ref={trackRef}
              onScroll={handleScroll}
              style={{
                display: "flex",
                overflowX: "hidden",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
              }}
            >
              {collections.map((c, i) => (
                <Link
                  key={c.id}
                  href={`/collection/${c.slug}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${total}: ${c.title}`}
                  style={{
                    flex: "0 0 100%",
                    scrollSnapAlign: "start",
                    position: "relative",
                    minHeight: 460,
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  className="tuli-zoom-parent"
                >
                  <div
                    className="tuli-zoom-img"
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${c.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "brightness(0.4)",
                      transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      zIndex: 2,
                      padding: "clamp(48px, 6vw, 88px) clamp(48px, 5vw, 88px)",
                    }}
                  >
                    <SectionLabel color="var(--color-text-on-dark-muted)">
                      {c.season}
                    </SectionLabel>
                    <h2
                      style={{
                        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                        fontWeight: 200,
                        color: "var(--color-text-on-dark)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                        fontSize: "clamp(36px, 5vw, 64px)",
                        margin: "12px 0",
                      }}
                    >
                      {c.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                        fontWeight: 400,
                        color: "var(--color-text-on-dark-soft)",
                        lineHeight: 1.8,
                        fontSize: "15.5px",
                        maxWidth: 440,
                        fontStyle: "italic",
                      }}
                    >
                      {c.subtitle}
                    </p>
                    <span
                      style={{
                        fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                        fontSize: 10,
                        letterSpacing: "3px",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        color: "var(--color-gold-highlight)",
                        display: "inline-block",
                        marginTop: 28,
                        borderBottom: "1px solid var(--color-gold-highlight)",
                        paddingBottom: 3,
                      }}
                    >
                      Explore Collection &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Navigation Arrows */}
            {total > 1 && (
              <>
                <button
                  onClick={(e) => { e.preventDefault(); prev(); }}
                  aria-label="Previous collection"
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.3)",
                    background: "rgba(0,0,0,0.35)",
                    color: "#FAF8F4",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 3,
                    transition: "background 0.3s ease",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); next(); }}
                  aria-label="Next collection"
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.3)",
                    background: "rgba(0,0,0,0.35)",
                    color: "#FAF8F4",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 3,
                    transition: "background 0.3s ease",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            {/* Dot Indicators */}
            {total > 1 && (
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 10,
                  zIndex: 3,
                }}
              >
                {collections.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={(e) => { e.preventDefault(); goTo(i); }}
                    aria-label={`Go to ${c.title}`}
                    style={{
                      width: current === i ? 28 : 8,
                      height: 8,
                      borderRadius: 4,
                      border: "none",
                      background: current === i ? "var(--color-gold-highlight)" : "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      transition: "all 0.4s ease",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
