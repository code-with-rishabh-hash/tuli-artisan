import type { Metadata } from "next";
import Link from "next/link";
import { getCollections } from "@/lib/dal";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EASE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Collections",
  description: "Thoughtfully curated edits that tell a story through craft, color, and heritage.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

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
              Collections
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontWeight: 400,
                color: "var(--color-light)",
                lineHeight: 1.8,
                fontSize: "15.5px",
                maxWidth: 500,
                margin: "18px auto 0",
              }}
            >
              Thoughtfully curated edits that tell a story through craft, color, and heritage.
            </p>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {collections.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1} direction="scale">
              <Link
                href={`/collection/${c.slug}`}
                className="tuli-zoom-parent"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  minHeight: 340,
                  display: "flex",
                  alignItems: "flex-end",
                  transition: `transform 0.6s ${EASE}`,
                  textDecoration: "none",
                }}
              >
                <div
                  className="tuli-zoom-img"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${c.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.38)",
                    transition: `transform 0.8s ${EASE}`,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    padding: "clamp(36px, 5vw, 72px)",
                  }}
                >
                  <SectionLabel color="var(--color-text-on-dark-muted)">{c.season}</SectionLabel>
                  <h2
                    style={{
                      fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                      fontWeight: 200,
                      color: "var(--color-text-on-dark)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      fontSize: "clamp(30px, 4vw, 54px)",
                      margin: "10px 0",
                    }}
                  >
                    {c.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                      fontWeight: 400,
                      color: "var(--color-text-on-dark-soft)",
                      lineHeight: 1.8,
                      fontSize: 15,
                      fontStyle: "italic",
                    }}
                  >
                    {c.subtitle}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                      fontSize: 10,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "var(--color-gold-highlight)",
                      display: "inline-block",
                      marginTop: 22,
                      borderBottom: "1px solid var(--color-gold-highlight)",
                      paddingBottom: 3,
                    }}
                  >
                    {c.productIds.length} Pieces &rarr;
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
