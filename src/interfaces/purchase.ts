import { Types } from "mongoose";

interface Purchase {
  id?: string;
  totalPrice: number; // Total products price
  ticket?: string[]; // Ticket image
  products: string[] | Types.ObjectId[];
  supplier: string | Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type { Purchase };
