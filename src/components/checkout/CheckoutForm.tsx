"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Script from "next/script";

interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

interface CheckoutFormProps {
  addresses: Address[];
  isLoggedIn: boolean;
  userEmail?: string;
  isDemo?: boolean;
}

export default function CheckoutForm({ addresses, isLoggedIn, userEmail, isDemo }: CheckoutFormProps) {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id ?? "");
  const [promoCode, setPromoCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  // Guest fields
  const [guestEmail, setGuestEmail] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestLine1, setGuestLine1] = useState("");
  const [guestLine2, setGuestLine2] = useState("");
  const [guestCity, setGuestCity] = useState("");
  const [guestState, setGuestState] = useState("");
  const [guestPincode, setGuestPincode] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid var(--color-divider)",
    background: "var(--color-surface)",
    color: "var(--color-dark)",
    fontFamily: "var(--font-karla)",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-karla)",
    fontSize: 11,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "var(--color-mid)",
    marginBottom: 4,
    display: "block",
  };

  function validateGuest() {
    if (!guestEmail || !guestEmail.includes("@")) return "Valid email is required";
    if (!guestName.trim()) return "Name is required";
    if (!guestPhone || guestPhone.length < 10) return "Valid phone number is required";
    if (!guestLine1.trim()) return "Address line 1 is required";
    if (!guestCity.trim()) return "City is required";
    if (!guestState.trim()) return "State is required";
    if (!guestPincode || guestPincode.length !== 6) return "Valid 6-digit pincode is required";
    return null;
  }

  async function handleCheckout() {
    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    if (isLoggedIn && !selectedAddress && addresses.length > 0) {
      setError("Please select a shipping address");
      return;
    }

    if (!isLoggedIn) {
      const validationError = validateGuest();
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setProcessing(true);
    setError("");

    // Demo mode — simulate a successful order
    if (isDemo) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      clearCart();
      router.push("/order-confirmation/demo");
      return;
    }

    try {
      const body: Record<string, unknown> = {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.qty,
          selectedColor: item.selectedColor,
        })),
        promoCode: promoCode || undefined,
      };

      if (isLoggedIn) {
        body.addressId = selectedAddress;
      } else {
        body.guest = {
          email: guestEmail,
          name: guestName,
          phone: guestPhone,
          line1: guestLine1,
          line2: guestLine2 || undefined,
          city: guestCity,
          state: guestState,
          pincode: guestPincode,
        };
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create order");
        setProcessing(false);
        return;
      }

      const { razorpayOrderId, amount, orderId } = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "Tuli Artisan",
        description: "Handcrafted with care",
        order_id: razorpayOrderId,
        prefill: {
          email: isLoggedIn ? userEmail : guestEmail,
          contact: isLoggedIn ? undefined : guestPhone,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/orders/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (verifyRes.ok) {
            clearCart();
            router.push(`/order-confirmation/${orderId}`);
          } else {
            setError("Payment verification failed. Please contact support.");
          }
        },
        theme: { color: "#B8960C" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setProcessing(false);
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48 }}>
        {/* Left: Shipping Info */}
        <div>
          {!isLoggedIn && (
            <>
              <div style={{ padding: "16px 20px", background: "var(--color-surface)", border: "1px solid var(--color-divider)", marginBottom: 28 }}>
                <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)" }}>
                  Have an account?{" "}
                  <Link href="/login?callbackUrl=/checkout" style={{ color: "var(--color-gold)", textDecoration: "none", fontWeight: 500 }}>
                    Sign in
                  </Link>{" "}
                  for a faster checkout.
                </p>
              </div>

              <h3 style={{ fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-mid)", marginBottom: 16 }}>
                Contact Information
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Email</label>
                  <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required placeholder="you@example.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} required placeholder="Your full name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input type="tel" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} required placeholder="10-digit mobile" style={inputStyle} />
                </div>
              </div>

              <h3 style={{ fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-mid)", marginBottom: 16 }}>
                Shipping Address
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32 }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Address Line 1</label>
                  <input type="text" value={guestLine1} onChange={(e) => setGuestLine1(e.target.value)} required placeholder="House/flat no., street" style={inputStyle} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Address Line 2 (optional)</label>
                  <input type="text" value={guestLine2} onChange={(e) => setGuestLine2(e.target.value)} placeholder="Landmark, area" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>City</label>
                  <input type="text" value={guestCity} onChange={(e) => setGuestCity(e.target.value)} required placeholder="City" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>State</label>
                  <input type="text" value={guestState} onChange={(e) => setGuestState(e.target.value)} required placeholder="State" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Pincode</label>
                  <input type="text" value={guestPincode} onChange={(e) => setGuestPincode(e.target.value)} required maxLength={6} placeholder="6-digit pincode" style={inputStyle} />
                </div>
              </div>
            </>
          )}

          {isLoggedIn && (
            <>
              <h3 style={{ fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-mid)", marginBottom: 16 }}>
                Shipping Address
              </h3>

              {addresses.length === 0 ? (
                <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)" }}>
                  No addresses saved. Please add one in your{" "}
                  <Link href="/account/addresses" style={{ color: "var(--color-gold)", textDecoration: "none" }}>account settings</Link>.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      style={{
                        display: "flex",
                        gap: 12,
                        padding: 16,
                        border: `1px solid ${selectedAddress === addr.id ? "var(--color-gold)" : "var(--color-divider)"}`,
                        background: "var(--color-surface)",
                        cursor: "pointer",
                        transition: "border-color 0.2s ease",
                      }}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        style={{ accentColor: "var(--color-gold)" }}
                      />
                      <div>
                        <p style={{ fontFamily: "var(--font-karla)", fontSize: 12, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--color-light)", marginBottom: 4 }}>{addr.label}</p>
                        <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-dark)", lineHeight: 1.6 }}>
                          {addr.name}<br />{addr.line1}{addr.line2 && `, ${addr.line2}`}<br />{addr.city}, {addr.state} {addr.pincode}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </>
          )}

          <h3 style={{ fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-mid)", marginBottom: 12 }}>
            Promo Code
          </h3>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              placeholder="Enter code"
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div>
          <h3 style={{ fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-mid)", marginBottom: 16 }}>
            Order Summary
          </h3>

          <div style={{ borderTop: "1px solid var(--color-divider)" }}>
            {cart.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--color-divider)" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-dark)" }}>
                    {item.name} &times; {item.qty}
                  </p>
                  <p style={{ fontFamily: "var(--font-karla)", fontSize: 12, color: "var(--color-light)" }}>
                    {item.selectedColor}
                  </p>
                </div>
                <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-dark)" }}>
                  {formatPrice(item.price * item.qty)}
                </p>
              </div>
            ))}
          </div>

          {cart.length === 0 && (
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)", padding: "20px 0" }}>
              Your cart is empty.{" "}
              <Link href="/shop" style={{ color: "var(--color-gold)", textDecoration: "none" }}>Continue shopping</Link>
            </p>
          )}

          <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)" }}>
              <span>Subtotal</span><span>{formatPrice(cartTotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)" }}>
              <span>Shipping</span><span>Free</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-karla)", fontSize: 15, fontWeight: 500, color: "var(--color-dark)", paddingTop: 12, borderTop: "1px solid var(--color-divider)" }}>
              <span>Total</span><span>{formatPrice(cartTotal)}</span>
            </div>
          </div>

          {error && (
            <p style={{ color: "#A63D2F", fontSize: 13, fontFamily: "var(--font-karla)", marginTop: 16 }}>
              {error}
            </p>
          )}

          <button
            onClick={handleCheckout}
            disabled={processing || cart.length === 0}
            style={{
              width: "100%",
              padding: "16px",
              background: "var(--color-dark)",
              color: "var(--color-cream)",
              fontFamily: "var(--font-karla)",
              fontSize: 12,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              border: "none",
              cursor: processing ? "wait" : "pointer",
              opacity: processing || cart.length === 0 ? 0.6 : 1,
              marginTop: 24,
              transition: "opacity 0.3s ease",
            }}
          >
            {processing ? "Processing..." : "Pay with Razorpay"}
          </button>
        </div>
      </div>
    </>
  );
}
