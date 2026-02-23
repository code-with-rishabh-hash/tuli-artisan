import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HoverImg } from "@/components/ui/HoverImg";
import { CraftBadge } from "@/components/ui/CraftBadge";
import { ARTISANS } from "@/data/artisans";
import { EASE, EASE_HOVER } from "@/lib/constants";

export function ArtisanSpotlight() {
  return (
    <section style={{ padding: "130px 32px", background: "var(--color-bg)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <Divider width="32px" color="var(--color-gold)" style={{ margin: "0 auto 28px" }} />
            <SectionLabel>Meet the Makers</SectionLabel>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontWeight: 300,
                color: "var(--color-dark)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontSize: "clamp(30px, 4vw, 48px)",
                marginTop: 10,
              }}
            >
              Our Artisans
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "32px",
          }}
        >
          {ARTISANS.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.12}>
              <Link
                href={`/artisan/${a.id}`}
                className="tuli-card-hover"
                style={{
                  cursor: "pointer",
                  background: "var(--color-surface)",
                  overflow: "hidden",
                  border: "1px solid var(--color-divider)",
                  transition: `transform 0.6s ${EASE}, box-shadow 0.6s ${EASE_HOVER}`,
                  display: "block",
                  textDecoration: "none",
                }}
              >
                <HoverImg src={a.image} alt={a.name} aspect="4/3" />
                <div style={{ padding: "32px 32px 36px" }}>
                  <CraftBadge craft={a.craft} />
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                      fontWeight: 400,
                      color: "var(--color-dark)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      fontSize: "24px",
                      margin: "16px 0 6px",
                    }}
                  >
                    {a.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                      fontSize: "12px",
                      color: "var(--color-gold)",
                      letterSpacing: "0.5px",
                      marginBottom: 16,
                    }}
                  >
                    {a.region} &middot; {a.yearsOfPractice} years
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                      fontWeight: 400,
                      color: "var(--color-mid)",
                      lineHeight: 1.8,
                      fontSize: "14px",
                    }}
                  >
                    {a.bio}
                  </p>
                  <Divider width="28px" color="var(--color-gold)" style={{ marginTop: 24 }} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
