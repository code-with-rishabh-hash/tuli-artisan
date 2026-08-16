import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { validateName, validatePhone, sanitize } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, phone: true, avatar: true, createdAt: true },
  });

  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, phone } = body;

  if (name) {
    const nameError = validateName(name);
    if (nameError) return NextResponse.json({ error: nameError }, { status: 400 });
  }

  if (phone) {
    const phoneError = validatePhone(phone);
    if (phoneError) return NextResponse.json({ error: phoneError }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(name && { name: sanitize(name) }),
      ...(phone && { phone: phone.replace(/\s/g, "") }),
    },
    select: { id: true, name: true, email: true, phone: true, avatar: true },
  });

  return NextResponse.json(user);
}
