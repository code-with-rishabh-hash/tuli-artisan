"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  { href: "/account/profile", label: "Profile" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/wishlist", label: "Wishlist" },
  { href: "/account/preferences", label: "Preferences" },
];

export default function AccountSidebar({ userName }: { userName?: string | null }) {
  const pathname = usePathname();

  return (
    <nav
      style={{
        minWidth: 220,
        borderRight: "1px solid var(--color-divider)",
        paddingRight: 40,
      }}
    >
      {userName && (
        <div style={{ marginBottom: 32 }}>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 22,
              fontWeight: 400,
              color: "var(--color-dark)",
              marginBottom: 4,
            }}
          >
            {userName}
          </p>
          <p
            style={{
              fontFamily: "var(--font-karla)",
              fontSize: 11,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--color-light)",
            }}
          >
            My Account
          </p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                padding: "10px 16px",
                fontFamily: "var(--font-karla)",
                fontSize: 13,
                letterSpacing: "0.5px",
                color: isActive ? "var(--color-dark)" : "var(--color-mid)",
                textDecoration: "none",
                background: isActive ? "var(--color-bg-alt)" : "transparent",
                fontWeight: isActive ? 500 : 400,
                transition: "all 0.2s ease",
              }}
            >
              {link.label}
            </Link>
          );
        })}

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            display: "block",
            padding: "10px 16px",
            fontFamily: "var(--font-karla)",
            fontSize: 13,
            letterSpacing: "0.5px",
            color: "var(--color-light)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            marginTop: 12,
            transition: "color 0.2s ease",
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
