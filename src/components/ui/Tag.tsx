import type { TagVariant } from "@/types";

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
}

const VARIANT_STYLES: Record<TagVariant, React.CSSProperties> = {
  default: {
    background: "var(--color-btn-primary-bg)",
    color: "var(--color-btn-primary-text)",
  },
  gold: {
    background: "var(--color-gold)",
    color: "#fff",
  },
  outline: {
    background: "transparent",
    color: "var(--color-dark)",
    border: "1px solid var(--color-divider)",
  },
  sale: {
    background: "#A63D2F",
    color: "#fff",
  },
};

export function Tag({ children, variant = "default" }: TagProps) {
  return (
    <span
      style={{
        ...VARIANT_STYLES[variant],
        padding: "5px 14px",
        fontSize: "9px",
        fontFamily: 'var(--font-karla, "Karla", sans-serif)',
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        fontWeight: 600,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}
