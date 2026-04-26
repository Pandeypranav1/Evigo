/**
 * demoStore.ts
 * -----------
 * All demo/offline state lives here (no Firebase required).
 * Uses localStorage so data persists across page refreshes.
 */

import type { ServiceCategory } from "@/lib/constants";

export type UserRole = "client" | "provider";

export type DemoUser = {
  uid: string;
  phone: string;
  role: UserRole;
};

export type DemoProvider = {
  id: string;
  ownerUid: string;
  ownerName: string;
  businessName: string;
  category: ServiceCategory;
  phone: string;
  city: string;
  startingPrice: number;
  experienceYears: number;
  description: string;
  imageUrl: string;
  createdAt: number;
  isActive: boolean;
};

export type DemoBooking = {
  id: string;
  providerId: string;
  providerOwnerUid: string;
  clientUid: string;
  clientPhone: string;
  eventDate: string;
  location: string;
  notes: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: number;
  updatedAt: number;
};

// ─────────────────────────── DEMO OTP ───────────────────────────
export const DEMO_OTP = "123456";

// ─────────────────────────── AUTH ───────────────────────────────
const AUTH_KEY = "evigo_demo_user";

export function getDemoUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  } catch {
    return null;
  }
}

export function setDemoUser(user: DemoUser) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearDemoUser() {
  localStorage.removeItem(AUTH_KEY);
}

// ─────────────────────────── PROVIDERS ──────────────────────────
const PROVIDERS_KEY = "evigo_demo_providers";

export function getDemoProviders(): DemoProvider[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PROVIDERS_KEY);
    return raw ? (JSON.parse(raw) as DemoProvider[]) : [];
  } catch {
    return [];
  }
}

export function saveDemoProvider(p: Omit<DemoProvider, "id" | "createdAt" | "isActive">) {
  const providers = getDemoProviders();
  const newProvider: DemoProvider = {
    ...p,
    id: `demo_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
    isActive: true,
  };
  providers.unshift(newProvider);
  localStorage.setItem(PROVIDERS_KEY, JSON.stringify(providers));
  return newProvider;
}

// ─────────────────────────── BOOKINGS ───────────────────────────
const BOOKINGS_KEY = "evigo_demo_bookings";

export function getDemoBookings(): DemoBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    return raw ? (JSON.parse(raw) as DemoBooking[]) : [];
  } catch {
    return [];
  }
}

export function saveDemoBooking(b: Omit<DemoBooking, "id" | "createdAt" | "updatedAt" | "status">) {
  const bookings = getDemoBookings();
  const newBooking: DemoBooking = {
    ...b,
    id: `booking_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    status: "pending",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  bookings.unshift(newBooking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return newBooking;
}

export function updateDemoBookingStatus(id: string, status: "accepted" | "rejected") {
  const bookings = getDemoBookings();
  const updated = bookings.map((b) =>
    b.id === id ? { ...b, status, updatedAt: Date.now() } : b
  );
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
}
