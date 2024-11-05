import { Schema, model } from "mongoose";
import { Supplier } from "@interfaces";

// Schema
const supplierSchema = new Schema<Supplier>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    images: { type: [String], required: false },
    address: {
      postalCode: { type: Number, required: false },
      street: { type: String, required: false },
      city: { type: String, required: false },
      no: { type: Number, required: false }, // Exterior number
      neighborhood: { type: String, required: false },
    },
    contact: {
      email: { type: String, required: false },
      phoneNumber: { type: String, required: false },
      socialMedia: { type: [String], required: false },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// Keys aliases
supplierSchema.alias("_id", "id");

// Model
const Supplier = model<Supplier>("Supplier", supplierSchema);

export { Supplier };
