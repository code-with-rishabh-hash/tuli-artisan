import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PreferencesForm from "@/components/account/PreferencesForm";

export const metadata: Metadata = {
  title: "Preferences | Tuli Artisan",
};

export default async function PreferencesPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  let prefs = await prisma.userPreferences.findUnique({
    where: { userId: session.user.id },
  });

  if (!prefs) {
    prefs = await prisma.userPreferences.create({
      data: { userId: session.user.id },
    });
  }

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
        Preferences
      </h2>
      <PreferencesForm
        initial={{
          theme: prefs.theme,
          emailNotifications: prefs.emailNotifications,
          smsNotifications: prefs.smsNotifications,
        }}
      />
    </div>
  );
}
