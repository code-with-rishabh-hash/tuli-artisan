"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal } = useCart();

  return (
    <div style={{ paddingTop: 130, background: "var(--color-bg)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px 120px" }}>
        <Reveal>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
              fontWeight: 300,
              color: "var(--color-dark)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontSize: 40,
              marginBottom: 48,
            }}
          >
            Your Bag
          </h1>
        </Reveal>
        {cart.length === 0 ? (
          <Reveal delay={0.15}>
            <div style={{ textAlign: "center", padding: "88px 0" }}>
              <p
                style={{
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontWeight: 400,
                  color: "var(--color-light)",
                  lineHeight: 1.8,
                  fontSize: "15.5px",
                  marginBottom: 32,
                }}
              >
                Your bag is empty
              </p>
              <Link href="/shop">
                <button className="tuli-btn-primary">Continue Shopping</button>
              </Link>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.15}>
            <div>
              {cart.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr auto",
                    gap: 22,
                    alignItems: "center",
                    padding: "28px 0",
                    borderBottom: "1px solid var(--color-divider)",
                  }}
                >
                  <Img src={item.image} alt={item.name} aspect="3/4" style={{ width: 80 }} />
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                        fontWeight: 400,
                        color: "var(--color-dark)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                        fontSize: 17,
                        marginBottom: 6,
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                        fontSize: 12,
                        color: "var(--color-light)",
                      }}
                    >
                      {item.selectedColor} &middot; Qty: {item.qty}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                        fontSize: 17,
                        fontWeight: 600,
                        color: "var(--color-dark)",
                        marginBottom: 10,
                      }}
                    >
                      {formatPrice(item.price * item.qty)}
                    </p>
                    <button
                      onClick={() => removeFromCart(i)}
                      style={{
                        background: "none",
                        border: "none",
                        fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                        fontSize: 11,
                        color: "var(--color-light)",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "36px 0",
                  borderTop: "2px solid var(--color-dark)",
                  marginTop: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                    fontSize: "12px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "var(--color-dark)",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                    fontSize: 28,
                    fontWeight: 600,
                    color: "var(--color-dark)",
                  }}
                >
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <button className="tuli-btn-primary" style={{ width: "100%", fontSize: 12 }}>
                Proceed to Checkout
              </button>
              <p
                style={{
                  fontFamily: 'var(--font-karla, "Karla", sans-serif)',
                  fontSize: 12,
                  color: "var(--color-light)",
                  textAlign: "center",
                  marginTop: 18,
                }}
              >
                Free shipping on orders above &#8377;3,000
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
