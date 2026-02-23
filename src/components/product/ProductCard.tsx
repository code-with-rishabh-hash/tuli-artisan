"use client";

import { useState } from "react";
import Link from "next/link";
import { HoverImg } from "@/components/ui/HoverImg";
import { CraftBadge } from "@/components/ui/CraftBadge";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice } from "@/lib/utils";
import { EASE } from "@/lib/constants";
import type { Product, Promotion } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
  artisanName?: string;
  artisanRegion?: string;
  promo?: Promotion | null;
}

export function ProductCard({ product, index = 0, artisanName, artisanRegion, promo }: ProductCardProps) {
  const [hov, setHov] = useState(false);
  const hasDiscount = product.originalPrice || promo;

  return (
    <Reveal delay={index * 0.08}>
      <Link
        href={`/product/${product.slug}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ cursor: "pointer", position: "relative", display: "block", textDecoration: "none" }}
      >
        <div style={{ position: "relative", marginBottom: "22px" }}>
          <HoverImg src={product.image} alt={product.name} aspect="3/4" />
          <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 8 }}>
            {product.tag && (
              <Tag variant={product.tag === "Limited Edition" ? "gold" : "default"}>
                {product.tag}
              </Tag>
            )}
            {hasDiscount && <Tag variant="sale">Sale</Tag>}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "28px",
              background: "linear-gradient(transparent, rgba(23,20,18,0.7))",
              opacity: hov ? 1 : 0,
              transform: hov ? "translateY(0)" : "translateY(8px)",
              transition: `all 0.5s ${EASE}`,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontSize: "9px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "rgba(250,248,244,0.9)",
              }}
            >
              View Details &rarr;
            </span>
          </div>
        </div>
        <CraftBadge craft={product.craft} />
        <h3
          style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontWeight: 400,
            color: "var(--color-dark)",
            fontSize: "21px",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "14px 0 6px",
          }}
        >
          {product.name}
        </h3>
        {artisanName && (
          <p
            style={{
              fontFamily: 'var(--font-karla, "Karla", sans-serif)',
              fontSize: "12px",
              color: "var(--color-light)",
              marginBottom: "12px",
              letterSpacing: "0.3px",
            }}
          >
            by {artisanName} &middot; {artisanRegion}
          </p>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontFamily: 'var(--font-karla, "Karla", sans-serif)',
              fontSize: "17px",
              fontWeight: 600,
              color: "var(--color-dark)",
            }}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontSize: "14px",
                color: "var(--color-light)",
                textDecoration: "line-through",
              }}
            >
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </Link>
    </Reveal>
  );
}
