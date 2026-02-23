import { Reveal } from "@/components/ui/Reveal";

const TRUST_ITEMS = [
  { icon: "\u2726", label: "Handcrafted", desc: "Every piece made by hand" },
  { icon: "\u25C8", label: "Direct Trade", desc: "80%+ goes to artisans" },
  { icon: "\u274B", label: "Heritage Crafts", desc: "Centuries-old techniques" },
  { icon: "\u25CE", label: "Authenticated", desc: "Certificate of origin" },
];

export function TrustBar() {
  return (
    <section
      style={{
        padding: "88px 32px",
        background: "var(--color-bg-alt)",
        borderTop: "1px solid var(--color-divider)",
        borderBottom: "1px solid var(--color-divider)",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 48,
          textAlign: "center",
        }}
      >
        {TRUST_ITEMS.map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div>
              <span
                style={{ fontSize: "24px", color: "var(--color-gold)", display: "block", marginBottom: 4 }}
              >
                {t.icon}
              </span>
              <h4
                style={{
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "var(--color-dark)",
                  margin: "14px 0 8px",
                }}
              >
                {t.label}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontSize: "13px",
                  color: "var(--color-light)",
                }}
              >
                {t.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
