import { Schema, SchemaTypes, model } from "mongoose";
import { Purchase } from "@interfaces";

// Schemas
const purchaseSchema = new Schema<Purchase>(
  {
    totalPrice: { type: Number, required: true },
    ticket: { type: [String], required: false },
    products: { type: [SchemaTypes.ObjectId], ref: "Product", required: true },
    supplier: { type: SchemaTypes.ObjectId, required: true, ref: "Supplier" },
    deletedAt: { type: Date, required: false, default: null },
  },
  { versionKey: false, timestamps: true },
);

// Keys aliases
purchaseSchema.alias("_id", "id");

// Model
const Purchase = model<Purchase>("Purchase", purchaseSchema);

export { Purchase };
