import { Schema, model, SchemaTypes } from "mongoose";
import { Product } from "@interfaces";

// Schema
const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    stock: { type: Number, required: false, default: 0 },
    categories: {
      type: [SchemaTypes.ObjectId],
      ref: "Category",
      required: false,
    },
    images: { type: [String], required: false },
    price: {
      purchase: { type: Number, required: false },
      sale: { type: Number, required: false },
      priceType: { type: String, required: false },
    },
    quantity: { type: Number, required: false, default: 0 },
    status: { type: Boolean, required: false, default: false },
    suppliers: {
      type: [SchemaTypes.ObjectId],
      required: false,
      ref: "Supplier",
    },
    deletedAt: { type: Date, required: false, default: null },
  },
  { versionKey: false, timestamps: true },
);

// Keys aliases
productSchema.alias("_id", "id");

// Model
const Product = model<Product>("Product", productSchema);

export { Product };
