import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArtisan, getArtisans, getProductsByArtisan } from "@/lib/dal";
import { Reveal } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { CraftBadge } from "@/components/ui/CraftBadge";
import { Divider } from "@/components/ui/Divider";
import { ProductGrid } from "@/components/product/ProductGrid";

export async function generateStaticParams() {
  const artisans = await getArtisans();
  return artisans.map((a) => ({ id: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artisan = await getArtisan(id);
  if (!artisan) return { title: "Artisan Not Found" };
  return {
    title: `${artisan.name} \u2014 ${artisan.craft}`,
    description: artisan.bio,
    openGraph: { images: [artisan.image] },
  };
}

export default async function ArtisanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artisan = await getArtisan(id);
  if (!artisan) notFound();

  const artisanProducts = await getProductsByArtisan(artisan.id);

  // Build artisan lookup for ProductGrid
  const artisanMap: Record<string, { name: string; region: string }> = {
    [artisan.id]: { name: artisan.name, region: artisan.region },
  };

  return (
    <div style={{ paddingTop: 0, background: "var(--color-bg)", minHeight: "100vh" }}>
      <section style={{ background: "var(--color-dark-bg)" }}>
        <div
          className="tuli-artisan-hero"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "110px 32px 88px",
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: 72,
            alignItems: "center",
          }}
        >
          <Reveal direction="left">
            <Img src={artisan.image} alt={artisan.name} aspect="3/4" />
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <div>
              <CraftBadge craft={artisan.craft} />
              <h1
                style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontWeight: 200,
                  color: "var(--color-text-on-dark)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  fontSize: "clamp(34px, 4.5vw, 54px)",
                  margin: "20px 0 8px",
                }}
              >
                {artisan.name}
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontSize: 14,
                  color: "var(--color-text-on-dark-muted)",
                  marginBottom: 32,
                }}
              >
                {artisan.region} &middot; {artisan.yearsOfPractice} years
              </p>
              <Divider width="32px" color="var(--color-gold)" style={{ marginBottom: 32 }} />
              <p
                style={{
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontWeight: 400,
                  color: "var(--color-text-on-dark-soft)",
                  lineHeight: 2,
                  fontSize: 16,
                }}
              >
                {artisan.story}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontWeight: 300,
                  color: "var(--color-gold-highlight)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.65,
                  fontSize: 20,
                  fontStyle: "italic",
                  marginTop: 40,
                }}
              >
                &ldquo;{artisan.quote}&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 32px 120px" }}>
        <Reveal>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
              fontWeight: 300,
              color: "var(--color-dark)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontSize: 32,
              marginBottom: 48,
            }}
          >
            Pieces by {artisan.name}
          </h2>
        </Reveal>
        <ProductGrid products={artisanProducts} artisans={artisanMap} />
      </section>
    </div>
  );
}
