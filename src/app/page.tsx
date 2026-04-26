"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import {
  CATEGORY_IMAGE,
  CATEGORY_TAGLINE,
  EMPOWERMENT_IMAGES,
  SERVICE_CATEGORIES,
} from "@/lib/constants";
import type { DemoProvider } from "@/lib/demoStore";
import { getDemoProviders } from "@/lib/demoStore";

const STATS = [
  {
    icon: "👥",
    value: "50+",
    label: "Staff Network",
    sub: "Verified providers across Bihar",
    accent: "#8b5cf6",
  },
  {
    icon: "💰",
    value: "₹2L+",
    label: "Revenue Generated",
    sub: "Paid out to service partners",
    accent: "#06b6d4",
  },
  {
    icon: "⚡",
    value: "24×7",
    label: "Support",
    sub: "Always available for you",
    accent: "#f59e0b",
  },
];

const CATEGORY_ICON: Record<string, string> = {
  Catering: "🍽️",
  Photography: "📸",
  DJ: "🎧",
  "Mehendi & Makeup": "💅",
  Cultural: "🎭",
};

function VendorMiniCard({ p }: { p: DemoProvider }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = p.imageUrl && !imgError ? p.imageUrl : CATEGORY_IMAGE[p.category];

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
        <Image
          src={imgSrc}
          alt={p.businessName}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
        <div className="absolute top-2 left-2">
          <span className="rounded-full bg-white/90 backdrop-blur-sm px-2 py-0.5 text-xs font-bold text-zinc-700">
            {p.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm font-black text-zinc-900">{p.businessName}</div>
        <div className="mt-0.5 text-xs font-semibold text-zinc-500">📍 {p.city}</div>
        <div className="mt-1 text-sm font-bold text-violet-700">
          ₹{p.startingPrice.toLocaleString("en-IN")}+
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [providers, setProviders] = useState<DemoProvider[]>([]);

  useEffect(() => {
    const load = () => {
      setProviders(getDemoProviders().filter((p) => p.isActive));
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const featured = useMemo(() => providers.slice(0, 6), [providers]);

  return (
    <main className="flex-1">
      {/* ── 1) Hero ── */}
      <section className="bg-gradient-to-b from-zinc-50 to-white py-14">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                ✦ OTP Login • Real-time Bookings • 5 Services
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl leading-tight">
                Book trusted event services in minutes.
              </h1>
              <p className="mt-4 text-base font-medium leading-7 text-zinc-600">
                Evigo connects you to verified providers across{" "}
                <span className="font-black text-zinc-900">
                  Catering, Photography, DJ, Mehendi &amp; Makeup, Cultural
                </span>
                . No fake listings — providers appear only after registration.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/explore" className="w-full sm:w-auto">
                  <Button className="w-full">Explore Providers →</Button>
                </Link>
                <Link href="/partner" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full">
                    Become a Partner
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap gap-3">
                {["OTP Login", "No Fake Vendors", "Bihar Network", "24×7 Support"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600"
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Collage + feature cards */}
            <div className="grid gap-3">
              {/* Hero event image — clean, premium, no clutter */}
              <div className="relative overflow-hidden rounded-3xl border border-zinc-200/50 bg-zinc-900 shadow-2xl" style={{ aspectRatio: "16/10" }}>
                <Image
                  src="/evigo-hero.png"
                  alt="Evigo — Premium Event Services"
                  fill
                  className="object-cover opacity-80"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Dark gradient overlay — bottom heavy */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.1) 100%)" }} />
                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-lg font-black text-white leading-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
                    All Event Services in One Place
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {SERVICE_CATEGORIES.map((c) => (
                      <span
                        key={c}
                        className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
                      >
                        {CATEGORY_ICON[c]} {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 hover:border-violet-200 hover:bg-violet-50 transition">
                  <div className="text-sm font-black text-zinc-900">Real-time bookings</div>
                  <div className="mt-1 text-xs font-semibold text-zinc-500">
                    Providers accept/reject in dashboard
                  </div>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 hover:border-cyan-200 hover:bg-cyan-50 transition">
                  <div className="text-sm font-black text-zinc-900">Call instantly</div>
                  <div className="mt-1 text-xs font-semibold text-zinc-500">
                    One tap &ldquo;Call Now&rdquo; via tel link
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2) Core Services ── */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <Container>
          {/* Heading */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 40 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.18)", borderRadius: 99, padding: "5px 16px", marginBottom: 14, fontSize: 13, fontWeight: 700, color: "#7c3aed" }}>
                🎯 5 Verified Categories
              </div>
              <h2 style={{ fontSize: 34, fontWeight: 900, color: "#18181b", margin: 0, lineHeight: 1.2 }}>
                Core Services
              </h2>
              <p style={{ fontSize: 14, color: "#71717a", marginTop: 8, fontWeight: 600 }}>
                Curated for Bihar&apos;s event market — only the services that matter.
              </p>
            </div>
            <Link href="/explore" style={{ fontSize: 14, fontWeight: 800, color: "#7c3aed", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
              View All Providers →
            </Link>
          </div>

          {/* Cards grid */}
          <div className="evigo-services-grid">
            {SERVICE_CATEGORIES.map((c) => (
              <Link href="/explore" key={c} style={{ textDecoration: "none", display: "block" }}>
                <div
                  style={{
                    borderRadius: 20,
                    border: "1px solid #e4e4e7",
                    overflow: "hidden",
                    background: "#fff",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(-8px)";
                    el.style.boxShadow = "0 0 0 2px #8b5cf6, 0 20px 48px rgba(139,92,246,0.18)";
                    el.style.borderColor = "#8b5cf6";
                    const img = el.querySelector(".svc-img") as HTMLImageElement | null;
                    if (img) img.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                    el.style.borderColor = "#e4e4e7";
                    const img = el.querySelector(".svc-img") as HTMLImageElement | null;
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  {/* Image — fixed height, object-cover, no aspect-ratio */}
                  <div className="evigo-svc-img-wrap">
                    <Image
                      src={CATEGORY_IMAGE[c]}
                      alt={c}
                      fill
                      className="svc-img object-cover"
                      style={{ transition: "transform 0.5s ease" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      loading="lazy"
                    />
                    {/* gradient */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)" }} />
                    {/* icon */}
                    <div style={{ position: "absolute", top: 10, left: 10, width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
                      {CATEGORY_ICON[c]}
                    </div>
                  </div>

                  {/* Text */}
                  <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#18181b" }}>{c}</div>
                    <div style={{ fontSize: 12, color: "#71717a", marginTop: 4, lineHeight: 1.5, fontWeight: 600 }}>
                      {CATEGORY_TAGLINE[c]}
                    </div>
                    <div style={{ marginTop: "auto", paddingTop: 12 }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 800, background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Top verified professionals near you →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>


      {/* ── 3) Live Listings ── */}
      <section className="bg-zinc-50 py-14">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-zinc-900">Explore Services</h2>
              <p className="mt-1 text-sm font-semibold text-zinc-500">
                Listings are live from registered providers. No fake vendors.
              </p>
            </div>
            <Link href="/partner">
              <Button variant="secondary">+ List Your Service</Button>
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="mt-6 rounded-3xl border-2 border-dashed border-zinc-200 bg-white p-14 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <div className="text-lg font-black text-zinc-800">No providers yet</div>
              <div className="mt-2 text-sm font-semibold text-zinc-500 max-w-xs mx-auto">
                Services will appear here as soon as real providers register.
              </div>
              <Link href="/partner" className="inline-block mt-6">
                <Button>+ List Your Service</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <VendorMiniCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── 4) Women Empowerment ── */}
      <section style={{ padding: "88px 0", background: "linear-gradient(180deg,#09090b 0%,#0f0a1e 100%)" }}>
        <Container>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 100, padding: "6px 18px", marginBottom: 18 }}>
              <span style={{ fontSize: 15 }}>🌸</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", letterSpacing: "0.06em" }}>Nari Shakti Initiative</span>
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#ffffff", margin: 0, lineHeight: 1.2 }}>
              Women Empowerment
            </h2>
            <p style={{ fontSize: 15, color: "#9ca3af", maxWidth: 480, margin: "14px auto 0", lineHeight: 1.75 }}>
              Empowering women across all event services — real income, real impact.
            </p>
          </div>

          {/* 5 Image Cards — clean, no text */}
          <div className="evigo-emp-grid">
            {[
              { src: "/nari-catering.png",    accent: "#f59e0b", shadow: "rgba(245,158,11,0.4)"  },
              { src: "/emp-photography.png",   accent: "#06b6d4", shadow: "rgba(6,182,212,0.4)"   },
              { src: "/emp-dj.png",            accent: "#8b5cf6", shadow: "rgba(139,92,246,0.4)"  },
              { src: "/evigo-mehendi.png",      accent: "#ec4899", shadow: "rgba(236,72,153,0.4)"  },
              { src: "/evigo-cultural.png",     accent: "#10b981", shadow: "rgba(16,185,129,0.4)"  },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  borderRadius: 24,
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  border: `1px solid ${card.accent}22`,
                  boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
                  transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.35s ease",
                  cursor: "default",
                  background: "#0f0a1e",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-12px) scale(1.02)";
                  el.style.boxShadow = `0 0 0 2px ${card.accent}, 0 32px 72px ${card.shadow}`;
                  el.style.borderColor = card.accent;
                  const img = el.querySelector(".emp-img") as HTMLElement | null;
                  if (img) img.style.transform = "scale(1.12)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.boxShadow = "0 8px 40px rgba(0,0,0,0.6)";
                  el.style.borderColor = `${card.accent}22`;
                  const img = el.querySelector(".emp-img") as HTMLElement | null;
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                <Image
                  src={card.src}
                  alt="Women Empowerment"
                  fill
                  className="emp-img object-cover"
                  style={{
                    transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                  sizes="(max-width: 640px) 92vw, (max-width: 1200px) 32vw, 20vw"
                  loading="lazy"
                />

                {/* Subtle bottom vignette only */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%)",
                  pointerEvents: "none",
                }} />

                {/* Accent top bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${card.accent}, ${card.accent}55)`,
                }} />
              </div>
            ))}
          </div>



          {/* How it Works + CTA */}
          <div style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "36px 32px", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#ffffff", marginBottom: 18 }}>How it works</div>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Explore real providers registered on Evigo.",
                  "Book instantly with your event details.",
                  "Provider accepts/rejects in real time.",
                  'Call anytime with "Call Now".',
                ].map((step, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0, marginTop: 1, boxShadow: "0 2px 8px rgba(139,92,246,0.4)" }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 14, color: "#d1d5db", lineHeight: 1.6 }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 168 }}>
              <Link href="/login/client">
                <button
                  style={{ width: "100%", padding: "12px 20px", borderRadius: 14, border: "none", background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(139,92,246,0.4)", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(139,92,246,0.55)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(139,92,246,0.4)"; }}
                >
                  Continue as Client
                </button>
              </Link>
              <Link href="/login/provider">
                <button
                  style={{ width: "100%", padding: "12px 20px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", color: "#d1d5db", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "background 0.2s, border-color 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
                >
                  Continue as Partner
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>




      {/* ── 5) Stats ── */}
      <section
        style={{
          padding: "80px 0",
          background: "linear-gradient(180deg, #0f0a1e 0%, #09090b 100%)",
        }}
      >
        <Container>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: "#ffffff",
                marginBottom: 12,
              }}
            >
              Evigo by the Numbers
            </h2>
            <p style={{ fontSize: 15, color: "#9ca3af" }}>
              Real impact, real people, real growth across Bihar.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${s.accent}44`,
                  borderRadius: 22,
                  padding: "36px 28px",
                  textAlign: "center",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                  boxShadow: `0 4px 24px ${s.accent}22`,
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-8px)";
                  el.style.boxShadow = `0 20px 48px ${s.accent}44`;
                  el.style.borderColor = `${s.accent}88`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = `0 4px 24px ${s.accent}22`;
                  el.style.borderColor = `${s.accent}44`;
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 18,
                    background: `${s.accent}18`,
                    border: `1px solid ${s.accent}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    margin: "0 auto 22px",
                    boxShadow: `0 4px 20px ${s.accent}22`,
                  }}
                >
                  {s.icon}
                </div>
                <div
                  style={{
                    fontSize: 44,
                    fontWeight: 900,
                    lineHeight: 1,
                    marginBottom: 10,
                    background: `linear-gradient(135deg, #ffffff 40%, ${s.accent})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#f3f4f6",
                    marginBottom: 6,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.5 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
