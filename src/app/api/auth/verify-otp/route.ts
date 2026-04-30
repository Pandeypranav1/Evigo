import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otpStore";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

function getTenDigits(raw: string) {
  const v = raw.replace(/\D/g, "");
  if (v.length === 12 && v.startsWith("91")) return v.slice(2);
  if (v.length === 11 && v.startsWith("0")) return v.slice(1);
  return v;
}

export async function POST(request: Request) {
  try {
    const { phone, otp, role } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 });
    }

    const tenDigits = getTenDigits(phone);
    const normalizedPhone = `+91${tenDigits}`;

    const verification = verifyOTP(normalizedPhone, otp);
    if (!verification.success) {
      return NextResponse.json({ error: verification.message }, { status: 400 });
    }

    try {
      await connectDB();
    } catch (dbError) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
    
    let user = await User.findOne({ phone: normalizedPhone });
    if (!user) {
      if (!role) {
         return NextResponse.json({ error: "Role is required for new users" }, { status: 400 });
      }
      user = await User.create({ phone: normalizedPhone, role });
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        id: user._id,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: "Failed to verify OTP or Server error" }, { status: 500 });
  }
}
