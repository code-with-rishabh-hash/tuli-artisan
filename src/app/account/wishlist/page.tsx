"use client";

import { useState } from "react";
import Link from "next/link";
import { useFetch } from "@/hooks/use-fetch";

interface WishlistProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  craft: string;
  artisan: { name: string };
}

interface WishlistEntry {
  id: string;
  productId: string;
  product: WishlistProduct;
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export default function WishlistPage() {
  const { data: initialItems, loading } = useFetch<WishlistEntry[]>("/api/wishlist");
  const [removed, setRemoved] = useState<string[]>([]);

  const items = (initialItems ?? []).filter((i) => !removed.includes(i.productId));

  async function handleRemove(productId: string) {
    setRemoved((prev) => [...prev, productId]);
    await fetch(`/api/wishlist/${productId}`, { method: "DELETE" });
  }

  if (loading) return <p style={{ fontFamily: "var(--font-karla)", color: "var(--color-mid)", paddingTop: 20 }}>Loading...</p>;

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 28, fontWeight: 300, color: "var(--color-dark)", marginBottom: 32 }}>
        Wishlist
      </h2>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ fontFamily: "var(--font-karla)", fontSize: 14, color: "var(--color-mid)", marginBottom: 20 }}>
            Your wishlist is empty.
          </p>
          <Link href="/shop" style={{ display: "inline-block", padding: "14px 32px", background: "var(--color-dark)", color: "var(--color-cream)", fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", textDecoration: "none" }}>
            Explore Products
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
          {items.map(({ product, productId }) => (
            <div key={productId} style={{ border: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
              <Link href={`/product/${product.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "var(--color-bg-alt)" }}>
                  <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontFamily: "var(--font-karla)", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--color-light)", marginBottom: 4 }}>
                    {product.craft}
                  </p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 17, color: "var(--color-dark)", marginBottom: 4 }}>
                    {product.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-dark)" }}>
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
              <div style={{ padding: "0 16px 16px" }}>
                <button
                  onClick={() => handleRemove(productId)}
                  style={{ fontFamily: "var(--font-karla)", fontSize: 11, color: "#A63D2F", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
