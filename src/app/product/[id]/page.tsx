import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, getProduct } from "@/data/products";
import { getArtisan } from "@/data/artisans";
import { formatPrice, getProductPromo } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { Tag } from "@/components/ui/Tag";
import { CraftBadge } from "@/components/ui/CraftBadge";
import { Divider } from "@/components/ui/Divider";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumb } from "@/components/product/Breadcrumb";
import { ProductActions } from "@/components/product/ProductActions";
import Link from "next/link";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) notFound();

  const artisan = getArtisan(product.artisanId);
  const promo = getProductPromo(product.id);

  return (
    <div style={{ paddingTop: 80, background: "var(--color-bg)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 32px" }}>
        <Reveal>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: product.name },
            ]}
          />
        </Reveal>
      </div>
      <div
        className="tuli-product-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px 120px",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 88,
          alignItems: "start",
        }}
      >
        <Reveal direction="left">
          <div style={{ position: "relative" }}>
            <Img src={product.image} alt={product.name} aspect="4/5" />
            {product.tag && (
              <div style={{ position: "absolute", top: 24, left: 24 }}>
                <Tag variant="gold">{product.tag}</Tag>
              </div>
            )}
          </div>
        </Reveal>
        <Reveal direction="right" delay={0.15}>
          <div>
            <CraftBadge craft={product.craft} />
            <h1
              style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontWeight: 300,
                color: "var(--color-dark)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontSize: "clamp(30px, 4vw, 46px)",
                margin: "20px 0 10px",
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontSize: 13,
                color: "var(--color-light)",
                marginBottom: 28,
              }}
            >
              by{" "}
              <Link
                href={`/artisan/${artisan?.id}`}
                style={{
                  color: "var(--color-gold)",
                  borderBottom: "1px solid var(--color-gold)",
                  textDecoration: "none",
                }}
              >
                {artisan?.name}
              </Link>{" "}
              &middot; {artisan?.region}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
              <span
                style={{
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontSize: 30,
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
                    fontSize: 18,
                    color: "var(--color-light)",
                    textDecoration: "line-through",
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {promo && <Tag variant="sale">On Sale</Tag>}
            </div>
            <Divider width="100%" color="var(--color-divider)" style={{ marginBottom: 28 }} />
            <p
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontWeight: 400,
                color: "var(--color-mid)",
                lineHeight: 1.8,
                fontSize: "15.5px",
                marginBottom: 32,
              }}
            >
              {product.description}
            </p>

            <ProductActions product={product} />

            <Divider width="100%" color="var(--color-divider)" />
            <Accordion title="Details & Materials" content={product.details.join(" \u00B7 ")} />
            <Accordion title="Care Instructions" content={product.careInstructions} />
            <Accordion
              title="Shipping & Returns"
              content="Free shipping above \u20B93,000. Handcrafted \u2014 allow 7\u201314 days. Returns within 7 days of delivery in original packaging."
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
