import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otpStore";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const { phone, otp, role } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 });
    }

    const verification = verifyOTP(phone, otp);
    if (!verification.success) {
      return NextResponse.json({ error: verification.message }, { status: 400 });
    }

    // Connect to DB and handle user role
    await connectDB();
    
    let user = await User.findOne({ phone });
    if (!user) {
      if (!role) {
         return NextResponse.json({ error: "Role is required for new users" }, { status: 400 });
      }
      user = await User.create({ phone, role });
    }

    // In a real app we'd sign a JWT here. 
    // We'll return user data to let the client handle session.
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
    return NextResponse.json({ error: error.message || "Failed to verify OTP" }, { status: 500 });
  }
}
