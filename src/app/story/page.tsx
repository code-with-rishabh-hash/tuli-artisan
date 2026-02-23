import type { Metadata } from "next";
import { IMAGES } from "@/data/images";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Img } from "@/components/ui/Img";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Tuli was born from a simple revelation: extraordinary craftsmanship exists in India's villages, yet remains invisible.",
};

const PRINCIPLES = [
  {
    title: "Direct Trade",
    text: "80% or more of every sale goes directly to the artisan. No exploitative supply chains.",
  },
  {
    title: "Slow Craft",
    text: "We don\u2019t rush. Every piece is made to order, honoring the time genuine craftsmanship demands.",
  },
  {
    title: "Story First",
    text: "Every product page tells the human story \u2014 because context transforms an object into a treasure.",
  },
  {
    title: "Living Heritage",
    text: "We support artisans in passing their skills to the next generation, ensuring these crafts survive and evolve.",
  },
];

export default function StoryPage() {
  return (
    <div style={{ paddingTop: 110, background: "var(--color-bg)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "52px 32px 120px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 68 }}>
            <Divider width="32px" color="var(--color-gold)" style={{ margin: "0 auto 28px" }} />
            <SectionLabel>Est. 2026</SectionLabel>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontWeight: 200,
                color: "var(--color-dark)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontSize: "clamp(38px, 5vw, 62px)",
                marginTop: 14,
              }}
            >
              Our Story
            </h1>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Img src={IMAGES.workshop} alt="Workshop" aspect="16/7" style={{ marginBottom: 52 }} />
        </Reveal>

        <Reveal delay={0.2}>
          <div
            style={{
              fontFamily: 'var(--font-karla, "Karla", sans-serif)',
              fontWeight: 400,
              color: "var(--color-mid)",
              lineHeight: 1.8,
              fontSize: "15.5px",
            }}
          >
            <p style={{ marginBottom: 30 }}>
              Tuli was born from a simple revelation: some of the world&apos;s most extraordinary
              craftsmanship exists in India&apos;s villages, workshops, and homes &mdash; yet the
              artisans behind these marvels remain invisible to the people who would treasure their
              work most.
            </p>
            <p style={{ marginBottom: 30 }}>
              We set out to change that. Not by building another marketplace, but by creating a space
              where every product is a doorway into a story &mdash; of tradition, of patience, of
              mastery earned over decades.
            </p>

            <div
              style={{
                background: "var(--color-dark-bg)",
                padding: "60px 52px",
                margin: "52px -16px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontWeight: 300,
                  color: "var(--color-gold-highlight)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.55,
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontStyle: "italic",
                }}
              >
                &ldquo;In a world of mass production, the handmade is an act of resistance.&rdquo;
              </p>
            </div>

            <p style={{ marginTop: 52, marginBottom: 30 }}>
              At Tuli, we work directly with artisan families &mdash; no middlemen, no factory
              intermediaries. We pay fair prices upfront, not on commission. We tell their stories
              with the depth and respect they deserve.
            </p>

            <Img
              src={IMAGES.hands}
              alt="Artisan hands at work"
              aspect="16/9"
              style={{ margin: "44px 0" }}
            />

            <h2
              style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontWeight: 300,
                color: "var(--color-dark)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontSize: 32,
                margin: "56px 0 28px",
              }}
            >
              Our Principles
            </h2>
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={{ marginBottom: 36 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--color-dark)",
                    marginBottom: 10,
                    letterSpacing: "0.3px",
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ color: "var(--color-mid)" }}>{p.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
