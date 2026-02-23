import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/account/ProfileForm";

export const metadata: Metadata = {
  title: "Profile | Tuli Artisan",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, phone: true },
  });

  if (!user) return null;

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
        Profile
      </h2>
      <ProfileForm initial={{ name: user.name, email: user.email, phone: user.phone }} />
    </div>
  );
}
