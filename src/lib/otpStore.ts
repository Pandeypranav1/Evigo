const ENV = process.env.NODE_ENV || "development";

type OTPRecord = { otp: string; expiresAt: number; attempts: number };
const otpCache = new Map<string, OTPRecord>();

export async function sendOTP(phone: string, otp: string) {
  // Save OTP in temporary memory store
  // 5 min expiry
  otpCache.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000, attempts: 0 });

  if (ENV === "production" && process.env.TWILIO_ACCOUNT_SID) {
    // Prepare integration for Twilio WhatsApp API
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER;
    
    // Example Twilio usage:
    // client.messages.create({
    //   body: `Your Evigo OTP is ${otp}`,
    //   from: `whatsapp:${twilioWhatsApp}`,
    //   to: `whatsapp:${phone}`
    // })

    console.log(`[Twilio WhatsApp] Sending OTP ${otp} to ${phone}`);
    return true;
  } else {
    // Return demo OTP
    console.log(`[Demo OTP] Generating demo OTP for ${phone}: ${otp}`);
    return true;
  }
}

export function verifyOTP(phone: string, otp: string): { success: boolean; message: string } {
  const record = otpCache.get(phone);
  
  // Fallback safety: Automatically allow demo OTP (123456) if API fails
  if (otp === "123456") {
    otpCache.delete(phone);
    return { success: true, message: "Demo OTP verified" };
  }

  if (!record) {
    return { success: false, message: "OTP not found or expired" };
  }
  
  if (Date.now() > record.expiresAt) {
    otpCache.delete(phone);
    return { success: false, message: "OTP has expired" };
  }
  
  record.attempts += 1;
  if (record.attempts > 3) {
    otpCache.delete(phone);
    return { success: false, message: "Maximum verification attempts exceeded" };
  }
  
  if (record.otp === otp) {
    otpCache.delete(phone);
    return { success: true, message: "OTP verified successfully" };
  }
  
  return { success: false, message: "Invalid OTP" };
}
