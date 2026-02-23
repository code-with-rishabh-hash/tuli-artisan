interface CraftBadgeProps {
  craft: string;
}

export function CraftBadge({ craft }: CraftBadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "6px 14px",
        border: "1px solid var(--color-divider)",
        fontFamily: 'var(--font-karla, "Karla", sans-serif)',
        fontSize: "9px",
        letterSpacing: "3px",
        textTransform: "uppercase",
        fontWeight: 600,
        color: "var(--color-light)",
      }}
    >
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "var(--color-gold)",
        }}
      />
      {craft}
    </span>
  );
}
