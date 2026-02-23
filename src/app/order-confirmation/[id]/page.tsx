import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;

  // Allow access if: logged-in user owns the order, OR it's a guest order
  const order = await prisma.order.findFirst({
    where: {
      id,
      ...(session?.user?.id ? { userId: session.user.id } : { userId: null }),
    },
    include: { items: true },
  });

  if (!order) notFound();

  const isGuest = !order.userId;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        paddingTop: 120,
        paddingBottom: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 520, padding: "0 24px" }}>
        <div style={{ fontSize: 48, marginBottom: 24, color: "var(--color-gold)" }}>&#10003;</div>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(28px, 5vw, 38px)",
            fontWeight: 300,
            color: "var(--color-dark)",
            marginBottom: 12,
          }}
        >
          Thank You
        </h1>
        <p
          style={{
            fontFamily: "var(--font-karla)",
            fontSize: 14,
            color: "var(--color-mid)",
            marginBottom: 8,
            lineHeight: 1.7,
          }}
        >
          Your order has been confirmed. Each piece will be handcrafted with care by our artisans.
        </p>
        <p
          style={{
            fontFamily: "var(--font-karla)",
            fontSize: 13,
            color: "var(--color-light)",
            marginBottom: 32,
          }}
        >
          Order {order.orderNumber} &middot; {formatPrice(order.total)}
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {!isGuest && (
            <Link
              href={`/account/orders/${order.id}`}
              style={{
                padding: "14px 28px",
                background: "var(--color-dark)",
                color: "var(--color-cream)",
                fontFamily: "var(--font-karla)",
                fontSize: 11,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              View Order
            </Link>
          )}
          <Link
            href="/shop"
            style={{
              padding: "14px 28px",
              border: "1px solid var(--color-divider)",
              background: isGuest ? "var(--color-dark)" : "transparent",
              color: isGuest ? "var(--color-cream)" : "var(--color-dark)",
              fontFamily: "var(--font-karla)",
              fontSize: 11,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
