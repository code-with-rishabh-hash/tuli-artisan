import type { Metadata } from "next";
import Link from "next/link";
import { ARTISANS } from "@/data/artisans";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import { HoverImg } from "@/components/ui/HoverImg";
import { CraftBadge } from "@/components/ui/CraftBadge";

export const metadata: Metadata = {
  title: "Our Artisans",
  description:
    "Meet the master craftspeople behind every Tuli piece. Decades of practice, centuries of tradition.",
};

export default function ArtisansPage() {
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
        <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
          {ARTISANS.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.12}>
              <Link
                href={`/artisan/${a.id}`}
                className="tuli-artisan-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: i % 2 === 0 ? "1fr 1.4fr" : "1.4fr 1fr",
                  gap: 64,
                  cursor: "pointer",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{ order: i % 2 === 0 ? 0 : 1 }}
                  className="tuli-artisan-img"
                >
                  <HoverImg src={a.image} alt={a.name} aspect="3/4" />
                </div>
                <div>
                  <CraftBadge craft={a.craft} />
                  <h2
                    style={{
                      fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                      fontWeight: 300,
                      color: "var(--color-dark)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      fontSize: "clamp(28px, 3.5vw, 42px)",
                      margin: "20px 0 8px",
                    }}
                  >
                    {a.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                      fontSize: 13,
                      color: "var(--color-gold)",
                      marginBottom: 20,
                    }}
                  >
                    {a.region} &middot; {a.yearsOfPractice} years of practice
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                      fontWeight: 400,
                      color: "var(--color-mid)",
                      lineHeight: 1.8,
                      fontSize: "15.5px",
                      marginBottom: 28,
                    }}
                  >
                    {a.bio}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                      fontWeight: 300,
                      color: "var(--color-light)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.65,
                      fontSize: 17,
                      fontStyle: "italic",
                      borderLeft: "2px solid var(--color-gold)",
                      paddingLeft: 20,
                    }}
                  >
                    &ldquo;{a.quote}&rdquo;
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
