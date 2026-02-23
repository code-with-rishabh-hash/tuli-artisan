"use client";

import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "./ProductGrid";
import { Reveal } from "@/components/ui/Reveal";
import { EASE_HOVER } from "@/lib/constants";
import type { CraftFilter, SortOption, Product } from "@/types";

export function ShopFilters() {
  const [filter, setFilter] = useState<CraftFilter>("all");
  const [sort, setSort] = useState<SortOption>("featured");

  const crafts: CraftFilter[] = [
    "all",
    ...([...new Set(PRODUCTS.map((p) => p.craft))] as CraftFilter[]),
  ];

  let filtered: Product[] =
    filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.craft === filter);
  if (sort === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <>
      <Reveal delay={0.15}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 16,
            borderBottom: "1px solid var(--color-divider)",
            paddingBottom: 22,
          }}
        >
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {crafts.map((c) => (
              <span
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontSize: "10px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  fontWeight: filter === c ? 700 : 500,
                  cursor: "pointer",
                  color: filter === c ? "var(--color-dark)" : "var(--color-light)",
                  borderBottom:
                    filter === c
                      ? "1.5px solid var(--color-dark)"
                      : "1.5px solid transparent",
                  paddingBottom: 4,
                  transition: `all 0.4s ${EASE_HOVER}`,
                }}
              >
                {c === "all" ? "All Crafts" : c}
              </span>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            style={{
              fontFamily: 'var(--font-karla, "Karla", sans-serif)',
              fontSize: "12px",
              color: "var(--color-mid)",
              background: "var(--color-bg)",
              border: "1px solid var(--color-divider)",
              padding: "10px 18px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low &rarr; High</option>
            <option value="price-high">Price: High &rarr; Low</option>
          </select>
        </div>
      </Reveal>
      <div style={{ paddingBottom: 120 }}>
        <ProductGrid products={filtered} />
      </div>
    </>
  );
}
