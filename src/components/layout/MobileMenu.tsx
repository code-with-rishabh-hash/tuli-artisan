"use client";

import Link from "next/link";
import { EASE } from "@/lib/constants";

const LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Artisans", href: "/artisans" },
  { label: "Our Story", href: "/story" },
];

interface MobileMenuProps {
  cartCount: number;
  onClose: () => void;
}

export function MobileMenu({ cartCount, onClose }: MobileMenuProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "var(--color-bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      {LINKS.map((l, i) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={onClose}
          style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontWeight: 300,
            color: "var(--color-dark)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            fontSize: "38px",
            textDecoration: "none",
            opacity: 0,
            animation: `tuliSlideIn 0.6s ${EASE} ${i * 0.08}s forwards`,
          }}
        >
          {l.label}
        </Link>
      ))}
      <Link
        href="/cart"
        onClick={onClose}
        style={{
          fontFamily: 'var(--font-karla, "Karla", sans-serif)',
          fontSize: "12px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "var(--color-gold)",
          textDecoration: "none",
          marginTop: 8,
          opacity: 0,
          animation: `tuliSlideIn 0.6s ${EASE} ${LINKS.length * 0.08}s forwards`,
        }}
      >
        Bag {cartCount > 0 && `(${cartCount})`}
      </Link>
    </div>
  );
}
