import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShopFilters } from "@/components/product/ShopFilters";
import { getProducts, getArtisans, getPromotions, getDistinctStates, getPriceRange } from "@/lib/dal";
import type { Promotion } from "@/types";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse our collection of handcrafted artisan goods from India's finest craftspeople.",
};

export default async function ShopPage() {
  const [products, artisans, promotions, states, priceRange] = await Promise.all([
    getProducts(),
    getArtisans(),
    getPromotions(),
    getDistinctStates(),
    getPriceRange(),
  ]);

  // Build artisan lookup map
  const artisanMap: Record<string, { name: string; region: string }> = {};
  for (const a of artisans) {
    artisanMap[a.id] = { name: a.name, region: a.region };
  }

  // Build artisan list for filter dropdown
  const artisanList = artisans.map((a) => ({
    id: a.id,
    slug: a.slug,
    name: a.name,
    craft: a.craft as string,
    region: a.region,
    state: a.state,
  }));

  // Build promo lookup map
  const promoMap: Record<string, Promotion> = {};
  for (const promo of promotions) {
    if (promo.type === "sale") {
      if (promo.applicableProducts === "all") {
        for (const p of products) {
          promoMap[p.slug] = promo;
        }
      } else {
        for (const slug of promo.applicableProducts) {
          promoMap[slug] = promo;
        }
      }
    }
  }

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
        <ShopFilters
          products={products}
          artisans={artisanMap}
          artisanList={artisanList}
          promos={promoMap}
          states={states}
          priceRange={priceRange}
        />
      </div>
    </div>
  );
}
