"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PRODUCTS } from "@/data/products";

export function FeaturedProducts() {
  return (
    <section style={{ padding: "80px 32px 120px", background: "var(--color-bg)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "56px",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <SectionLabel>Curated Selection</SectionLabel>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontWeight: 300,
                  color: "var(--color-dark)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  fontSize: "clamp(30px, 4vw, 48px)",
                  marginTop: "10px",
                }}
              >
                Featured Pieces
              </h2>
            </div>
            <Link
              href="/shop"
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--color-light)",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-divider)",
                paddingBottom: 3,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-light)";
              }}
            >
              View All &rarr;
            </Link>
          </div>
        </Reveal>
        <ProductGrid products={PRODUCTS.slice(0, 4)} />
      </div>
    </section>
  );
}
