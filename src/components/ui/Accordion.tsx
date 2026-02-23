"use client";

import { useState } from "react";
import { EASE } from "@/lib/constants";

interface AccordionProps {
  title: string;
  content: string;
}

export function Accordion({ title, content }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid var(--color-divider)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: 'var(--font-karla, "Karla", sans-serif)',
          fontSize: "11px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "var(--color-dark)",
        }}
      >
        {title}
        <span
          style={{
            transform: open ? "rotate(45deg)" : "none",
            transition: `transform 0.4s ${EASE}`,
            fontSize: 20,
            fontWeight: 300,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          overflow: "hidden",
          transition: `max-height 0.5s ${EASE}`,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-karla, "Karla", sans-serif)',
            fontWeight: 400,
            color: "var(--color-mid)",
            lineHeight: 1.8,
            fontSize: "13px",
            paddingBottom: 22,
          }}
        >
          {content}
        </p>
      </div>
    </div>
  );
}
