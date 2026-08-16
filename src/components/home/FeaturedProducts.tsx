"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { formatPrice } from "@/lib/utils";
import type { Product, Promotion } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
  artisans: Record<string, { name: string; region: string }>;
  promos: Record<string, Promotion>;
}

export function FeaturedProducts({ products, artisans, promos }: FeaturedProductsProps) {
  return (
    <section className="tuli-feature-section">
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <div className="tuli-feature-head">
            <div>
              <SectionLabel>Selected Works</SectionLabel>
              <h2 className="tuli-feature-title">This Season&apos;s Pieces</h2>
            </div>
            <Link href="/shop" className="tuli-feature-viewall">
              View all pieces &rarr;
            </Link>
          </div>
        </Reveal>

        <div className="tuli-feature-rows">
          {products.map((p, i) => {
            const artisan = artisans[p.artisanId];
            const promo = promos[p.slug];
            const hasDiscount = Boolean(p.originalPrice || promo);
            return (
              <Reveal key={p.id} delay={0.05}>
                <article
                  className={`tuli-feature-row${i % 2 === 1 ? " tuli-feature-row--reverse" : ""}`}
                >
                  <Link href={`/product/${p.slug}`} className="tuli-feature-media tuli-zoom-parent">
                    <div
                      className="tuli-zoom-img tuli-feature-img"
                      style={{ backgroundImage: `url(${p.image})` }}
                    />
                    <div className="tuli-feature-cap">
                      <span className="tuli-feature-no">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="tuli-feature-craft">{p.craft}</span>
                    </div>
                    <div className="tuli-feature-tags">
                      {p.tag && (
                        <Tag variant={p.tag === "Limited Edition" ? "gold" : "default"}>
                          {p.tag}
                        </Tag>
                      )}
                      {hasDiscount && <Tag variant="sale">Sale</Tag>}
                    </div>
                  </Link>

                  <div className="tuli-feature-body">
                    <span className="tuli-feature-body-craft">{p.craft}</span>
                    <h3 className="tuli-feature-name">{p.name}</h3>
                    {artisan && (
                      <p className="tuli-feature-by">
                        by {artisan.name}, {artisan.region}
                      </p>
                    )}
                    <p className="tuli-feature-desc">{p.description}</p>
                    <div className="tuli-feature-price">
                      <span className="now">{formatPrice(p.price)}</span>
                      {p.originalPrice && (
                        <span className="was">{formatPrice(p.originalPrice)}</span>
                      )}
                    </div>
                    <Link href={`/product/${p.slug}`} className="tuli-feature-cta">
                      View the piece &rarr;
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
