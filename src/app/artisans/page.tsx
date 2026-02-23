import type { Metadata } from "next";
import { getArtisans, getDistinctCrafts, getDistinctStates } from "@/lib/dal";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import ArtisanFilters from "@/components/artisan/ArtisanFilters";

export const metadata: Metadata = {
  title: "Our Artisans",
  description:
    "Meet the master craftspeople behind every Tuli piece. Decades of practice, centuries of tradition.",
};

export default async function ArtisansPage() {
  const [artisans, crafts, states] = await Promise.all([
    getArtisans(),
    getDistinctCrafts(),
    getDistinctStates(),
  ]);

  return (
    <div style={{ paddingTop: 130, background: "var(--color-bg)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 120px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <Divider width="32px" color="var(--color-gold)" style={{ margin: "0 auto 28px" }} />
            <h1
              style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontWeight: 200,
                color: "var(--color-dark)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontSize: "clamp(36px, 5vw, 56px)",
              }}
            >
              Our Artisans
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontWeight: 400,
                color: "var(--color-light)",
                lineHeight: 1.8,
                fontSize: "15.5px",
                maxWidth: 540,
                margin: "18px auto 0",
              }}
            >
              Every piece is created by a master craftsperson &mdash; someone who has dedicated
              their life to preserving ancient techniques.
            </p>
          </div>
        </Reveal>

        <ArtisanFilters artisans={artisans} crafts={crafts} states={states} />
      </div>
    </div>
  );
}
