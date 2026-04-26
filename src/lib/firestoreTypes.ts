import type { ServiceCategory } from "@/lib/constants";

export type UserRole = "client" | "provider";

export type UserDoc = {
  uid: string;
  role: UserRole;
  phone: string;
  createdAt: number;
};

export type ProviderDoc = {
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

export type BookingStatus = "pending" | "accepted" | "rejected";

export type BookingDoc = {
  id: string;
  providerId: string;
  providerOwnerUid: string;
  clientUid: string;
  clientPhone: string;
  eventDate: string;
  location: string;
  notes: string;
  status: BookingStatus;
  createdAt: number;
  updatedAt: number;
};

