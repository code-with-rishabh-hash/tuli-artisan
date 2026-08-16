import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollection, getCollections, getCollectionProducts, getArtisans } from "@/lib/dal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProductGrid } from "@/components/product/ProductGrid";

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ id: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const col = await getCollection(id);
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
  const col = await getCollection(id);
  if (!col) notFound();

  const products = await getCollectionProducts(col.slug);

  // Build artisan lookup for ProductGrid
  const allArtisans = await getArtisans();
  const artisans: Record<string, { name: string; region: string }> = {};
  for (const a of allArtisans) {
    artisans[a.id] = { name: a.name, region: a.region };
  }

  return (
    <div style={{ paddingTop: 0, background: "var(--color-bg)", minHeight: "100vh" }}>
      <section
        style={{
          position: "relative",
          minHeight: 540,
          overflow: "hidden",
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
            filter: "brightness(0.55) saturate(0.9)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "var(--color-hero-overlay)" }} />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "var(--tex-buti)",
            backgroundSize: "150px 150px",
            opacity: 0.08,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
        <Reveal>
          <div style={{ position: "relative", zIndex: 2, padding: "140px 32px 96px" }}>
            <SectionLabel color="var(--color-gold-highlight)">{col.season}</SectionLabel>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant, "Bodoni Moda", serif)',
                fontWeight: 400,
                color: "var(--color-text-on-dark)",
                letterSpacing: "-0.01em",
                lineHeight: 1.0,
                fontSize: "clamp(44px, 6.5vw, 84px)",
                margin: "16px 0 20px",
                textWrap: "balance",
              }}
            >
              {col.title}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontWeight: 400,
                color: "var(--color-text-on-dark-soft)",
                lineHeight: 1.85,
                fontSize: "16px",
                maxWidth: 540,
                margin: "0 auto 26px",
              }}
            >
              {col.description}
            </p>
            <span
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontSize: 10,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--color-text-on-dark-muted)",
              }}
            >
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </span>
          </div>
        </Reveal>
      </section>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 32px 120px" }}>
        <ProductGrid products={products} artisans={artisans} />
      </div>
    </div>
  );
}
