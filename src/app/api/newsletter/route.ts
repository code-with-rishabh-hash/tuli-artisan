import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Newsletter signup endpoint (stub).
 *
 * When integrating a real email service (e.g., Mailchimp, Resend, SendGrid):
 * 1. Validate the email address
 * 2. Add to your mailing list via the service's API
 * 3. Return appropriate success/error response
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // TODO: Integrate with email service (Mailchimp, Resend, etc.)
    // await addToMailingList(email);

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
