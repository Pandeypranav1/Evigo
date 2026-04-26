"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import type { DemoBooking } from "@/lib/demoStore";
import { getDemoBookings } from "@/lib/demoStore";

export default function ClientDashboard() {
  const router = useRouter();
  const { user, role, loading, signOut } = useAuth();
  const [bookings, setBookings] = useState<DemoBooking[]>([]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login/client");
      return;
    }
    if (role !== "client") {
      router.replace("/provider/dashboard");
      return;
    }

    const loadData = () => {
      const all = getDemoBookings();
      const mine = all.filter((b) => b.clientUid === user.uid);
      setBookings(mine);
    };

    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, [loading, role, router, user]);

  const handleSignOut = () => {
    signOut();
    router.replace("/");
  };

  const statusColor = {
    pending: "#f59e0b",
    accepted: "#10b981",
    rejected: "#ef4444",
  };

  const statusLabel = {
    pending: "⏳ Pending",
    accepted: "✅ Accepted",
    rejected: "❌ Rejected",
  };

  return (
    <main className="flex-1 py-10">
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 border border-cyan-200 px-3 py-1 text-xs font-bold text-cyan-700 mb-2">
              👤 Client Dashboard
            </div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900">
              Your Bookings
            </h1>
            <p className="mt-1 text-sm font-semibold text-zinc-500">
              {user?.phone || "Guest"} • Track your event bookings
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/explore">
              <Button>Book a Service</Button>
            </Link>
            <Button variant="secondary" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Bookings */}
        <div className="mt-8">
          {bookings.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-zinc-200 bg-white p-12 text-center">
              <div style={{ fontSize: 48 }} className="mb-4">📋</div>
              <div className="text-xl font-black text-zinc-800">No bookings yet</div>
              <div className="mt-2 text-sm font-semibold text-zinc-500 max-w-xs mx-auto">
                Head to Explore and click &ldquo;Book Now&rdquo; on any provider.
              </div>
              <Link href="/explore" className="inline-block mt-6">
                <Button>Explore Providers →</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 hover:shadow-sm transition"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-sm font-black text-zinc-900">Booking Request</div>
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
                          {statusLabel[b.status]}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-zinc-600">📅 {b.eventDate}</div>
                      <div className="text-sm font-semibold text-zinc-600">📍 {b.location}</div>
                      {b.notes && (
                        <div className="mt-1 text-sm text-zinc-500">📝 {b.notes}</div>
                      )}
                    </div>
                    <div className="text-xs font-mono text-zinc-400">
                      #{b.id.slice(-8)}
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
