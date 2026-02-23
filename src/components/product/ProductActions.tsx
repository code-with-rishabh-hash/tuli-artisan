"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addToCart } = useCart();
  const [selColor, setSelColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ ...product, qty, selectedColor: product.colors[selColor] });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      {product.colors.length > 1 && (
        <div style={{ marginBottom: 28 }}>
          <span
            style={{
              fontFamily: 'var(--font-karla, "Karla", sans-serif)',
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--color-light)",
              display: "block",
            }}
          >
            Color &mdash; {product.colors[selColor]}
          </span>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {product.colors.map((c, i) => (
              <button
                key={i}
                onClick={() => setSelColor(i)}
                style={{
                  padding: "10px 22px",
                  border:
                    selColor === i
                      ? "1.5px solid var(--color-dark)"
                      : "1px solid var(--color-divider)",
                  background: "transparent",
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontSize: 12,
                  cursor: "pointer",
                  color: "var(--color-dark)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
        <div
          style={{
            display: "flex",
            border: "1px solid var(--color-divider)",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            style={{
              width: 48,
              height: 52,
              border: "none",
              background: "transparent",
              fontSize: 18,
              cursor: "pointer",
              color: "var(--color-dark)",
            }}
          >
            &minus;
          </button>
          <span
            style={{
              width: 44,
              textAlign: "center",
              fontFamily: 'var(--font-karla, "Karla", sans-serif)',
              fontSize: 14,
              color: "var(--color-dark)",
            }}
          >
            {qty}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            style={{
              width: 48,
              height: 52,
              border: "none",
              background: "transparent",
              fontSize: 18,
              cursor: "pointer",
              color: "var(--color-dark)",
            }}
          >
            +
          </button>
        </div>
        <button
          onClick={handleAdd}
          className="tuli-btn-primary"
          style={{ flex: 1, minWidth: 200, fontSize: 12 }}
        >
          {added ? "\u2713 Added to Bag" : "Add to Bag"}
        </button>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-karla, "Karla", sans-serif)',
          fontSize: 12,
          color: "var(--color-light)",
          marginBottom: 40,
        }}
      >
        &#10022; Time to create: {product.timeToCreate} &nbsp;&nbsp; &#9678; Certificate of
        authenticity included
      </p>
    </>
  );
}
