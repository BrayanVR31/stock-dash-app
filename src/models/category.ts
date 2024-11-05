import { Schema, model } from "mongoose";
import { Category } from "@interfaces";

// Schema
const categorySchema = new Schema<Category>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Keys aliases
categorySchema.alias("_id", "id");

// Model
const Category = model<Category>("Category", categorySchema);

export { Category };
