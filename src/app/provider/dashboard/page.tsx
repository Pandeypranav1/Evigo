"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import type { DemoBooking, DemoProvider } from "@/lib/demoStore";
import { getDemoBookings, getDemoProviders, updateDemoBookingStatus } from "@/lib/demoStore";

export default function ProviderDashboard() {
  const router = useRouter();
  const { user, role, loading, signOut } = useAuth();
  const [bookings, setBookings] = useState<DemoBooking[]>([]);
  const [myListings, setMyListings] = useState<DemoProvider[]>([]);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login/provider");
      return;
    }
    if (role !== "provider") {
      router.replace("/dashboard");
      return;
    }

    // Load bookings for this provider's listings
    const loadData = () => {
      const allBookings = getDemoBookings();
      const allProviders = getDemoProviders();
      const mine = allProviders.filter((p) => p.ownerUid === user.uid);
      const myIds = new Set(mine.map((p) => p.id));
      const myBookings = allBookings.filter((b) => myIds.has(b.providerId));
      setMyListings(mine);
      setBookings(myBookings);
    };

    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, [loading, role, router, user]);

  const act = (id: string, next: "accepted" | "rejected") => {
    setUpdating(id);
    updateDemoBookingStatus(id, next);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: next } : b))
    );
    setTimeout(() => setUpdating(null), 400);
  };

  const handleSignOut = () => {
    signOut();
    router.replace("/");
  };

  const statusColor = {
    pending: "#f59e0b",
    accepted: "#10b981",
    rejected: "#ef4444",
  };

  return (
    <main className="flex-1 py-10">
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 border border-violet-200 px-3 py-1 text-xs font-bold text-violet-700 mb-2">
              🎪 Provider Dashboard
            </div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900">
              Welcome, {user?.phone || "Provider"}
            </h1>
            <p className="mt-1 text-sm font-semibold text-zinc-500">
              Manage your bookings and listing
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/partner">
              <Button>+ Add Listing</Button>
            </Link>
            <Button variant="secondary" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* My Listings */}
        <div className="mt-8">
          <h2 className="text-lg font-black text-zinc-900 mb-3">Your Listings</h2>
          {myListings.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-zinc-200 bg-white p-8 text-center">
              <div style={{ fontSize: 40 }} className="mb-3">📋</div>
              <div className="text-base font-black text-zinc-800">No listings yet</div>
              <div className="mt-1 text-sm font-semibold text-zinc-500">
                Submit the partner form to get your service listed.
              </div>
              <Link href="/partner" className="inline-block mt-4">
                <Button>Register Your Service</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {myListings.map((l) => (
                <div
                  key={l.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 hover:border-violet-200 hover:shadow-sm transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-black text-zinc-900">{l.businessName}</div>
                      <div className="mt-0.5 text-xs font-semibold text-zinc-500">
                        {l.category} • {l.city}
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-bold text-emerald-700">
                      Live
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-bold text-violet-700">
                    ₹{l.startingPrice.toLocaleString("en-IN")}+
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bookings */}
        <div className="mt-10">
          <h2 className="text-lg font-black text-zinc-900 mb-3">Booking Requests</h2>
          {bookings.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center">
              <div style={{ fontSize: 40 }} className="mb-3">📬</div>
              <div className="text-base font-black text-zinc-800">No booking requests yet</div>
              <div className="mt-1 text-sm font-semibold text-zinc-500">
                Clients will appear here once they book your service.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 hover:shadow-sm transition"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-black text-zinc-900">
                          {b.status === "pending" ? "New Request" : `Request ${b.status.toUpperCase()}`}
                        </div>
                        <span
                          style={{
                            background: `${statusColor[b.status]}15`,
                            border: `1px solid ${statusColor[b.status]}40`,
                            color: statusColor[b.status],
                            borderRadius: 100,
                            padding: "2px 10px",
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          {b.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-zinc-600">
                        📅 {b.eventDate}
                      </div>
                      <div className="text-sm font-semibold text-zinc-600">
                        📍 {b.location}
                      </div>
                      <div className="text-sm font-semibold text-zinc-600">
                        👤 {b.clientPhone || b.clientUid}
                      </div>
                      {b.notes && (
                        <div className="mt-1 text-sm text-zinc-500">
                          📝 {b.notes}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        onClick={() => act(b.id, "accepted")}
                        disabled={b.status !== "pending" || updating === b.id}
                      >
                        {updating === b.id ? "…" : "Accept"}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => act(b.id, "rejected")}
                        disabled={b.status !== "pending" || updating === b.id}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
