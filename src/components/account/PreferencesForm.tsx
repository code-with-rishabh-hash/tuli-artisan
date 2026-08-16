"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface PrefsData {
  theme: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export default function PreferencesForm({ initial }: { initial: PrefsData }) {
  const { toggleTheme, isDark } = useTheme();
  const [emailNotif, setEmailNotif] = useState(initial.emailNotifications);
  const [smsNotif, setSmsNotif] = useState(initial.smsNotifications);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/account/preferences", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theme: isDark ? "dark" : "light",
        emailNotifications: emailNotif,
        smsNotifications: smsNotif,
      }),
    });

    setSaving(false);
    setMessage(res.ok ? "Preferences saved" : "Failed to save");
  }

  const toggleStyle: React.CSSProperties = {
    position: "relative",
    width: 44,
    height: 24,
    borderRadius: 12,
    cursor: "pointer",
    transition: "background 0.3s ease",
    border: "none",
    flexShrink: 0,
  };

  const dotStyle = (active: boolean): React.CSSProperties => ({
    position: "absolute",
    top: 3,
    left: active ? 23 : 3,
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "white",
    transition: "left 0.3s ease",
  });

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {/* Theme Toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 14, color: "var(--color-dark)", marginBottom: 4 }}>Dark Mode</p>
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 12, color: "var(--color-light)" }}>Toggle between light and dark theme</p>
          </div>
          <button onClick={toggleTheme} style={{ ...toggleStyle, background: isDark ? "var(--color-gold)" : "var(--color-divider)" }}>
            <div style={dotStyle(isDark)} />
          </button>
        </div>

        {/* Email Notifications */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 14, color: "var(--color-dark)", marginBottom: 4 }}>Email Notifications</p>
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 12, color: "var(--color-light)" }}>Order updates, promotions, and new collections</p>
          </div>
          <button onClick={() => setEmailNotif(!emailNotif)} style={{ ...toggleStyle, background: emailNotif ? "var(--color-gold)" : "var(--color-divider)" }}>
            <div style={dotStyle(emailNotif)} />
          </button>
        </div>

        {/* SMS Notifications */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 14, color: "var(--color-dark)", marginBottom: 4 }}>SMS Notifications</p>
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 12, color: "var(--color-light)" }}>Shipping updates and delivery alerts</p>
          </div>
          <button onClick={() => setSmsNotif(!smsNotif)} style={{ ...toggleStyle, background: smsNotif ? "var(--color-gold)" : "var(--color-divider)" }}>
            <div style={dotStyle(smsNotif)} />
          </button>
        </div>

        {message && (
          <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: message.includes("saved") ? "var(--color-gold)" : "#A63D2F" }}>
            {message}
          </p>
        )}

        <button
          onClick={handleSave}
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
          {saving ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}
