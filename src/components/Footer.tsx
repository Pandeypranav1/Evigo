"use client";

import Link from "next/link";

const QUICK_LINKS = [
  { label: "Explore Providers", href: "/explore" },
  { label: "Become a Partner", href: "/partner" },
  { label: "Client Login", href: "/login/client" },
  { label: "Provider Login", href: "/login/provider" },
];

const SERVICES = [
  "Catering",
  "Photography",
  "DJ",
  "Mehendi & Makeup",
  "Cultural",
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    href: "#",
  },
  {
    label: "Twitter / X",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: "#",
  },
  {
    label: "LinkedIn",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    href: "#",
  },
  {
    label: "YouTube",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
    href: "#",
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #09090b 0%, #050311 50%, #09090b 100%)",
        borderTop: "1px solid rgba(139,92,246,0.12)",
      }}
    >
      {/* Main Footer Content */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "56px 16px 32px",
          boxSizing: "border-box" as const,
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.03em",
                }}
              >
                Evigo
              </span>
            </Link>
            <p
              style={{
                marginTop: 14,
                fontSize: 14,
                lineHeight: 1.7,
                color: "#9ca3af",
                maxWidth: 280,
              }}
            >
              Bihar&apos;s trusted event services marketplace. Connecting clients
              with verified providers for weddings, celebrations &amp; more.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110"
                  style={{
                    width: 40,
                    height: 40,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#9ca3af",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(139,92,246,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(139,92,246,0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#a78bfa";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#ffffff",
                textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
                marginBottom: 18,
              }}
            >
              Quick Links
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {QUICK_LINKS.map((l) => (
                <li key={l.href} style={{ marginBottom: 10 }}>
                  <Link
                    href={l.href}
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#9ca3af",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#a78bfa";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af";
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#ffffff",
                textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
                marginBottom: 18,
              }}
            >
              Services
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {SERVICES.map((s) => (
                <li key={s} style={{ marginBottom: 10 }}>
                  <Link
                    href="/explore"
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#9ca3af",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#22d3ee";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af";
                    }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#ffffff",
                textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
                marginBottom: 18,
              }}
            >
              Get in Touch
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:support@evigo.in"
                className="flex items-center gap-2.5 text-sm text-gray-400 no-underline transition-colors duration-200 hover:text-purple-400"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg text-sm" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
                  ✉️
                </span>
                support@evigo.in
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 text-sm text-gray-400 no-underline transition-colors duration-200 hover:text-purple-400"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg text-sm" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
                  📞
                </span>
                +91 98765 43210
              </a>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg text-sm" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  📍
                </span>
                Patna, Bihar, India
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexWrap: "wrap" as const,
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
            © {new Date().getFullYear()} Evigo. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
            Made with{" "}
            <span
              style={{
                display: "inline-block",
                animation: "heartbeat 1.5s ease-in-out infinite",
              }}
            >
              ❤️
            </span>{" "}
            in Bihar
          </p>
        </div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.15); }
        }
      `}</style>
    </footer>
  );
}
