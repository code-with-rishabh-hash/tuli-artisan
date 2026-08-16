"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OAuthButtons from "./OAuthButtons";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/account");
      router.refresh();
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid var(--color-divider)",
    background: "var(--color-surface)",
    color: "var(--color-dark)",
    fontFamily: "var(--font-karla)",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-karla)",
    fontSize: 11,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "var(--color-mid)",
    marginBottom: 6,
    display: "block",
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(32px, 5vw, 42px)",
            fontWeight: 300,
            color: "var(--color-dark)",
            marginBottom: 12,
          }}
        >
          Sign In
        </h1>
        <p
          style={{
            fontFamily: "var(--font-karla)",
            fontSize: 14,
            color: "var(--color-mid)",
          }}
        >
          Welcome back to Tuli Artisan
        </p>
      </div>

      <OAuthButtons />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          margin: "28px 0",
        }}
      >
        <div style={{ flex: 1, height: 1, background: "var(--color-divider)" }} />
        <span
          style={{
            fontFamily: "var(--font-karla)",
            fontSize: 11,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--color-light)",
          }}
        >
          or
        </span>
        <div style={{ flex: 1, height: 1, background: "var(--color-divider)" }} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
            placeholder="Minimum 8 characters"
          />
        </div>

        {error && (
          <p style={{ color: "#A63D2F", fontSize: 13, fontFamily: "var(--font-karla)" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
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
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p
        style={{
          textAlign: "center",
          marginTop: 28,
          fontFamily: "var(--font-karla)",
          fontSize: 13,
          color: "var(--color-mid)",
        }}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          style={{ color: "var(--color-gold)", textDecoration: "none" }}
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
