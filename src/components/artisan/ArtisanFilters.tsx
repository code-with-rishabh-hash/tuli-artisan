"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CraftBadge } from "@/components/ui/CraftBadge";
import { EASE_HOVER } from "@/lib/constants";
import type { Artisan } from "@/types";

interface ArtisanFiltersProps {
  artisans: Artisan[];
  crafts: string[];
  states: string[];
}

export default function ArtisanFilters({ artisans, crafts, states }: ArtisanFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedCraft, setSelectedCraft] = useState("all");
  const [selectedState, setSelectedState] = useState("");

  const filtered = useMemo(() => {
    let result = artisans;
    if (selectedCraft !== "all") {
      result = result.filter((a) => a.craft === selectedCraft);
    }
    if (selectedState) {
      result = result.filter((a) => a.state === selectedState);
    }
    if (search) {
      const term = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(term) ||
          a.craft.toLowerCase().includes(term) ||
          a.region.toLowerCase().includes(term)
      );
    }
    return result;
  }, [artisans, selectedCraft, selectedState, search]);

  const [hero, ...rest] = filtered;

  return (
    <>
      {/* Search & Filters */}
      <Reveal delay={0.1}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ position: "relative", marginBottom: 24 }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search artisans..."
              style={{
                width: "100%",
                padding: "14px 16px 14px 44px",
                border: "1px solid var(--color-divider)",
                background: "var(--color-surface)",
                color: "var(--color-dark)",
                fontFamily: "var(--font-karla)",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-light)" strokeWidth="2"
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
            >
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            {/* Craft pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["all", ...crafts].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCraft(c)}
                  style={{
                    fontFamily: "var(--font-karla)",
                    fontSize: 10,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    border: `1px solid ${selectedCraft === c ? "var(--color-dark)" : "var(--color-divider)"}`,
                    background: selectedCraft === c ? "var(--color-dark)" : "transparent",
                    color: selectedCraft === c ? "var(--color-cream)" : "var(--color-mid)",
                    cursor: "pointer",
                    transition: `all 0.3s ${EASE_HOVER}`,
                  }}
                >
                  {c === "all" ? "All" : c}
                </button>
              ))}
            </div>

            {/* Region dropdown */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{
                fontFamily: "var(--font-karla)",
                fontSize: 12,
                color: "var(--color-mid)",
                background: "var(--color-surface)",
                border: "1px solid var(--color-divider)",
                padding: "8px 14px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="">All Regions</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </Reveal>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 24, fontWeight: 300, color: "var(--color-dark)" }}>
            No artisans found
          </p>
          <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)", marginTop: 8 }}>
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          {/* Hero Card - Featured Artisan */}
          {hero && (
            <Reveal>
              <Link
                href={`/artisan/${hero.slug}`}
                style={{ display: "block", textDecoration: "none", marginBottom: 64, position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "relative", aspectRatio: "21/9", overflow: "hidden" }}>
                  <img
                    src={hero.image}
                    alt={hero.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.45)" }}
                    loading="eager"
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "60px 48px 48px",
                      background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                    }}
                  >
                    <CraftBadge craft={hero.craft} />
                    <h2
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "clamp(32px, 5vw, 52px)",
                        fontWeight: 300,
                        color: "#FAF8F4",
                        letterSpacing: "-0.02em",
                        margin: "16px 0 8px",
                      }}
                    >
                      {hero.name}
                    </h2>
                    <p style={{ fontFamily: "var(--font-karla)", fontSize: 14, color: "rgba(250,248,244,0.7)", marginBottom: 16 }}>
                      {hero.region} &middot; {hero.yearsOfPractice} years of practice
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: 20,
                        fontWeight: 300,
                        fontStyle: "italic",
                        color: "rgba(250,248,244,0.85)",
                        maxWidth: 600,
                        lineHeight: 1.6,
                      }}
                    >
                      &ldquo;{hero.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Magazine Grid - Remaining Artisans */}
          <div className="tuli-art-grid">
            {rest.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.08}>
                <Link href={`/artisan/${a.slug}`} className="tuli-art-card tuli-zoom-parent">
                  <div className="tuli-art-card-media">
                    <div
                      className="tuli-zoom-img tuli-art-card-img"
                      style={{ backgroundImage: `url(${a.image})` }}
                    />
                  </div>
                  <div className="tuli-art-card-body">
                    <CraftBadge craft={a.craft} />
                    <h3 className="tuli-art-card-name">{a.name}</h3>
                    <p className="tuli-art-card-region">
                      {a.region} &middot; {a.yearsOfPractice} years
                    </p>
                    <p className="tuli-art-card-bio">{a.bio}</p>
                    <div
                      style={{
                        width: 24,
                        height: 1,
                        background: "var(--color-gold)",
                        margin: "18px 0 14px",
                      }}
                    />
                    <p
                      style={{
                        fontFamily: 'var(--font-cormorant, "Bodoni Moda", serif)',
                        fontSize: 16,
                        fontStyle: "italic",
                        color: "var(--color-light)",
                        lineHeight: 1.55,
                      }}
                    >
                      &ldquo;{a.quote}&rdquo;
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </>
  );
}
