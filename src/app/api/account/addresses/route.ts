import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { validateName, validatePhone, validatePincode, sanitize } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(addresses);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { label, name, line1, line2, city, state, pincode, phone, isDefault } = body;

  if (!name || !line1 || !city || !state || !pincode || !phone) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  const nameError = validateName(name);
  if (nameError) return NextResponse.json({ error: nameError }, { status: 400 });

  const phoneError = validatePhone(phone);
  if (phoneError) return NextResponse.json({ error: phoneError }, { status: 400 });

  const pincodeError = validatePincode(pincode);
  if (pincodeError) return NextResponse.json({ error: pincodeError }, { status: 400 });

  if (isDefault) {
    await prisma.address.updateMany({
      where: { userId: session.user.id },
      data: { isDefault: false },
    });
  }

  const address = await prisma.address.create({
    data: {
      userId: session.user.id,
      label: sanitize(label || "Home"),
      name: sanitize(name),
      line1: sanitize(line1),
      line2: line2 ? sanitize(line2) : null,
      city: sanitize(city),
      state: sanitize(state),
      pincode: pincode.trim(),
      phone: phone.replace(/\s/g, ""),
      isDefault: isDefault ?? false,
    },
  });

  return NextResponse.json(address, { status: 201 });
}
