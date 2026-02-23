import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | Tuli Artisan",
  description: "Sign in to your Tuli Artisan account",
};

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-cream)",
        paddingTop: 100,
        paddingBottom: 80,
      }}
    >
      <LoginForm />
    </main>
  );
}
