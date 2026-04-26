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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
      <section className="bg-gradient-to-b from-zinc-50 to-white py-8 sm:py-14">
        <Container>
          <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-2">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                ✦ OTP Login • Real-time Bookings • 5 Services
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 leading-tight">
                Book trusted event services in minutes.
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base font-medium leading-7 text-zinc-600">
                Evigo connects you to verified providers across{" "}
                <span className="font-black text-zinc-900">
                  Catering, Photography, DJ, Mehendi &amp; Makeup, Cultural
                </span>
                . No fake listings — providers appear only after registration.
              </p>
              <div className="mt-5 sm:mt-6 flex flex-col gap-3 sm:flex-row">
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
              <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                {["OTP Login", "No Fake Vendors", "Bihar Network", "24×7 Support"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-zinc-200 bg-white px-2.5 sm:px-3 py-1 text-xs font-semibold text-zinc-600"
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Collage + feature cards */}
            <div className="grid gap-3">
              {/* Hero event image — clean, premium, no clutter */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200/50 bg-zinc-900 shadow-2xl" style={{ aspectRatio: "16/10" }}>
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
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="text-base sm:text-lg font-black text-white leading-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
                    All Event Services in One Place
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5 sm:gap-2">
                    {SERVICE_CATEGORIES.map((c) => (
                      <span
                        key={c}
                        className="rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-white"
                        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
                      >
                        {CATEGORY_ICON[c]} {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-zinc-200 bg-white p-3 sm:p-4 hover:border-violet-200 hover:bg-violet-50 transition">
                  <div className="text-xs sm:text-sm font-black text-zinc-900">Real-time bookings</div>
                  <div className="mt-1 text-[11px] sm:text-xs font-semibold text-zinc-500">
                    Providers accept/reject in dashboard
                  </div>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-3 sm:p-4 hover:border-cyan-200 hover:bg-cyan-50 transition">
                  <div className="text-xs sm:text-sm font-black text-zinc-900">Call instantly</div>
                  <div className="mt-1 text-[11px] sm:text-xs font-semibold text-zinc-500">
                    One tap &ldquo;Call Now&rdquo; via tel link
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2) Core Services ── */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <Container>
          {/* Heading */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1 mb-3 sm:mb-4 text-xs sm:text-[13px] font-bold text-violet-700" style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.18)" }}>
                🎯 5 Verified Categories
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black text-zinc-900 leading-tight">
                Core Services
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-2 font-semibold">
                Curated for Bihar&apos;s event market — only the services that matter.
              </p>
            </div>
            <Link href="/explore" className="text-sm font-extrabold text-violet-600 hover:text-violet-700 whitespace-nowrap shrink-0">
              View All Providers →
            </Link>
          </div>

          {/* Cards grid */}
          <div className="evigo-services-grid">
            {SERVICE_CATEGORIES.map((c) => (
              <Link href="/explore" key={c} style={{ textDecoration: "none", display: "block" }}>
                <div
                  className="rounded-2xl sm:rounded-[20px] border border-zinc-200 overflow-hidden bg-white h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_0_2px_#8b5cf6,0_20px_48px_rgba(139,92,246,0.18)] hover:border-violet-500"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)", cursor: "pointer" }}
                >
                  {/* Image — fixed height, object-cover, no aspect-ratio */}
                  <div className="evigo-svc-img-wrap">
                    <Image
                      src={CATEGORY_IMAGE[c]}
                      alt={c}
                      fill
                      className="svc-img object-cover transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      loading="lazy"
                    />
                    {/* gradient */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)" }} />
                    {/* icon */}
                    <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-[10px] bg-white/90 backdrop-blur-sm flex items-center justify-center text-lg shadow-md">
                      {CATEGORY_ICON[c]}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <div className="text-sm font-black text-zinc-900">{c}</div>
                    <div className="text-xs text-zinc-500 mt-1 leading-relaxed font-semibold">
                      {CATEGORY_TAGLINE[c]}
                    </div>
                    <div className="mt-auto pt-3">
                      <div className="inline-flex items-center gap-1 text-xs font-extrabold grad-text">
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
      <section className="bg-zinc-50 py-10 sm:py-14">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900">Explore Services</h2>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-zinc-500">
                Listings are live from registered providers. No fake vendors.
              </p>
            </div>
            <Link href="/partner">
              <Button variant="secondary">+ List Your Service</Button>
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="mt-6 rounded-2xl sm:rounded-3xl border-2 border-dashed border-zinc-200 bg-white p-8 sm:p-14 text-center">
              <div className="text-4xl sm:text-5xl mb-4">🔍</div>
              <div className="text-base sm:text-lg font-black text-zinc-800">No providers yet</div>
              <div className="mt-2 text-xs sm:text-sm font-semibold text-zinc-500 max-w-xs mx-auto">
                Services will appear here as soon as real providers register.
              </div>
              <Link href="/partner" className="inline-block mt-6">
                <Button>+ List Your Service</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <VendorMiniCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── 4) Women Empowerment ── */}
      <section className="py-14 sm:py-20 md:py-22" style={{ background: "linear-gradient(180deg,#09090b 0%,#0f0a1e 100%)" }}>
        <Container>
          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 sm:mb-5" style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)" }}>
              <span className="text-base">🌸</span>
              <span className="text-xs sm:text-[13px] font-bold text-purple-400 tracking-wide">Nari Shakti Initiative</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
              Women Empowerment
            </h2>
            <p className="text-sm sm:text-[15px] text-gray-400 max-w-md mx-auto mt-3 sm:mt-4 leading-relaxed">
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
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02]"
                style={{
                  aspectRatio: "3/4",
                  border: `1px solid ${card.accent}22`,
                  boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
                  cursor: "default",
                  background: "#0f0a1e",
                }}
              >
                <Image
                  src={card.src}
                  alt="Women Empowerment"
                  fill
                  className="emp-img object-cover transition-transform duration-500"
                  sizes="(max-width: 480px) 100vw, (max-width: 720px) 50vw, (max-width: 1200px) 32vw, 20vw"
                  loading="lazy"
                />

                {/* Subtle bottom vignette only */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%)",
                }} />

                {/* Accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{
                  background: `linear-gradient(90deg, ${card.accent}, ${card.accent}55)`,
                }} />
              </div>
            ))}
          </div>



          {/* How it Works + CTA */}
          <div className="evigo-how-grid rounded-2xl sm:rounded-3xl" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", padding: "28px 20px", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-white mb-4 sm:mb-5">How it works</div>
              <ol className="flex flex-col gap-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Explore real providers registered on Evigo.",
                  "Book instantly with your event details.",
                  "Provider accepts/rejects in real time.",
                  'Call anytime with "Call Now".',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold text-white shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", boxShadow: "0 2px 8px rgba(139,92,246,0.4)" }}>
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-300 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="evigo-how-cta flex flex-col gap-3" style={{ minWidth: 168 }}>
              <Link href="/login/client">
                <button
                  className="w-full py-3 px-5 rounded-xl text-sm font-bold text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                  style={{ border: "none", background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", boxShadow: "0 4px 20px rgba(139,92,246,0.4)" }}
                >
                  Continue as Client
                </button>
              </Link>
              <Link href="/login/provider">
                <button
                  className="w-full py-3 px-5 rounded-xl text-sm font-bold text-gray-300 cursor-pointer transition-all duration-200 hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)" }}
                >
                  Continue as Partner
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>




      {/* ── 5) Stats ── */}
      <section className="py-14 sm:py-20" style={{ background: "linear-gradient(180deg, #0f0a1e 0%, #09090b 100%)" }}>
        <Container>
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Evigo by the Numbers
            </h2>
            <p className="text-sm sm:text-[15px] text-gray-400">
              Real impact, real people, real growth across Bihar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl sm:rounded-[22px] p-7 sm:p-9 text-center transition-all duration-300 hover:-translate-y-2 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${s.accent}44`,
                  boxShadow: `0 4px 24px ${s.accent}22`,
                }}
              >
                <div
                  className="w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-5"
                  style={{
                    background: `${s.accent}18`,
                    border: `1px solid ${s.accent}44`,
                    boxShadow: `0 4px 20px ${s.accent}22`,
                  }}
                >
                  {s.icon}
                </div>
                <div
                  className="text-4xl sm:text-5xl font-black leading-none mb-2.5"
                  style={{
                    background: `linear-gradient(135deg, #ffffff 40%, ${s.accent})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-sm sm:text-[15px] font-bold text-gray-100 mb-1.5">
                  {s.label}
                </div>
                <div className="text-xs sm:text-[13px] text-gray-400 leading-relaxed">{s.sub}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
