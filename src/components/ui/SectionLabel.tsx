interface SectionLabelProps {
  children: React.ReactNode;
  color?: string;
}

export function SectionLabel({ children, color }: SectionLabelProps) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-karla, "Karla", sans-serif)',
        fontSize: "10px",
        letterSpacing: "3px",
        textTransform: "uppercase",
        fontWeight: 600,
        color: color || "var(--color-light)",
        display: "block",
      }}
    >
      {children}
    </span>
  );
}
