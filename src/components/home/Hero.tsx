"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useParallax } from "@/hooks/use-parallax";
import { IMAGES } from "@/data/images";

export function Hero() {
  const [parallaxRef, pOffset] = useParallax(0.12);

  return (
    <section
      ref={parallaxRef as React.RefObject<HTMLElement>}
      style={{
        minHeight: "105vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-10%",
          backgroundImage: `url(${IMAGES.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${pOffset}px) scale(1.1)`,
          filter: "brightness(0.4) contrast(1.1)",
          transition: "transform 0.05s linear",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--color-hero-overlay)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "900px",
          padding: "0 32px",
        }}
      >
        <Reveal delay={0.4}>
          <Divider
            width="32px"
            color="rgba(212,181,69,0.5)"
            style={{ margin: "0 auto 24px" }}
          />
        </Reveal>
        <Reveal delay={0.6}>
          <SectionLabel color="var(--color-text-on-dark-muted)">
            Where Craft Becomes Legacy
          </SectionLabel>
        </Reveal>
        <Reveal delay={0.8}>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
              fontWeight: 300,
              color: "var(--color-text-on-dark)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontSize: "clamp(48px, 9vw, 100px)",
              margin: "24px 0 28px",
            }}
          >
            Handcrafted by
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-gold-highlight)" }}>
              India&apos;s Finest
            </em>
            <br />
            Artisans
          </h1>
        </Reveal>
        <Reveal delay={1.0}>
          <p
            style={{
              fontFamily: 'var(--font-karla, "Karla", sans-serif)',
              fontWeight: 400,
              color: "var(--color-text-on-dark-soft)",
              lineHeight: 1.85,
              fontSize: "16.5px",
              maxWidth: "500px",
              margin: "0 auto 52px",
            }}
          >
            Every piece tells a story of heritage, patience, and mastery. Directly from artisan
            hands to your home.
          </p>
        </Reveal>
        <Reveal delay={1.2}>
          <div style={{ display: "flex", gap: "18px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/shop">
              <button className="tuli-btn-primary">Explore the Collection</button>
            </Link>
            <Link href="/story">
              <button className="tuli-btn-ghost">Our Story</button>
            </Link>
          </div>
        </Reveal>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
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
            color: "rgba(237,232,223,0.2)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 32,
            background: "linear-gradient(rgba(237,232,223,0.2), transparent)",
            margin: "10px auto 0",
          }}
        />
      </div>
    </section>
  );
}
