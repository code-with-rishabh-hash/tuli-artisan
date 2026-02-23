import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function formatDate(date: Date | null) {
  if (!date) return "---";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(date);
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

const steps = ["pending", "confirmed", "processing", "shipped", "delivered"];

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const { id } = await params;

  const order = await prisma.order.findFirst({
    where: { id, userId: session.user.id },
    include: {
      items: { include: { product: true } },
      address: true,
    },
  });

  if (!order) notFound();

  const currentStep = steps.indexOf(order.status);

  return (
    <div>
      <Link
        href="/account/orders"
        style={{ fontFamily: "var(--font-karla)", fontSize: 12, color: "var(--color-light)", textDecoration: "none", marginBottom: 24, display: "inline-block" }}
      >
        &larr; Back to Orders
      </Link>

      <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 28, fontWeight: 300, color: "var(--color-dark)", marginBottom: 8 }}>
        {order.orderNumber}
      </h2>
      <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)", marginBottom: 36 }}>
        Placed on {formatDate(order.createdAt)}
      </p>

      {/* Status Timeline */}
      <div style={{ display: "flex", gap: 0, marginBottom: 40, position: "relative" }}>
        {steps.map((step, i) => (
          <div key={step} style={{ flex: 1, textAlign: "center", position: "relative" }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: i <= currentStep ? "var(--color-gold)" : "var(--color-divider)",
                margin: "0 auto 8px",
                position: "relative",
                zIndex: 1,
              }}
            />
            {i < steps.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  top: 5,
                  left: "50%",
                  right: "-50%",
                  height: 2,
                  background: i < currentStep ? "var(--color-gold)" : "var(--color-divider)",
                  zIndex: 0,
                }}
              />
            )}
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: i <= currentStep ? "var(--color-dark)" : "var(--color-light)" }}>
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Order Items */}
      <div style={{ marginBottom: 36 }}>
        <h3 style={{ fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-mid)", marginBottom: 16 }}>
          Items
        </h3>
        {order.items.map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--color-divider)" }}>
            <div>
              <p style={{ fontFamily: "var(--font-karla)", fontSize: 14, color: "var(--color-dark)", marginBottom: 4 }}>
                {item.productName}
              </p>
              <p style={{ fontFamily: "var(--font-karla)", fontSize: 12, color: "var(--color-light)" }}>
                {item.selectedColor} &middot; Qty: {item.quantity}
              </p>
            </div>
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 14, color: "var(--color-dark)" }}>
              {formatPrice(item.priceAtTime * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Summary & Address */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-mid)", marginBottom: 16 }}>
            Shipping Address
          </h3>
          {order.address ? (
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-dark)", lineHeight: 1.7 }}>
              {order.address.name}<br />
              {order.address.line1}{order.address.line2 && `, ${order.address.line2}`}<br />
              {order.address.city}, {order.address.state} {order.address.pincode}<br />
              {order.address.phone}
            </p>
          ) : order.guestAddress ? (
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-dark)", lineHeight: 1.7 }}>
              {order.guestName}<br />
              {order.guestAddress}<br />
              {order.guestPhone}
            </p>
          ) : (
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)" }}>No address on file</p>
          )}
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-mid)", marginBottom: 16 }}>
            Order Summary
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)" }}>
              <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)" }}>
              <span>Shipping</span><span>{order.shippingCost === 0 ? "Free" : formatPrice(order.shippingCost)}</span>
            </div>
            {order.discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-gold)" }}>
                <span>Discount</span><span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-karla)", fontSize: 14, fontWeight: 500, color: "var(--color-dark)", paddingTop: 8, borderTop: "1px solid var(--color-divider)" }}>
              <span>Total</span><span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
