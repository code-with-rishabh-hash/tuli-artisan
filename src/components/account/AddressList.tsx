"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";

interface Address {
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
}

export default function AddressList() {
  const { data: initialAddresses, loading } = useFetch<Address[]>("/api/account/addresses");
  const [localAddresses, setLocalAddresses] = useState<Address[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    label: "Home", name: "", line1: "", line2: "", city: "", state: "", pincode: "", phone: "", isDefault: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const addresses = localAddresses ?? initialAddresses ?? [];

  async function refreshAddresses() {
    const res = await fetch("/api/account/addresses");
    if (res.ok) setLocalAddresses(await res.json());
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = editId ? `/api/account/addresses/${editId}` : "/api/account/addresses";
    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    if (res.ok) {
      setShowForm(false);
      setEditId(null);
      setForm({ label: "Home", name: "", line1: "", line2: "", city: "", state: "", pincode: "", phone: "", isDefault: false });
      refreshAddresses();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
    }
  }

  async function handleDelete(id: string) {
    setLocalAddresses(addresses.filter((a) => a.id !== id));
    await fetch(`/api/account/addresses/${id}`, { method: "DELETE" });
  }

  function handleEdit(addr: Address) {
    setForm({ label: addr.label, name: addr.name, line1: addr.line1, line2: addr.line2 ?? "", city: addr.city, state: addr.state, pincode: addr.pincode, phone: addr.phone, isDefault: addr.isDefault });
    setEditId(addr.id);
    setShowForm(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", border: "1px solid var(--color-divider)", background: "var(--color-surface)", color: "var(--color-dark)", fontFamily: "var(--font-karla)", fontSize: 14, outline: "none", boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-mid)", marginBottom: 4, display: "block",
  };

  if (loading) return <p style={{ fontFamily: "var(--font-karla)", color: "var(--color-mid)" }}>Loading...</p>;

  return (
    <div>
      {!showForm && (
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ label: "Home", name: "", line1: "", line2: "", city: "", state: "", pincode: "", phone: "", isDefault: false }); }}
          style={{
            padding: "12px 28px", background: "var(--color-dark)", color: "var(--color-cream)", fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", border: "none", cursor: "pointer", marginBottom: 28,
          }}
        >
          Add New Address
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSave} style={{ marginBottom: 36, padding: 24, border: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Label</label>
              <select value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} style={inputStyle}>
                <option>Home</option><option>Office</option><option>Other</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Recipient Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Address Line 1</label>
              <input type="text" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} required style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Address Line 2</label>
              <input type="text" value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>City</label>
              <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>State</label>
              <input type="text" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Pincode</label>
              <input type="text" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} required maxLength={6} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required style={inputStyle} />
            </div>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)", marginBottom: 16, cursor: "pointer" }}>
            <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} />
            Set as default address
          </label>
          {error && <p style={{ color: "#A63D2F", fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" disabled={saving} style={{ padding: "12px 28px", background: "var(--color-dark)", color: "var(--color-cream)", fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
              {saving ? "Saving..." : editId ? "Update" : "Save"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} style={{ padding: "12px 28px", background: "transparent", color: "var(--color-mid)", fontFamily: "var(--font-karla)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", border: "1px solid var(--color-divider)", cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {addresses.length === 0 && !showForm && (
          <p style={{ fontFamily: "var(--font-karla)", fontSize: 14, color: "var(--color-mid)" }}>No saved addresses yet.</p>
        )}
        {addresses.map((addr) => (
          <div key={addr.id} style={{ padding: 20, border: "1px solid var(--color-divider)", background: "var(--color-surface)", position: "relative" }}>
            {addr.isDefault && (
              <span style={{ position: "absolute", top: 12, right: 16, fontFamily: "var(--font-karla)", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--color-gold)" }}>Default</span>
            )}
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 12, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--color-light)", marginBottom: 6 }}>{addr.label}</p>
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 14, color: "var(--color-dark)", fontWeight: 500, marginBottom: 4 }}>{addr.name}</p>
            <p style={{ fontFamily: "var(--font-karla)", fontSize: 13, color: "var(--color-mid)", lineHeight: 1.6 }}>
              {addr.line1}{addr.line2 && `, ${addr.line2}`}<br />{addr.city}, {addr.state} {addr.pincode}<br />{addr.phone}
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              <button onClick={() => handleEdit(addr)} style={{ fontFamily: "var(--font-karla)", fontSize: 12, color: "var(--color-gold)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Edit</button>
              <button onClick={() => handleDelete(addr.id)} style={{ fontFamily: "var(--font-karla)", fontSize: 12, color: "#A63D2F", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
