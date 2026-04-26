import mongoose, { Schema, models, model } from "mongoose";

export interface IProvider {
  _id?: mongoose.Types.ObjectId;
  ownerUid: string;
  businessName: string;
  ownerName: string;
  category: string;
  startingPrice: number;
  city: string;
  phone: string;
  experienceYears: number;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
}

const ProviderSchema = new Schema<IProvider>(
  {
    ownerUid:       { type: String, required: true },
    businessName:   { type: String, required: true, trim: true },
    ownerName:      { type: String, required: true, trim: true },
    category:       { type: String, required: true, enum: ["Catering", "Photography", "DJ", "Mehendi & Makeup", "Cultural"] },
    startingPrice:  { type: Number, required: true, min: 0 },
    city:           { type: String, required: true, trim: true },
    phone:          { type: String, default: "" },
    experienceYears:{ type: Number, default: 0 },
    description:    { type: String, default: "" },
    imageUrl:       { type: String, default: "" },
    isActive:       { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Prevent model re-compilation during Next.js HMR
export const Provider = models.Provider ?? model<IProvider>("Provider", ProviderSchema);
