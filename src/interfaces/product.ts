import { Types } from "mongoose";

interface Product {
  id?: string;
  name: string;
  description?: string;
  images?: string[];
  price?: {
    sale?: number;
    purchase?: number;
    priceType?: string;
  };
  categories?: string[] | Types.ObjectId[];
  stock?: number;
  status?: boolean;
  quantity?: number;
  suppliers?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type { Product };
