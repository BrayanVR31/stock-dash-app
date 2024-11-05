import { Types } from "mongoose";

interface Sale {
  id?: string;
  products: string[] | Types.ObjectId[];
  user: string | Types.ObjectId;
  revenue: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type { Sale };
