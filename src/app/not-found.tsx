import Link from "next/link";
import { Divider } from "@/components/ui/Divider";

export default function NotFound() {
  return (
    <div
      style={{
        paddingTop: 160,
        background: "var(--color-bg)",
        minHeight: "100vh",
        textAlign: "center",
        padding: "200px 32px 120px",
      }}
    >
      <Divider width="32px" color="var(--color-gold)" style={{ margin: "0 auto 32px" }} />
      <h1
        style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontWeight: 300,
          color: "var(--color-dark)",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          fontSize: "clamp(36px, 5vw, 56px)",
          marginBottom: 20,
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-karla, "Karla", sans-serif)',
          fontWeight: 400,
          color: "var(--color-light)",
          lineHeight: 1.8,
          fontSize: "15.5px",
          marginBottom: 40,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <button className="tuli-btn-primary">Return Home</button>
      </Link>
    </div>
  );
}
