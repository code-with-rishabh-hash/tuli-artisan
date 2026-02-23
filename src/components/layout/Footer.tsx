"use client";

import Link from "next/link";
import { Divider } from "@/components/ui/Divider";

const SHOP_LINKS = ["All Products", "Collections", "New Arrivals", "Gifts"];
const ABOUT_LINKS = [
  { label: "Our Story", href: "/story" },
  { label: "Artisans", href: "/artisans" },
  { label: "Sustainability", href: "/story" },
  { label: "Press", href: "/story" },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-dark-bg)",
        color: "var(--color-text-on-dark)",
        padding: "92px 32px 44px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Divider width="48px" color="var(--color-gold)" style={{ marginBottom: 56 }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 52,
            marginBottom: 72,
          }}
        >
          {/* Brand */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontSize: 28,
                fontWeight: 600,
                display: "block",
                color: "var(--color-text-on-dark)",
              }}
            >
              Tuli
            </span>
            <p
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontSize: 13,
                lineHeight: 1.85,
                color: "rgba(237,232,223,0.45)",
                marginTop: 18,
                maxWidth: 280,
              }}
            >
              Connecting you directly to India&apos;s finest artisans. Every purchase sustains a
              centuries-old craft tradition.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontSize: 9,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "rgba(237,232,223,0.25)",
                marginBottom: 22,
              }}
            >
              Shop
            </h4>
            {SHOP_LINKS.map((l) => (
              <p key={l}>
                <Link
                  href="/shop"
                  style={{
                    fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                    fontSize: 14,
                    color: "rgba(237,232,223,0.55)",
                    textDecoration: "none",
                    display: "inline-block",
                    marginBottom: 14,
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(237,232,223,0.85)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(237,232,223,0.55)";
                  }}
                >
                  {l}
                </Link>
              </p>
            ))}
          </div>

          {/* About links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontSize: 9,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "rgba(237,232,223,0.25)",
                marginBottom: 22,
              }}
            >
              About
            </h4>
            {ABOUT_LINKS.map((l) => (
              <p key={l.label}>
                <Link
                  href={l.href}
                  style={{
                    fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                    fontSize: 14,
                    color: "rgba(237,232,223,0.55)",
                    textDecoration: "none",
                    display: "inline-block",
                    marginBottom: 14,
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(237,232,223,0.85)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(237,232,223,0.55)";
                  }}
                >
                  {l.label}
                </Link>
              </p>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontSize: 9,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "rgba(237,232,223,0.25)",
                marginBottom: 22,
              }}
            >
              Stay in touch
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                fontSize: 13,
                color: "rgba(237,232,223,0.45)",
                marginBottom: 18,
                lineHeight: 1.75,
              }}
            >
              Join for early access &amp; 10% off your first order.
            </p>
            <div style={{ display: "flex" }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: "14px 16px",
                  background: "rgba(237,232,223,0.05)",
                  border: "1px solid rgba(237,232,223,0.1)",
                  borderRight: "none",
                  color: "var(--color-text-on-dark)",
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <button
                style={{
                  padding: "14px 24px",
                  background: "var(--color-gold)",
                  color: "#fff",
                  border: "none",
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-gold-highlight)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-gold)";
                }}
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: "1px solid rgba(237,232,223,0.06)",
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-karla, "Karla", sans-serif)',
              fontSize: 11,
              color: "rgba(237,232,223,0.2)",
            }}
          >
            &copy; 2026 Tuli Artisan. Handcrafted with care.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-karla, "Karla", sans-serif)',
              fontSize: 11,
              color: "rgba(237,232,223,0.2)",
            }}
          >
            Privacy &middot; Terms &middot; Shipping
          </p>
        </div>
      </div>
    </footer>
  );
}
