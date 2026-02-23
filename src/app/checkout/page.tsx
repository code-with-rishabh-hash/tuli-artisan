import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | Tuli Artisan",
};

export default async function CheckoutPage() {
  const session = await auth();
  const isDemo = !process.env.DATABASE_URL;

  let addresses: {
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
  }[] = [];

  if (!isDemo && session?.user?.id) {
    const { prisma } = await import("@/lib/prisma");
    const dbAddresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
    addresses = dbAddresses.map((a) => ({
      id: a.id,
      label: a.label,
      name: a.name,
      line1: a.line1,
      line2: a.line2,
      city: a.city,
      state: a.state,
      pincode: a.pincode,
      phone: a.phone,
      isDefault: a.isDefault,
    }));
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        paddingTop: 120,
        paddingBottom: 80,
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 300,
            color: "var(--color-dark)",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Checkout
        </h1>
        <CheckoutForm
          addresses={addresses}
          isLoggedIn={!!session?.user}
          userEmail={session?.user?.email ?? undefined}
          isDemo={isDemo}
        />
      </div>
    </main>
  );
}
