import { Schema, model } from "mongoose";
import { User } from "@interfaces/user";

// Schema
const userSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: false },
    image: { type: [String], required: false },
    deletedAt: { type: Date, required: false, default: null },
  },
  { versionKey: false, timestamps: true },
);

// Keys aliases
userSchema.alias("_id", "id");

// Model
const User = model<User>("User", userSchema);

export { User };
