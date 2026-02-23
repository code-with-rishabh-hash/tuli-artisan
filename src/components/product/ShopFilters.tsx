"use client";

import { useState, useMemo, useCallback } from "react";
import { ProductGrid } from "./ProductGrid";
import { Reveal } from "@/components/ui/Reveal";
import { EASE_HOVER } from "@/lib/constants";
import type { CraftFilter, SortOption, Product, Promotion } from "@/types";

interface ArtisanInfo {
  id: string;
  slug: string;
  name: string;
  craft: string;
  region: string;
  state: string;
}

interface ShopFiltersProps {
  products: Product[];
  artisans: Record<string, { name: string; region: string }>;
  artisanList: ArtisanInfo[];
  promos: Record<string, Promotion>;
  states: string[];
  priceRange: { min: number; max: number };
}

export function ShopFilters({ products, artisans, artisanList, promos, states, priceRange }: ShopFiltersProps) {
  const [craft, setCraft] = useState<CraftFilter>("all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [search, setSearch] = useState("");
  const [selectedArtisan, setSelectedArtisan] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [minPrice, setMinPrice] = useState(priceRange.min);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);
  const [showFilters, setShowFilters] = useState(false);

  const crafts: CraftFilter[] = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.craft))] as CraftFilter[];
    return ["all", ...unique];
  }, [products]);

  const filtered = useMemo(() => {
    let result = products;

    if (craft !== "all") {
      result = result.filter((p) => p.craft === craft);
    }
    if (search) {
      const term = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.craft.toLowerCase().includes(term) ||
          artisans[p.artisanId]?.name.toLowerCase().includes(term)
      );
    }
    if (selectedArtisan) {
      result = result.filter((p) => p.artisanId === selectedArtisan);
    }
    if (selectedState) {
      const artisanIds = artisanList.filter((a) => a.state === selectedState).map((a) => a.id);
      result = result.filter((p) => artisanIds.includes(p.artisanId));
    }
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [products, craft, search, selectedArtisan, selectedState, minPrice, maxPrice, sort, artisans, artisanList]);

  const clearFilters = useCallback(() => {
    setCraft("all");
    setSearch("");
    setSelectedArtisan("");
    setSelectedState("");
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
    setSort("featured");
  }, [priceRange]);

  const hasActiveFilters = craft !== "all" || search || selectedArtisan || selectedState || minPrice > priceRange.min || maxPrice < priceRange.max;

  const selectStyle: React.CSSProperties = {
    fontFamily: "var(--font-karla)",
    fontSize: 12,
    color: "var(--color-mid)",
    background: "var(--color-surface)",
    border: "1px solid var(--color-divider)",
    padding: "10px 14px",
    cursor: "pointer",
    outline: "none",
    minWidth: 160,
  };

  return (
    <>
      {/* Search Bar */}
      <Reveal delay={0.1}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, crafts, artisans..."
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
                transition: "border-color 0.3s ease",
              }}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-light)"
              strokeWidth="2"
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-light)",
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                &times;
              </button>
            )}
          </div>
        </div>
      </Reveal>

      {/* Craft Tabs + Sort + Filter Toggle */}
      <Reveal delay={0.15}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 16,
            borderBottom: "1px solid var(--color-divider)",
            paddingBottom: 22,
          }}
        >
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            {crafts.map((c) => (
              <span
                key={c}
                onClick={() => setCraft(c)}
                style={{
                  fontFamily: "var(--font-karla)",
                  fontSize: 10,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  fontWeight: craft === c ? 700 : 500,
                  cursor: "pointer",
                  color: craft === c ? "var(--color-dark)" : "var(--color-light)",
                  borderBottom: craft === c ? "1.5px solid var(--color-dark)" : "1.5px solid transparent",
                  paddingBottom: 4,
                  transition: `all 0.4s ${EASE_HOVER}`,
                }}
              >
                {c === "all" ? "All Crafts" : c}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                fontFamily: "var(--font-karla)",
                fontSize: 11,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: showFilters ? "var(--color-dark)" : "var(--color-light)",
                background: "none",
                border: `1px solid ${showFilters ? "var(--color-dark)" : "var(--color-divider)"}`,
                padding: "8px 16px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Filters {hasActiveFilters ? `(${filtered.length})` : ""}
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              style={selectStyle}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
          </div>
        </div>
      </Reveal>

      {/* Expandable Filter Panel */}
      {showFilters && (
        <Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 20,
              padding: 24,
              marginBottom: 32,
              border: "1px solid var(--color-divider)",
              background: "var(--color-surface)",
            }}
          >
            {/* Price Range */}
            <div>
              <label style={{ fontFamily: "var(--font-karla)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-mid)", marginBottom: 8, display: "block" }}>
                Price Range
              </label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  min={priceRange.min}
                  max={maxPrice}
                  style={{ ...selectStyle, width: "100%", minWidth: 0 }}
                  placeholder="Min"
                />
                <span style={{ color: "var(--color-light)", fontSize: 12 }}>–</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  min={minPrice}
                  max={priceRange.max}
                  style={{ ...selectStyle, width: "100%", minWidth: 0 }}
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Artisan */}
            <div>
              <label style={{ fontFamily: "var(--font-karla)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-mid)", marginBottom: 8, display: "block" }}>
                Artisan
              </label>
              <select
                value={selectedArtisan}
                onChange={(e) => setSelectedArtisan(e.target.value)}
                style={{ ...selectStyle, width: "100%" }}
              >
                <option value="">All Artisans</option>
                {artisanList.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.craft}
                  </option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label style={{ fontFamily: "var(--font-karla)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-mid)", marginBottom: 8, display: "block" }}>
                Region
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                style={{ ...selectStyle, width: "100%" }}
              >
                <option value="">All States</option>
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Clear */}
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button
                onClick={clearFilters}
                style={{
                  fontFamily: "var(--font-karla)",
                  fontSize: 11,
                  letterSpacing: "1px",
                  color: hasActiveFilters ? "#A63D2F" : "var(--color-light)",
                  background: "none",
                  border: "none",
                  cursor: hasActiveFilters ? "pointer" : "default",
                  padding: "10px 0",
                }}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </Reveal>
      )}

      {/* Active Filter Pills */}
      {hasActiveFilters && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          <span style={{ fontFamily: "var(--font-karla)", fontSize: 12, color: "var(--color-light)", alignSelf: "center" }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </span>
          {craft !== "all" && (
            <span onClick={() => setCraft("all")} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "var(--color-bg-alt)", fontFamily: "var(--font-karla)", fontSize: 11, color: "var(--color-mid)", cursor: "pointer" }}>
              {craft} &times;
            </span>
          )}
          {selectedArtisan && (
            <span onClick={() => setSelectedArtisan("")} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "var(--color-bg-alt)", fontFamily: "var(--font-karla)", fontSize: 11, color: "var(--color-mid)", cursor: "pointer" }}>
              {artisanList.find((a) => a.id === selectedArtisan)?.name} &times;
            </span>
          )}
          {selectedState && (
            <span onClick={() => setSelectedState("")} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "var(--color-bg-alt)", fontFamily: "var(--font-karla)", fontSize: 11, color: "var(--color-mid)", cursor: "pointer" }}>
              {selectedState} &times;
            </span>
          )}
        </div>
      )}

      {/* Product Grid */}
      <div style={{ paddingBottom: 120 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 24, fontWeight: 300, color: "var(--color-dark)", marginBottom: 12 }}>
              No products found
            </p>
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)", marginBottom: 24 }}>
              Try adjusting your filters or search terms.
            </p>
            <button onClick={clearFilters} style={{ fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-gold)", background: "none", border: "none", cursor: "pointer" }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <ProductGrid products={filtered} artisans={artisans} promos={promos} />
        )}
      </div>
    </>
  );
}
