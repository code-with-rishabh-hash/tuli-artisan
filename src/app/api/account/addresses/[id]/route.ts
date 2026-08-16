import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { validateName, validatePhone, validatePincode, sanitize } from "@/lib/validations";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.address.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  const body = await request.json();
  const { label, name, line1, line2, city, state, pincode, phone, isDefault } = body;

  if (name) {
    const err = validateName(name);
    if (err) return NextResponse.json({ error: err }, { status: 400 });
  }
  if (phone) {
    const err = validatePhone(phone);
    if (err) return NextResponse.json({ error: err }, { status: 400 });
  }
  if (pincode) {
    const err = validatePincode(pincode);
    if (err) return NextResponse.json({ error: err }, { status: 400 });
  }

  if (isDefault) {
    await prisma.address.updateMany({
      where: { userId: session.user.id },
      data: { isDefault: false },
    });
  }

  const address = await prisma.address.update({
    where: { id },
    data: {
      ...(label && { label: sanitize(label) }),
      ...(name && { name: sanitize(name) }),
      ...(line1 && { line1: sanitize(line1) }),
      ...(line2 !== undefined && { line2: line2 ? sanitize(line2) : null }),
      ...(city && { city: sanitize(city) }),
      ...(state && { state: sanitize(state) }),
      ...(pincode && { pincode: pincode.trim() }),
      ...(phone && { phone: phone.replace(/\s/g, "") }),
      ...(isDefault !== undefined && { isDefault }),
    },
  });

  return NextResponse.json(address);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.address.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  await prisma.address.delete({ where: { id } });
  return NextResponse.json({ message: "Address deleted" });
}
