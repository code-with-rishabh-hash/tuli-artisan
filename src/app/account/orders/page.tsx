import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Orders | Tuli Artisan",
};

const statusColors: Record<string, string> = {
  pending: "var(--color-light)",
  confirmed: "var(--color-gold)",
  processing: "#C68B17",
  shipped: "#2D6A4F",
  delivered: "#2D6A4F",
  cancelled: "#A63D2F",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: 28,
          fontWeight: 300,
          color: "var(--color-dark)",
          marginBottom: 32,
        }}
      >
        Order History
      </h2>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ fontFamily: "var(--font-karla)", fontSize: 14, color: "var(--color-mid)", marginBottom: 20 }}>
            No orders yet.
          </p>
          <Link
            href="/shop"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              background: "var(--color-dark)",
              color: "var(--color-cream)",
              fontFamily: "var(--font-karla)",
              fontSize: 11,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              style={{
                display: "block",
                padding: 24,
                border: "1px solid var(--color-divider)",
                background: "var(--color-surface)",
                textDecoration: "none",
                transition: "border-color 0.3s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, fontWeight: 500, color: "var(--color-dark)", marginBottom: 4 }}>
                    {order.orderNumber}
                  </p>
                  <p style={{ fontFamily: "var(--font-karla)", fontSize: 12, color: "var(--color-light)" }}>
                    {formatDate(order.createdAt)} &middot; {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-karla)",
                      fontSize: 10,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: statusColors[order.status] || "var(--color-mid)",
                      fontWeight: 500,
                    }}
                  >
                    {order.status}
                  </span>
                  <p style={{ fontFamily: "var(--font-karla)", fontSize: 14, fontWeight: 500, color: "var(--color-dark)", marginTop: 4 }}>
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
