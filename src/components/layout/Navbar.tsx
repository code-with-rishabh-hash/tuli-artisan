"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { useCart } from "@/context/CartContext";
import { EASE, EASE_HOVER } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Artisans", href: "/artisans" },
  { label: "Our Story", href: "/story" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navTextColor = isTransparent ? "rgba(237,232,223,0.75)" : "var(--color-light)";
  const navActiveColor = isTransparent ? "var(--color-text-on-dark)" : "var(--color-dark)";
  const brandColor = isTransparent ? "var(--color-text-on-dark)" : "var(--color-dark)";
  const brandSubColor = isTransparent ? "rgba(237,232,223,0.4)" : "var(--color-light)";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "14px 40px" : "22px 40px",
          background: isTransparent ? "transparent" : "var(--color-nav-bg)",
          backdropFilter: isTransparent ? "none" : "blur(24px) saturate(1.2)",
          borderBottom: isTransparent ? "none" : "1px solid var(--color-divider)",
          transition: `all 0.6s ${EASE}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
              fontSize: "30px",
              fontWeight: 600,
              color: brandColor,
              letterSpacing: "-0.5px",
              transition: `color 0.5s ${EASE_HOVER}`,
            }}
          >
            Tuli
          </span>
          <span
            style={{
              fontFamily: 'var(--font-karla, "Karla", sans-serif)',
              fontSize: "7px",
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              fontWeight: 600,
              color: brandSubColor,
              transition: `color 0.5s ${EASE_HOVER}`,
            }}
          >
            Artisan
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="tuli-desktop-nav" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontSize: "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: isActive ? navActiveColor : navTextColor,
                  textDecoration: "none",
                  borderBottom: isActive ? `1px solid ${navActiveColor}` : "1px solid transparent",
                  paddingBottom: "3px",
                  transition: `color 0.4s ${EASE_HOVER}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = navActiveColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive ? navActiveColor : navTextColor;
                }}
              >
                {l.label}
              </Link>
            );
          })}

          <ThemeToggle color={isTransparent ? "var(--color-text-on-dark)" : "var(--color-dark)"} />

          <Link
            href="/cart"
            style={{
              fontFamily: 'var(--font-karla, "Karla", sans-serif)',
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 600,
              position: "relative",
              textDecoration: "none",
              color: navTextColor,
              transition: `color 0.4s ${EASE_HOVER}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = navActiveColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = navTextColor;
            }}
          >
            Bag
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -8,
                  right: -16,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "var(--color-gold)",
                  color: "#fff",
                  fontSize: "9px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="tuli-mobile-controls" style={{ display: "none", alignItems: "center", gap: "8px" }}>
          <ThemeToggle
            color={
              menuOpen
                ? "var(--color-dark)"
                : isTransparent
                  ? "var(--color-text-on-dark)"
                  : "var(--color-dark)"
            }
          />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              zIndex: 1001,
              padding: 4,
              background: "none",
              border: "none",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 22,
                  height: "1.5px",
                  display: "block",
                  background:
                    menuOpen || !isTransparent
                      ? "var(--color-dark)"
                      : "var(--color-text-on-dark)",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translateY(6.5px)"
                      : i === 1
                        ? "scaleX(0)"
                        : "rotate(-45deg) translateY(-6.5px)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                  transition: `all 0.4s ${EASE}`,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {menuOpen && <MobileMenu cartCount={cartCount} onClose={() => setMenuOpen(false)} />}
    </>
  );
}
