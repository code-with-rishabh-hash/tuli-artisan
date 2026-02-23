import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IMAGES } from "@/data/images";

export function CollectionBanner() {
  return (
    <section style={{ padding: "0 32px", background: "var(--color-bg)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal direction="scale">
          <Link
            href="/collection/monsoon-edit"
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              minHeight: "460px",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
            className="tuli-zoom-parent"
          >
            <div
              className="tuli-zoom-img"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${IMAGES.monsoon})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.4)",
                transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 2,
                padding: "clamp(48px, 6vw, 88px) clamp(48px, 5vw, 88px)",
              }}
            >
              <SectionLabel color="var(--color-text-on-dark-muted)">New Collection</SectionLabel>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontWeight: 200,
                  color: "var(--color-text-on-dark)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  fontSize: "clamp(36px, 5vw, 64px)",
                  margin: "12px 0",
                }}
              >
                The Monsoon Edit
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontWeight: 400,
                  color: "var(--color-text-on-dark-soft)",
                  lineHeight: 1.8,
                  fontSize: "15.5px",
                  maxWidth: "440px",
                  fontStyle: "italic",
                }}
              >
                Rain-inspired indigos &amp; earthy textures
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontSize: "10px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "var(--color-gold-highlight)",
                  display: "inline-block",
                  marginTop: 28,
                  borderBottom: "1px solid var(--color-gold-highlight)",
                  paddingBottom: 3,
                }}
              >
                Explore Collection &rarr;
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
