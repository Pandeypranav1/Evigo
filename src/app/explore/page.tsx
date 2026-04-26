"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SERVICE_CATEGORIES, CATEGORY_IMAGE } from "@/lib/constants";
import type { ServiceCategory } from "@/lib/constants";
import type { DemoProvider } from "@/lib/demoStore";
import { getDemoProviders, getDemoUser, saveDemoBooking } from "@/lib/demoStore";

/* ─── tiny helpers ─── */
const PRICE_BANDS = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5k – ₹15k", min: 5000, max: 15000 },
  { label: "₹15k – ₹50k", min: 15000, max: 50000 },
  { label: "₹50k+", min: 50000, max: Infinity },
];

/* ─── Booking Modal ─── */
function BookingModal({
  provider,
  onClose,
}: {
  provider: DemoProvider | null;
  onClose: () => void;
}) {
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!provider) { setEventDate(""); setLocation(""); setNotes(""); setDone(false); }
  }, [provider]);

  if (!provider) return null;

  const confirm = () => {
    const u = getDemoUser();
    saveDemoBooking({
      providerId: provider.id,
      providerOwnerUid: provider.ownerUid,
      clientUid: u?.uid ?? "guest",
      clientPhone: u?.phone ?? "",
      eventDate,
      location,
      notes,
    });
    setDone(true);
  };

  return (
    <div
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", backdropFilter:"blur(6px)", zIndex:60, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background:"#fff", borderRadius:24, padding:"32px 28px", width:"100%", maxWidth:460, boxShadow:"0 32px 80px rgba(0,0,0,0.25)" }}>
        {done ? (
          <div className="text-center py-2">
            <div style={{ fontSize:52 }}>✅</div>
            <div style={{ fontSize:18, fontWeight:900, color:"#18181b", marginTop:12 }}>Booking Requested!</div>
            <div style={{ fontSize:14, color:"#71717a", marginTop:6 }}>
              Your request has been sent to <strong>{provider.businessName}</strong>.
            </div>
            <button onClick={onClose} style={{ marginTop:20, width:"100%", padding:"11px 0", borderRadius:12, background:"linear-gradient(135deg,#8b5cf6,#06b6d4)", border:"none", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer" }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{ fontSize:17, fontWeight:900, color:"#18181b" }}>Book {provider.businessName}</div>
            <div style={{ fontSize:13, color:"#71717a", marginTop:2, marginBottom:20 }}>{provider.category} · {provider.city}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#52525b", textTransform:"uppercase", letterSpacing:"0.05em" }}>Event Date</span>
                <input type="date" value={eventDate} onChange={e=>setEventDate(e.target.value)} style={{ padding:"10px 14px", borderRadius:10, border:"1px solid #e4e4e7", fontSize:14, outline:"none" }} />
              </label>
              <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#52525b", textTransform:"uppercase", letterSpacing:"0.05em" }}>Venue / Location</span>
                <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="e.g. Wedding Hall, Patna" style={{ padding:"10px 14px", borderRadius:10, border:"1px solid #e4e4e7", fontSize:14, outline:"none" }} />
              </label>
              <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#52525b", textTransform:"uppercase", letterSpacing:"0.05em" }}>Notes (optional)</span>
                <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="Any special requirements..." style={{ padding:"10px 14px", borderRadius:10, border:"1px solid #e4e4e7", fontSize:14, outline:"none", resize:"none" }} />
              </label>
            </div>
            <div style={{ display:"flex", gap:10, marginTop:22 }}>
              <button onClick={onClose} style={{ flex:1, padding:"11px 0", borderRadius:12, border:"1px solid #e4e4e7", background:"#fff", fontSize:14, fontWeight:700, color:"#3f3f46", cursor:"pointer" }}>Cancel</button>
              <button onClick={confirm} disabled={!eventDate||!location} style={{ flex:1, padding:"11px 0", borderRadius:12, border:"none", background:"linear-gradient(135deg,#8b5cf6,#06b6d4)", fontSize:14, fontWeight:700, color:"#fff", cursor:"pointer", opacity:(!eventDate||!location)?0.45:1 }}>
                Confirm Booking
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Provider Card ─── */
function ProviderCard({ provider, onBook }: { provider: DemoProvider; onBook: (p: DemoProvider) => void }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = provider.imageUrl && !imgError ? provider.imageUrl : CATEGORY_IMAGE[provider.category];

  return (
    <div
      style={{ background:"#fff", borderRadius:20, border:"1px solid #e4e4e7", overflow:"hidden", transition:"transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease" }}
      onMouseEnter={(e) => { const el=e.currentTarget as HTMLDivElement; el.style.transform="translateY(-6px)"; el.style.boxShadow="0 20px 48px rgba(139,92,246,0.15)"; el.style.borderColor="#c4b5fd"; }}
      onMouseLeave={(e) => { const el=e.currentTarget as HTMLDivElement; el.style.transform="translateY(0)"; el.style.boxShadow="none"; el.style.borderColor="#e4e4e7"; }}
    >
      {/* Image */}
      <div style={{ position:"relative", aspectRatio:"16/10", overflow:"hidden", background:"#f4f4f5" }}>
        <Image src={imgSrc} alt={provider.businessName} fill className="object-cover" style={{ transition:"transform 0.5s ease" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgError(true)}
          onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform="scale(1.06)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform="scale(1)")}
        />
        {/* gradient */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
        {/* category pill */}
        <div style={{ position:"absolute", top:12, left:12 }}>
          <span style={{ background:"rgba(255,255,255,0.92)", backdropFilter:"blur(8px)", borderRadius:99, padding:"3px 10px", fontSize:11, fontWeight:700, color:"#3f3f46" }}>{provider.category}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:"16px 18px 18px" }}>
        <div style={{ fontSize:15, fontWeight:900, color:"#18181b" }}>{provider.businessName}</div>
        <div style={{ fontSize:12, fontWeight:600, color:"#71717a", marginTop:2 }}>{provider.ownerName}</div>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:10, fontSize:12, fontWeight:700, color:"#52525b" }}>
          <span>📍 {provider.city}</span>
          {provider.experienceYears>0 && <span>⭐ {provider.experienceYears} yrs</span>}
        </div>
        <div style={{ marginTop:8, fontSize:15, fontWeight:900, background:"linear-gradient(135deg,#7c3aed,#0891b2)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          ₹{provider.startingPrice.toLocaleString("en-IN")}+
        </div>
        {provider.description && (
          <div style={{ marginTop:8, fontSize:12, color:"#71717a", lineHeight:1.6, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
            {provider.description}
          </div>
        )}
        <div style={{ display:"flex", gap:8, marginTop:14 }}>
          <button onClick={() => onBook(provider)} style={{ flex:1, padding:"9px 0", borderRadius:10, border:"none", background:"linear-gradient(135deg,#8b5cf6,#06b6d4)", fontSize:13, fontWeight:700, color:"#fff", cursor:"pointer", boxShadow:"0 2px 10px rgba(139,92,246,0.3)", transition:"opacity 0.15s" }}
            onMouseEnter={e=>(e.currentTarget.style.opacity="0.88")} onMouseLeave={e=>(e.currentTarget.style.opacity="1")}>
            Book Now
          </button>
          {provider.phone && (
            <a href={`tel:${provider.phone}`} style={{ flex:1, padding:"9px 0", borderRadius:10, border:"1px solid #e4e4e7", background:"#fff", fontSize:13, fontWeight:700, color:"#3f3f46", textDecoration:"none", textAlign:"center", transition:"background 0.15s" }}
              onMouseEnter={e=>(e.currentTarget.style.background="#f4f4f5")} onMouseLeave={e=>(e.currentTarget.style.background="#fff")}>
              📞 Call
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState({ category }: { category: string }) {
  return (
    <div style={{ textAlign:"center", padding:"72px 24px" }}>
      <div style={{ width:96, height:96, borderRadius:"50%", background:"linear-gradient(135deg,#ede9fe,#cffafe)", margin:"0 auto 24px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:44 }}>
        🔍
      </div>
      <div style={{ fontSize:22, fontWeight:900, color:"#18181b" }}>No providers yet</div>
      <div style={{ fontSize:14, color:"#71717a", maxWidth:320, margin:"10px auto 0", lineHeight:1.7 }}>
        {category !== "All"
          ? `No ${category} providers have listed yet. Be the first to register!`
          : "Be the first to list your service on Evigo and reach thousands of clients."}
      </div>
      <Link href="/partner">
        <button style={{ marginTop:28, padding:"12px 28px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#8b5cf6,#06b6d4)", fontSize:14, fontWeight:700, color:"#fff", cursor:"pointer", boxShadow:"0 4px 20px rgba(139,92,246,0.35)", transition:"transform 0.15s, box-shadow 0.15s" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(139,92,246,0.5)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(139,92,246,0.35)";}}>
          Become a Partner →
        </button>
      </Link>
    </div>
  );
}

/* ─── Page ─── */
export default function ExplorePage() {
  const [category, setCategory] = useState<ServiceCategory | "All">("All");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceBand, setPriceBand] = useState(0);
  const [providers, setProviders] = useState<DemoProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<DemoProvider | null>(null);

  useEffect(() => {
    const load = () => setProviders(getDemoProviders().filter(p => p.isActive));
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const filtered = useMemo(() => {
    const band = PRICE_BANDS[priceBand];
    return providers.filter(p => {
      if (category !== "All" && p.category !== category) return false;
      if (locationFilter && !p.city.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      if (p.startingPrice < band.min || p.startingPrice >= band.max) return false;
      return true;
    });
  }, [providers, category, locationFilter, priceBand]);

  return (
    <main style={{ flex:1, paddingBottom:80 }}>
      {/* ── Hero header ── */}
      <div style={{ background:"linear-gradient(180deg,#faf5ff 0%,#f0f9ff 50%,#fff 100%)", borderBottom:"1px solid #f0f0f0", padding:"52px 0 40px" }}>
        <Container>
          <div style={{ textAlign:"center" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(139,92,246,0.08)", border:"1px solid rgba(139,92,246,0.2)", borderRadius:99, padding:"5px 16px", marginBottom:18, fontSize:13, fontWeight:700, color:"#7c3aed" }}>
              ✦ Real listings · No fake vendors
            </div>
            <h1 style={{ fontSize:42, fontWeight:900, lineHeight:1.15, margin:0 }}>
              <span style={{ background:"linear-gradient(135deg,#8b5cf6,#06b6d4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Explore Providers
              </span>
            </h1>
            <p style={{ fontSize:15, color:"#71717a", marginTop:12, maxWidth:460, margin:"12px auto 0", lineHeight:1.7 }}>
              Browse verified event professionals across Bihar. Real people, real services.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        {/* ── Filter bar ── */}
        <div style={{ margin:"28px 0", background:"#fff", borderRadius:16, border:"1px solid #e4e4e7", padding:"16px 20px", display:"flex", flexWrap:"wrap", gap:14, alignItems:"center", boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}>
          {/* Service type */}
          <div style={{ display:"flex", flexDirection:"column", gap:4, flex:"1 1 160px", minWidth:140 }}>
            <label style={{ fontSize:11, fontWeight:700, color:"#71717a", textTransform:"uppercase", letterSpacing:"0.06em" }}>Service Type</label>
            <select value={category} onChange={e => setCategory(e.target.value as ServiceCategory | "All")}
              style={{ padding:"8px 12px", borderRadius:10, border:"1px solid #e4e4e7", fontSize:13, fontWeight:600, color:"#18181b", outline:"none", background:"#fafafa", cursor:"pointer" }}>
              <option value="All">All Services</option>
              {SERVICE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Location */}
          <div style={{ display:"flex", flexDirection:"column", gap:4, flex:"1 1 160px", minWidth:140 }}>
            <label style={{ fontSize:11, fontWeight:700, color:"#71717a", textTransform:"uppercase", letterSpacing:"0.06em" }}>Location</label>
            <input value={locationFilter} onChange={e => setLocationFilter(e.target.value)} placeholder="City, e.g. Patna"
              style={{ padding:"8px 12px", borderRadius:10, border:"1px solid #e4e4e7", fontSize:13, fontWeight:600, color:"#18181b", outline:"none", background:"#fafafa" }} />
          </div>

          {/* Price */}
          <div style={{ display:"flex", flexDirection:"column", gap:4, flex:"1 1 160px", minWidth:160 }}>
            <label style={{ fontSize:11, fontWeight:700, color:"#71717a", textTransform:"uppercase", letterSpacing:"0.06em" }}>Price Range</label>
            <select value={priceBand} onChange={e => setPriceBand(Number(e.target.value))}
              style={{ padding:"8px 12px", borderRadius:10, border:"1px solid #e4e4e7", fontSize:13, fontWeight:600, color:"#18181b", outline:"none", background:"#fafafa", cursor:"pointer" }}>
              {PRICE_BANDS.map((b, i) => <option key={i} value={i}>{b.label}</option>)}
            </select>
          </div>

          {/* Result count */}
          <div style={{ marginLeft:"auto", fontSize:13, fontWeight:700, color:"#71717a", whiteSpace:"nowrap", paddingTop:18 }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* ── Category pill strip ── */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:28 }}>
          {(["All", ...SERVICE_CATEGORIES] as const).map((c) => {
            const active = category === c;
            return (
              <button key={c} onClick={() => setCategory(c as ServiceCategory | "All")}
                style={{ padding:"6px 16px", borderRadius:99, border: active ? "none" : "1px solid #e4e4e7", background: active ? "linear-gradient(135deg,#8b5cf6,#06b6d4)" : "#fff", color: active ? "#fff" : "#52525b", fontSize:13, fontWeight:700, cursor:"pointer", boxShadow: active ? "0 2px 10px rgba(139,92,246,0.3)" : "none", transition:"all 0.2s" }}>
                {c}
              </button>
            );
          })}
        </div>

        {/* ── Grid or Empty ── */}
        {filtered.length === 0 ? (
          <EmptyState category={category} />
        ) : (
          <div className="evigo-explore-grid">
            {filtered.map(p => (
              <ProviderCard key={p.id} provider={p} onBook={setSelectedProvider} />
            ))}
          </div>
        )}
      </Container>

      <BookingModal provider={selectedProvider} onClose={() => setSelectedProvider(null)} />
    </main>
  );
}
