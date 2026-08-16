import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { theme, emailNotifications, smsNotifications } = await request.json();

  const prefs = await prisma.userPreferences.upsert({
    where: { userId: session.user.id },
    update: {
      ...(theme !== undefined && { theme }),
      ...(emailNotifications !== undefined && { emailNotifications }),
      ...(smsNotifications !== undefined && { smsNotifications }),
    },
    create: {
      userId: session.user.id,
      theme: theme ?? "light",
      emailNotifications: emailNotifications ?? true,
      smsNotifications: smsNotifications ?? false,
    },
  });

  return NextResponse.json(prefs);
}
