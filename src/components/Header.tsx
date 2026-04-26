"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/* ─── Underline nav link ─── */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link href={href} className={`evigo-navlink${active ? " evigo-navlink--active" : ""}`}>
      {children}
      <span className="evigo-navlink__bar" />
    </Link>
  );
}

/* ─── Hamburger icon ─── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div style={{ width: 22, height: 16, position: "relative", cursor: "pointer" }}>
      {[0, 7, 14].map((top, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top,
            width: open && i === 1 ? 0 : 22,
            height: 2,
            borderRadius: 2,
            background: "#fff",
            transition: "all 0.25s ease",
            transform:
              open
                ? i === 0
                  ? "rotate(45deg) translate(5px, 5px)"
                  : i === 2
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : undefined
                : undefined,
          }}
        />
      ))}
    </div>
  );
}

export function Header() {
  const { user, role, signOut } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    signOut();
    router.push("/");
    setMenuOpen(false);
  };

  /* Close menu on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* ── Global navbar styles ── */}
      <style>{`
        .evigo-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: linear-gradient(135deg,
            rgba(5,3,15,0.97) 0%,
            rgba(35,10,70,0.97) 50%,
            rgba(5,20,60,0.97) 100%);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(139,92,246,0.15);
          box-shadow: 0 4px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(139,92,246,0.1);
        }
        .evigo-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .evigo-logo {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.03em;
          text-decoration: none;
          background: linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          flex-shrink: 0;
        }
        .evigo-nav {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .evigo-navlink {
          position: relative;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          padding-bottom: 2px;
          transition: color 0.2s;
        }
        .evigo-navlink:hover, .evigo-navlink--active {
          color: #fff;
        }
        .evigo-navlink__bar {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          border-radius: 99px;
          background: linear-gradient(90deg,#a78bfa,#38bdf8);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .evigo-navlink:hover .evigo-navlink__bar,
        .evigo-navlink--active .evigo-navlink__bar {
          transform: scaleX(1);
        }
        .evigo-ctas {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .evigo-btn-client {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.07);
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
        }
        .evigo-btn-client:hover {
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.3);
          color: #fff;
        }
        .evigo-btn-partner {
          display: inline-flex;
          align-items: center;
          padding: 8px 18px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg,#8b5cf6,#06b6d4);
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 2px 14px rgba(139,92,246,0.45);
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .evigo-btn-partner:hover {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(139,92,246,0.6);
        }
        .evigo-hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          flex-shrink: 0;
        }
        .evigo-mobile-menu {
          display: none;
          flex-direction: column;
          padding: 14px 20px 18px;
          border-top: 1px solid rgba(255,255,255,0.06);
          gap: 10px;
        }
        .evigo-mobile-link {
          font-size: 15px;
          font-weight: 700;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: color 0.2s;
        }
        .evigo-mobile-link:hover { color: #fff; }
        .evigo-badge {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 4px 10px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        @media (max-width: 768px) {
          .evigo-nav    { display: none; }
          .evigo-ctas   { display: none; }
          .evigo-hamburger { display: flex; }
          .evigo-mobile-menu.open { display: flex; }
        }
      `}</style>

      <header className="evigo-header" ref={menuRef}>
        <div className="evigo-inner">
          {/* Logo */}
          <Link href="/" className="evigo-logo" onClick={() => setMenuOpen(false)}>
            Evigo
          </Link>

          {/* Desktop nav */}
          <nav className="evigo-nav">
            <NavLink href="/explore">Explore</NavLink>
            <NavLink href="/partner">Become a Partner</NavLink>
            {user && role === "client"    && <NavLink href="/dashboard">Dashboard</NavLink>}
            {user && role === "provider"  && <NavLink href="/provider/dashboard">My Dashboard</NavLink>}
          </nav>

          {/* Desktop CTAs */}
          <div className="evigo-ctas">
            {!user ? (
              <>
                <Link href="/login/client"   className="evigo-btn-client">Client Login</Link>
                <Link href="/login/provider" className="evigo-btn-partner">Partner Login</Link>
              </>
            ) : (
              <>
                <span className="evigo-badge">
                  {role === "provider" ? "🎪 Provider" : "👤 Client"} · {user.phone}
                </span>
                <button
                  onClick={handleSignOut}
                  className="evigo-btn-client"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="evigo-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`evigo-mobile-menu${menuOpen ? " open" : ""}`}>
          <Link href="/explore"  className="evigo-mobile-link" onClick={() => setMenuOpen(false)}>🔍 Explore</Link>
          <Link href="/partner"  className="evigo-mobile-link" onClick={() => setMenuOpen(false)}>🤝 Become a Partner</Link>
          {user && role === "client"   && <Link href="/dashboard"          className="evigo-mobile-link" onClick={() => setMenuOpen(false)}>📋 Dashboard</Link>}
          {user && role === "provider" && <Link href="/provider/dashboard" className="evigo-mobile-link" onClick={() => setMenuOpen(false)}>🏪 My Dashboard</Link>}
          {!user ? (
            <div style={{ display: "flex", gap: 8, paddingTop: 4 }}>
              <Link href="/login/client"   className="evigo-btn-client"  style={{ flex: 1, justifyContent: "center" }} onClick={() => setMenuOpen(false)}>Client Login</Link>
              <Link href="/login/provider" className="evigo-btn-partner" style={{ flex: 1, justifyContent: "center" }} onClick={() => setMenuOpen(false)}>Partner Login</Link>
            </div>
          ) : (
            <button onClick={handleSignOut} className="evigo-btn-client" style={{ cursor: "pointer", textAlign: "left" }}>
              Logout ({user.phone})
            </button>
          )}
        </div>
      </header>
    </>
  );
}
