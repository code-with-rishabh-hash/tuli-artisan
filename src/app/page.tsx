import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CollectionBanner } from "@/components/home/CollectionBanner";
import { ArtisanSpotlight } from "@/components/home/ArtisanSpotlight";
import { TrustBar } from "@/components/home/TrustBar";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Philosophy />
      <FeaturedProducts />
      <CollectionBanner />
      <ArtisanSpotlight />
      <TrustBar />
    </div>
  );
}
