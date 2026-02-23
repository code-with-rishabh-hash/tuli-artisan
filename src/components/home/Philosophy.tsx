import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";

export function Philosophy() {
  return (
    <section style={{ padding: "130px 32px", background: "var(--color-bg)", textAlign: "center" }}>
      <Reveal>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Divider width="32px" color="var(--color-gold)" style={{ margin: "0 auto 32px" }} />
          <h2
            style={{
              fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
              fontWeight: 300,
              color: "var(--color-dark)",
              letterSpacing: "-0.02em",
              lineHeight: 1.45,
              fontSize: "clamp(26px, 4vw, 40px)",
              fontStyle: "italic",
            }}
          >
            &ldquo;We don&apos;t sell products.
            <br />
            We preserve legacies.&rdquo;
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-karla, "Karla", sans-serif)',
              fontWeight: 400,
              color: "var(--color-light)",
              lineHeight: 1.8,
              fontSize: "15.5px",
              marginTop: "28px",
              maxWidth: "540px",
              margin: "28px auto 0",
            }}
          >
            Tuli connects you directly to master artisans &mdash; no middlemen, no markups, no mass
            production. Each piece is made to order, carrying centuries of tradition in every stitch,
            pour, and weave.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
