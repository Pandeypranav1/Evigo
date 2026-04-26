"use client";

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
  addDoc,
} from "firebase/firestore";
import { getFirestoreDb, tryGetFirestoreDb } from "@/lib/firebase";
import type { BookingDoc, BookingStatus, ProviderDoc } from "@/lib/firestoreTypes";
import type { ServiceCategory } from "@/lib/constants";

export function subscribeProviders(
  args: { category?: ServiceCategory | "All" },
  onData: (providers: ProviderDoc[]) => void,
  onError?: (err: unknown) => void
) {
  const firestore = tryGetFirestoreDb();
  if (!firestore) {
    onData([]);
    return () => {};
  }
  const base = collection(firestore, "providers");
  const q =
    args.category && args.category !== "All"
      ? query(
          base,
          where("isActive", "==", true),
          where("category", "==", args.category),
          orderBy("createdAt", "desc")
        )
      : query(base, where("isActive", "==", true), orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snap) => {
      const providers = snap.docs.map((d) => {
        const data = d.data() as Omit<ProviderDoc, "id">;
        return { ...data, id: d.id } satisfies ProviderDoc;
      });
      onData(providers);
    },
    (err) => onError?.(err)
  );
}

export async function createBooking(
  data: Omit<BookingDoc, "id" | "createdAt" | "updatedAt" | "status"> & {
    createdAt?: number;
  }
) {
  const firestore = getFirestoreDb();
  const now = Date.now();
  const ref = await addDoc(collection(firestore, "bookings"), {
    ...data,
    status: "pending" satisfies BookingStatus,
    createdAt: data.createdAt ?? now,
    updatedAt: now,
  });
  return ref.id;
}

export function subscribeClientBookings(
  clientUid: string,
  onData: (bookings: BookingDoc[]) => void,
  onError?: (err: unknown) => void
) {
  const firestore = tryGetFirestoreDb();
  if (!firestore) {
    onData([]);
    return () => {};
  }
  const q = query(
    collection(firestore, "bookings"),
    where("clientUid", "==", clientUid),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(
    q,
    (snap) => {
      const bookings = snap.docs.map((d) => {
        const data = d.data() as Omit<BookingDoc, "id">;
        return { ...data, id: d.id } satisfies BookingDoc;
      });
      onData(bookings);
    },
    (err) => onError?.(err)
  );
}

export function subscribeProviderBookings(
  providerOwnerUid: string,
  onData: (bookings: BookingDoc[]) => void,
  onError?: (err: unknown) => void
) {
  const firestore = tryGetFirestoreDb();
  if (!firestore) {
    onData([]);
    return () => {};
  }
  const q = query(
    collection(firestore, "bookings"),
    where("providerOwnerUid", "==", providerOwnerUid),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(
    q,
    (snap) => {
      const bookings = snap.docs.map((d) => {
        const data = d.data() as Omit<BookingDoc, "id">;
        return { ...data, id: d.id } satisfies BookingDoc;
      });
      onData(bookings);
    },
    (err) => onError?.(err)
  );
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const firestore = getFirestoreDb();
  await updateDoc(doc(firestore, "bookings", id), {
    status,
    updatedAt: Date.now(),
  });
}

