import { ProductCard } from "./ProductCard";
import type { Product, Promotion } from "@/types";

interface ProductGridProps {
  products: Product[];
  artisans?: Record<string, { name: string; region: string }>;
  promos?: Record<string, Promotion>;
}

export function ProductGrid({ products, artisans, promos }: ProductGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "40px",
      }}
    >
      {products.map((p, i) => (
        <ProductCard
          key={p.id}
          product={p}
          index={i}
          artisanName={artisans?.[p.artisanId]?.name}
          artisanRegion={artisans?.[p.artisanId]?.region}
          promo={promos?.[p.slug]}
        />
      ))}
    </div>
  );
}
