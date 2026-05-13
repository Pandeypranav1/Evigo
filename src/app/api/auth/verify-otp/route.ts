import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otpStore";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { createAdminClient } from "@/lib/supabase";

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

    // ── Determine user record ─────────────────────────────────────────────
    let userRecord: {
      id: string;
      phone: string;
      role: string;
      createdAt: string | Date;
    };

    // Try Supabase first (primary store)
    try {
      const supabase = createAdminClient();
      const effectiveRole = role || "client";

      const { data, error } = await supabase
        .from("users")
        .upsert(
          {
            phone: normalizedPhone,
            role: effectiveRole,
            last_seen_at: new Date().toISOString(),
          },
          { onConflict: "phone", ignoreDuplicates: false }
        )
        .select()
        .single();

      if (error) throw error;

      userRecord = {
        id: data.id,
        phone: data.phone,
        role: data.role,
        createdAt: data.created_at,
      };
    } catch (supabaseErr) {
      console.warn("[verify-otp] Supabase unavailable, falling back to MongoDB:", supabaseErr);

      // ── MongoDB fallback ──────────────────────────────────────────────
      try {
        await connectDB();
        let user = await User.findOne({ phone: normalizedPhone });
        if (!user) {
          if (!role) {
            return NextResponse.json(
              { error: "Role is required for new users" },
              { status: 400 }
            );
          }
          user = await User.create({ phone: normalizedPhone, role });
        }
        userRecord = {
          id: String(user._id),
          phone: user.phone,
          role: user.role,
          createdAt: user.createdAt,
        };
      } catch {
        // ── Demo mode fallback (no DB at all) ─────────────────────────
        console.warn("[verify-otp] MongoDB also unavailable — using demo fallback");
        userRecord = {
          id: "demo_user_" + tenDigits,
          phone: normalizedPhone,
          role: role || "client",
          createdAt: new Date().toISOString(),
        };
      }
    }

    return NextResponse.json({ success: true, user: userRecord });
  } catch (error: unknown) {
    console.error("[verify-otp] Unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP or Server error" },
      { status: 500 }
    );
  }
}
