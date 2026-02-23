"use client";

import { useState } from "react";

interface ProfileData {
  name: string | null;
  email: string;
  phone: string | null;
}

export default function ProfileForm({ initial }: { initial: ProfileData }) {
  const [name, setName] = useState(initial.name ?? "");
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/account/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone: phone || undefined }),
    });

    setSaving(false);
    if (res.ok) {
      setMessage("Profile updated successfully");
    } else {
      const data = await res.json();
      setMessage(data.error || "Failed to update");
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
    <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <label style={labelStyle}>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" value={initial.email} disabled style={{ ...inputStyle, opacity: 0.6, cursor: "not-allowed" }} />
          <p style={{ fontFamily: "var(--font-karla)", fontSize: 11, color: "var(--color-light)", marginTop: 4 }}>
            Email cannot be changed
          </p>
        </div>

        <div>
          <label style={labelStyle}>Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
            placeholder="10-digit Indian phone number"
          />
        </div>

        {message && (
          <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: message.includes("success") ? "var(--color-gold)" : "#A63D2F" }}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "14px 32px",
            background: "var(--color-dark)",
            color: "var(--color-cream)",
            fontFamily: "var(--font-karla)",
            fontSize: 11,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            border: "none",
            cursor: saving ? "wait" : "pointer",
            opacity: saving ? 0.7 : 1,
            alignSelf: "flex-start",
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
