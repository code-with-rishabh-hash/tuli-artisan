import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShopFilters } from "@/components/product/ShopFilters";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse our collection of handcrafted artisan goods from India's finest craftspeople.",
};

export default function ShopPage() {
  return (
    <div style={{ paddingTop: 120, background: "var(--color-bg)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <Reveal>
          <div style={{ marginBottom: 52 }}>
            <SectionLabel>The Collection</SectionLabel>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontWeight: 200,
                color: "var(--color-dark)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontSize: "clamp(36px, 5vw, 56px)",
                marginTop: 10,
              }}
            >
              Shop All
            </h1>
          </div>
        </Reveal>
        <ShopFilters />
      </div>
    </div>
  );
}
