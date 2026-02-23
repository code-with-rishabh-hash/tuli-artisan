"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      style={{
        display: "flex",
        gap: 8,
        fontFamily: 'var(--font-karla, "Karla", sans-serif)',
        fontSize: 12,
        color: "var(--color-light)",
        marginBottom: 28,
      }}
    >
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", gap: 8 }}>
          {i > 0 && <span>/</span>}
          {item.href ? (
            <Link
              href={item.href}
              style={{
                color: "var(--color-light)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-dark)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-light)";
              }}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "var(--color-dark)" }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
