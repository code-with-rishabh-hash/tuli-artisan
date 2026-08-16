"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useParallax } from "@/hooks/use-parallax";
import { IMAGES } from "@/data/images";

// The craft archive is genuinely indexed - numbering earns its place here.
const CRAFT_INDEX = [
  { no: "01", name: "Indigo Dabu" },
  { no: "02", name: "Brass Metalwork" },
  { no: "03", name: "Handloom Ikat" },
  { no: "04", name: "Terracotta" },
];

export function Hero() {
  const [parallaxRef, pOffset] = useParallax(0.12);

  return (
    <section
      ref={parallaxRef as React.RefObject<HTMLElement>}
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        background: "linear-gradient(160deg, var(--color-indigo) 0%, var(--color-indigo-deep) 100%)",
      }}
    >
      {/* Full-bleed photography - an artisan's hands / indigo dye vat lives here */}
      <div
        style={{
          position: "absolute",
          inset: "-10%",
          backgroundImage: `url(${IMAGES.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${pOffset}px) scale(1.1)`,
          filter: "brightness(0.5) saturate(0.85)",
          transition: "transform 0.05s linear",
        }}
      />
      {/* Indigo wash so type always reads */}
      <div style={{ position: "absolute", inset: 0, background: "var(--color-hero-overlay)" }} />
      {/* Hand block-print (buti) texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "var(--tex-buti)",
          backgroundSize: "150px 150px",
          opacity: 0.1,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 40px 9vh",
        }}
      >
        <div className="tuli-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "flex-end" }}>
          {/* Headline block - left aligned, editorial */}
          <div>
            <Reveal delay={0.15}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "26px" }}>
                <span style={{ height: 1, width: 46, background: "var(--color-gold)" }} />
                <SectionLabel color="var(--color-gold-highlight)">
                  Handcrafted across India
                </SectionLabel>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <h1
                style={{
                  fontFamily: 'var(--font-cormorant, "Bodoni Moda", serif)',
                  fontWeight: 400,
                  color: "var(--color-text-on-dark)",
                  letterSpacing: "-0.01em",
                  lineHeight: 0.95,
                  fontSize: "clamp(52px, 10vw, 132px)",
                  margin: "0 0 10px",
                  textWrap: "balance",
                }}
              >
                Where craft
                <br />
                becomes{" "}
                <em style={{ fontStyle: "italic", color: "var(--color-gold-highlight)" }}>legacy</em>
              </h1>
            </Reveal>
            <Reveal delay={0.45}>
              <p
                style={{
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontWeight: 400,
                  color: "var(--color-text-on-dark-soft)",
                  lineHeight: 1.8,
                  fontSize: "16px",
                  maxWidth: "440px",
                  margin: "30px 0 38px",
                }}
              >
                Not a marketplace, but an archive of living traditions. Every piece is made to order
                by a single pair of hands, and carries the name of the one who made it.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link href="/shop">
                  <button
                    className="tuli-btn-primary"
                    style={{ background: "var(--color-gold)", color: "var(--color-indigo-deep)" }}
                  >
                    Enter the Archive
                  </button>
                </Link>
                <Link href="/artisans">
                  <button className="tuli-btn-ghost">Meet the Makers</button>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Specimen index rail */}
          <Reveal delay={0.5} direction="left">
            <div
              className="tuli-hero-index"
              style={{
                borderLeft: "1px solid var(--color-divider)",
                paddingLeft: "22px",
                minWidth: "210px",
              }}
            >
              <SectionLabel color="var(--color-text-on-dark-muted)">The Crafts</SectionLabel>
              <div style={{ marginTop: "18px" }}>
                {CRAFT_INDEX.map((c) => (
                  <div
                    key={c.no}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "baseline",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--color-divider)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-cormorant, "Bodoni Moda", serif)',
                        fontSize: "13px",
                        color: "var(--color-gold-highlight)",
                        width: "30px",
                      }}
                    >
                      {c.no}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                        fontSize: "12px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        color: "var(--color-text-on-dark-soft)",
                      }}
                    >
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 2,
          animation: "tuliBounce 3s ease infinite",
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-karla, "Karla", sans-serif)',
            fontSize: "8px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "var(--color-text-on-dark-muted)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 32,
            background: "linear-gradient(var(--color-gold), transparent)",
            margin: "10px auto 0",
          }}
        />
      </div>
    </section>
  );
}
