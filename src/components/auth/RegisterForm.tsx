"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import OAuthButtons from "./OAuthButtons";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/account",
    });
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
          Create Account
        </h1>
        <p
          style={{
            fontFamily: "var(--font-karla)",
            fontSize: 14,
            color: "var(--color-mid)",
          }}
        >
          Join our community of craft enthusiasts
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
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
            placeholder="Your full name"
          />
        </div>
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
            minLength={8}
            style={inputStyle}
            placeholder="Min 8 chars, 1 uppercase, 1 number"
          />
        </div>
        <div>
          <label style={labelStyle}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={inputStyle}
            placeholder="Re-enter your password"
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
          {loading ? "Creating account..." : "Create Account"}
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
        Already have an account?{" "}
        <Link
          href="/login"
          style={{ color: "var(--color-gold)", textDecoration: "none" }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
