import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AccountSidebar from "@/components/account/AccountSidebar";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--color-cream)",
        paddingTop: 120,
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          gap: 60,
        }}
      >
        <AccountSidebar userName={session.user.name} />
        <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      </div>
    </main>
  );
}
