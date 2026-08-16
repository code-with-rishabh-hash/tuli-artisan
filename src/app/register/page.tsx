import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | Tuli Artisan",
  description: "Create your Tuli Artisan account",
};

export default function RegisterPage() {
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
      <RegisterForm />
    </main>
  );
}
