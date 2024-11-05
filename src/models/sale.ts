import { Schema, SchemaTypes, model } from "mongoose";
import { Sale } from "@interfaces";

// Schema
const saleSchema = new Schema<Sale>(
  {
    products: {
      type: [SchemaTypes.ObjectId],
      ref: "Products",
      required: true,
    },
    user: { type: SchemaTypes.ObjectId, required: true },
    revenue: { type: Number, required: true },
    deletedAt: { type: Date, required: false, default: null },
  },
  { versionKey: false, timestamps: true },
);

// Keys aliases
saleSchema.alias("_id", "id");

// Model
const Sale = model<Sale>("Sale", saleSchema);

export { Sale };
