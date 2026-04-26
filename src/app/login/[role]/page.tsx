"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/lib/demoStore";
import { DEMO_OTP } from "@/lib/demoStore";

function normalizePhone(raw: string) {
  const v = raw.replace(/\s+/g, "");
  if (v.startsWith("+")) return v;
  if (v.startsWith("0")) return `+91${v.slice(1)}`;
  if (/^\d{10}$/.test(v)) return `+91${v}`;
  return v;
}

function isValidPhone(v: string) {
  return /^\+91\d{10}$/.test(v) || /^\d{10}$/.test(v);
}

export default function LoginPage() {
  const params = useParams<{ role: string }>();
  const router = useRouter();
  const { loginAsDemo } = useAuth();

  const role = useMemo<UserRole>(
    () => (params.role === "provider" ? "provider" : "client"),
    [params.role]
  );

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const isProvider = role === "provider";

  const sendOtp = () => {
    setError(null);
    const p = normalizePhone(phone);
    if (!isValidPhone(p) && !isValidPhone(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setSubmitting(true);
    // Simulate OTP send delay
    setTimeout(() => {
      setSubmitting(false);
      setStep("otp");
      setNotice(`Demo OTP sent! Use code: ${DEMO_OTP}`);
    }, 900);
  };

  const verifyOtp = () => {
    setError(null);
    if (otp.trim() !== DEMO_OTP) {
      setError("Wrong OTP. For demo, use: " + DEMO_OTP);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const p = normalizePhone(phone) || phone;
      loginAsDemo(p, role);
      router.replace(role === "provider" ? "/provider/dashboard" : "/dashboard");
    }, 700);
  };

  // shared input style
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: "12px 16px",
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 500,
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <main
      className="flex-1 flex items-center justify-center py-12 min-h-[80vh]"
      style={{
        background: "linear-gradient(135deg, #0d0d0d 0%, #12052a 50%, #050d1a 100%)",
      }}
    >
      {/* Ambient glow blobs */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "15%",
          left: "10%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: "15%",
          right: "10%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <div className="mx-auto max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
                }}
              >
                ✦
              </div>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.5px",
                }}
              >
                Evigo
              </span>
            </div>
            <h1 style={{ color: "#ffffff", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
              {isProvider ? "Provider Login" : "Client Login"}
            </h1>
            <p style={{ color: "#9ca3af", fontSize: 14 }}>
              {isProvider
                ? "Access your provider dashboard"
                : "Login to book top event services across Bihar"}
            </p>
          </div>

          {/* Demo Mode Banner */}
          <div
            style={{
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.25)",
              borderRadius: 12,
              padding: "10px 16px",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 16 }}>🧪</span>
            <span style={{ color: "#fde68a", fontSize: 13, fontWeight: 600 }}>
              Demo Mode — Enter any number. OTP is <strong>123456</strong>
            </span>
          </div>

          {/* Glass Card */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 24,
              padding: "32px 28px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Role badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: isProvider ? "rgba(139,92,246,0.15)" : "rgba(6,182,212,0.15)",
                border: `1px solid ${isProvider ? "rgba(139,92,246,0.3)" : "rgba(6,182,212,0.3)"}`,
                borderRadius: 100,
                padding: "4px 12px",
                marginBottom: 24,
              }}
            >
              <span style={{ fontSize: 12 }}>{isProvider ? "🎪" : "👤"}</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: isProvider ? "#a78bfa" : "#22d3ee",
                }}
              >
                {isProvider ? "Provider Account" : "Client Account"}
              </span>
            </div>

            {step === "phone" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#d1d5db",
                      marginBottom: 8,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Mobile Number
                  </label>
                  <input
                    id="login-phone-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !submitting && sendOtp()}
                    placeholder="+91 XXXXX XXXXX"
                    type="tel"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {error && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: 10,
                      padding: "10px 14px",
                    }}
                  >
                    <span style={{ fontSize: 16 }}>⚠️</span>
                    <span style={{ color: "#fca5a5", fontSize: 13, fontWeight: 600 }}>{error}</span>
                  </div>
                )}

                <button
                  id="login-send-otp-btn"
                  onClick={sendOtp}
                  disabled={submitting}
                  style={{
                    width: "100%",
                    padding: "13px 20px",
                    borderRadius: 12,
                    border: "none",
                    background: submitting
                      ? "rgba(139,92,246,0.4)"
                      : "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                    color: "#ffffff",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: submitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: submitting ? "none" : "0 4px 20px rgba(139,92,246,0.35)",
                  }}
                >
                  {submitting ? (
                    <>
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spin 0.7s linear infinite",
                        }}
                      />
                      Sending OTP…
                    </>
                  ) : (
                    "Send OTP →"
                  )}
                </button>

                <p style={{ textAlign: "center", fontSize: 12, color: "#6b7280" }}>
                  🔒 Demo Mode — no real SMS sent
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {notice && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.25)",
                      borderRadius: 10,
                      padding: "10px 14px",
                    }}
                  >
                    <span style={{ fontSize: 16 }}>✅</span>
                    <span style={{ color: "#6ee7b7", fontSize: 13, fontWeight: 600 }}>{notice}</span>
                  </div>
                )}

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#d1d5db",
                      marginBottom: 8,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Enter OTP
                  </label>
                  <input
                    id="login-otp-input"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !submitting && verifyOtp()}
                    placeholder="123456"
                    maxLength={6}
                    style={{
                      ...inputStyle,
                      fontSize: 24,
                      fontWeight: 700,
                      letterSpacing: "0.4em",
                      textAlign: "center",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(6,182,212,0.6)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  <p style={{ marginTop: 6, fontSize: 12, color: "#9ca3af" }}>
                    Demo OTP sent to {phone}
                  </p>
                </div>

                {error && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: 10,
                      padding: "10px 14px",
                    }}
                  >
                    <span style={{ fontSize: 16 }}>⚠️</span>
                    <span style={{ color: "#fca5a5", fontSize: 13, fontWeight: 600 }}>{error}</span>
                  </div>
                )}

                <button
                  id="login-verify-otp-btn"
                  onClick={verifyOtp}
                  disabled={submitting}
                  style={{
                    width: "100%",
                    padding: "13px 20px",
                    borderRadius: 12,
                    border: "none",
                    background: submitting
                      ? "rgba(6,182,212,0.4)"
                      : "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
                    color: "#ffffff",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: submitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: submitting ? "none" : "0 4px 20px rgba(6,182,212,0.35)",
                  }}
                >
                  {submitting ? (
                    <>
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spin 0.7s linear infinite",
                        }}
                      />
                      Verifying…
                    </>
                  ) : (
                    "Verify & Login ✓"
                  )}
                </button>

                <button
                  id="login-change-number-btn"
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                    setNotice(null);
                    setError(null);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 16px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#d1d5db",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ← Change Number
                </button>
              </div>
            )}
          </div>

          {/* Switch role link */}
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#6b7280" }}>
            {isProvider ? (
              <>
                Joining as a client?{" "}
                <a href="/login/client" style={{ color: "#a78bfa", fontWeight: 700 }}>
                  Client Login
                </a>
              </>
            ) : (
              <>
                Are you a service provider?{" "}
                <a href="/login/provider" style={{ color: "#22d3ee", fontWeight: 700 }}>
                  Provider Login
                </a>
              </>
            )}
          </p>
        </div>
      </Container>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
