import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";

function generateOrderNumber() {
  const year = new Date().getFullYear();
  const rand = crypto.randomInt(1000, 9999);
  return `TULI-${year}-${rand}`;
}

interface GuestInfo {
  email: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export async function POST(request: Request) {
  const session = await auth();
  const { items, addressId, promoCode, guest } = await request.json();

  if (!items?.length) {
    return NextResponse.json({ error: "Cart items are required" }, { status: 400 });
  }

  const isGuest = !session?.user?.id;

  // Validate guest info if not logged in
  if (isGuest) {
    if (!guest?.email || !guest?.name || !guest?.phone || !guest?.line1 || !guest?.city || !guest?.state || !guest?.pincode) {
      return NextResponse.json({ error: "Complete contact and address information is required" }, { status: 400 });
    }
  } else if (!addressId) {
    return NextResponse.json({ error: "Shipping address is required" }, { status: 400 });
  }

  // Verify address belongs to user (for logged-in users)
  if (!isGuest && addressId) {
    const address = await prisma.address.findFirst({
      where: { id: addressId, userId: session!.user!.id },
    });
    if (!address) {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    }
  }

  // Verify products and calculate total from database prices (prevents price tampering)
  let subtotal = 0;
  const orderItems: { productId: string; quantity: number; selectedColor: string; priceAtTime: number; productName: string }[] = [];

  for (const item of items) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product || !product.inStock) {
      return NextResponse.json({ error: `Product ${item.productId} is not available` }, { status: 400 });
    }
    const lineTotal = product.price * item.quantity;
    subtotal += lineTotal;
    orderItems.push({
      productId: product.id,
      quantity: item.quantity,
      selectedColor: item.selectedColor || "",
      priceAtTime: product.price,
      productName: product.name,
    });
  }

  // Apply promo code
  let discount = 0;
  if (promoCode) {
    const promo = await prisma.promotion.findFirst({
      where: { code: promoCode, active: true },
    });
    if (promo && promo.discount) {
      discount = Math.round(subtotal * promo.discount / 100);
    }
  }

  const total = subtotal - discount;
  const orderNumber = generateOrderNumber();

  // Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: total * 100, // Razorpay expects amount in paise
    currency: "INR",
    receipt: orderNumber,
  });

  // Build guest address string
  const guestInfo = guest as GuestInfo | undefined;
  const guestAddress = guestInfo
    ? `${guestInfo.line1}${guestInfo.line2 ? ", " + guestInfo.line2 : ""}, ${guestInfo.city}, ${guestInfo.state} ${guestInfo.pincode}`
    : null;

  // Create order in database
  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: isGuest ? null : session!.user!.id,
      addressId: isGuest ? null : addressId,
      guestEmail: guestInfo?.email ?? null,
      guestName: guestInfo?.name ?? null,
      guestPhone: guestInfo?.phone ?? null,
      guestAddress,
      subtotal,
      discount,
      total,
      promoCode: promoCode || null,
      razorpayOrderId: razorpayOrder.id,
      items: {
        create: orderItems,
      },
    },
    include: { items: true },
  });

  return NextResponse.json({
    orderId: order.id,
    orderNumber: order.orderNumber,
    razorpayOrderId: razorpayOrder.id,
    amount: total,
  });
}
