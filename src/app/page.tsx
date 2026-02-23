import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CollectionsSlider } from "@/components/home/CollectionsSlider";
import { ArtisanSpotlight } from "@/components/home/ArtisanSpotlight";
import { TrustBar } from "@/components/home/TrustBar";
import { getProducts, getArtisans, getPromotions, getCollections } from "@/lib/dal";
import type { Promotion } from "@/types";

export default async function HomePage() {
  const [allProducts, artisans, promotions, collections] = await Promise.all([
    getProducts(),
    getArtisans(),
    getPromotions(),
    getCollections(),
  ]);

  const featuredProducts = allProducts.slice(0, 4);

  // Build artisan lookup map
  const artisanMap: Record<string, { name: string; region: string }> = {};
  for (const a of artisans) {
    artisanMap[a.id] = { name: a.name, region: a.region };
  }

  // Build promo lookup map (by product slug)
  const promoMap: Record<string, Promotion> = {};
  for (const promo of promotions) {
    if (promo.type === "sale") {
      if (promo.applicableProducts === "all") {
        for (const p of featuredProducts) {
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
    <div>
      <Hero />
      <Philosophy />
      <FeaturedProducts products={featuredProducts} artisans={artisanMap} promos={promoMap} />
      <CollectionsSlider collections={collections} />
      <ArtisanSpotlight artisans={artisans} />
      <TrustBar />
    </div>
  );
}
