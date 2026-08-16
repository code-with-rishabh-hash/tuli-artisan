import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);
  const payload = event.payload;

  switch (event.event) {
    case "payment.captured": {
      const paymentId = payload.payment.entity.id;
      const orderId = payload.payment.entity.order_id;
      await prisma.order.updateMany({
        where: { razorpayOrderId: orderId },
        data: {
          razorpayPaymentId: paymentId,
          paymentStatus: "paid",
          status: "confirmed",
          paidAt: new Date(),
        },
      });
      break;
    }

    case "payment.failed": {
      const orderId = payload.payment.entity.order_id;
      await prisma.order.updateMany({
        where: { razorpayOrderId: orderId },
        data: { paymentStatus: "failed" },
      });
      break;
    }

    case "refund.created": {
      const orderId = payload.refund.entity.order_id;
      await prisma.order.updateMany({
        where: { razorpayOrderId: orderId },
        data: { paymentStatus: "refunded" },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
