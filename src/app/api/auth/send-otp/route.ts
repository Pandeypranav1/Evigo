import { NextResponse } from "next/server";
import { sendOTP } from "@/lib/otpStore";

// In a real production app we'd use rate limiting like Upstash Redis.
// Here we do a simple in-memory rate limit for demo.
const rateLimit = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Rate Limit (1 per minute per number)
    const lastSent = rateLimit.get(phone);
    if (lastSent && Date.now() - lastSent < 60000) {
      return NextResponse.json({ error: "Please wait 1 minute before requesting another OTP." }, { status: 429 });
    }
    rateLimit.set(phone, Date.now());

    // Generate static OTP for now or random 6 digits
    const otp = "123456"; 

    await sendOTP(phone, otp);

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to send OTP" }, { status: 500 });
  }
}
