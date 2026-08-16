import type { Metadata } from "next";
import AddressList from "@/components/account/AddressList";

export const metadata: Metadata = {
  title: "Addresses | Tuli Artisan",
};

export default function AddressesPage() {
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: 28,
          fontWeight: 300,
          color: "var(--color-dark)",
          marginBottom: 32,
        }}
      >
        Addresses
      </h2>
      <AddressList />
    </div>
  );
}
