import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COLLECTIONS, getCollection, getCollectionProducts } from "@/data/collections";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProductGrid } from "@/components/product/ProductGrid";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const col = getCollection(id);
  if (!col) return { title: "Collection Not Found" };
  return {
    title: col.title,
    description: col.description,
    openGraph: { images: [col.image] },
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const col = getCollection(id);
  if (!col) notFound();

  const products = getCollectionProducts(col);

  return (
    <div style={{ paddingTop: 0, background: "var(--color-bg)", minHeight: "100vh" }}>
      <section
        style={{
          position: "relative",
          minHeight: 420,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${col.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.32)",
          }}
        />
        <Reveal>
          <div style={{ position: "relative", zIndex: 2, padding: "130px 32px 88px" }}>
            <SectionLabel color="var(--color-text-on-dark-muted)">{col.season}</SectionLabel>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontWeight: 200,
                color: "var(--color-text-on-dark)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontSize: "clamp(40px, 6vw, 76px)",
                margin: "14px 0",
              }}
            >
              {col.title}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontWeight: 400,
                color: "var(--color-text-on-dark-soft)",
                lineHeight: 1.8,
                fontSize: "15.5px",
                maxWidth: 540,
                margin: "0 auto",
              }}
            >
              {col.description}
            </p>
          </div>
        </Reveal>
      </section>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 32px 120px" }}>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
