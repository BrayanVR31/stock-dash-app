import { z } from "zod";
import { Sale as SaleInt } from "@interfaces";
import {
  parsedToObjectId,
  verifyIdInCollection,
  getItemFromArray,
} from "@utils";

// Types
type Shape = Pick<SaleInt, "products" | "revenue" | "user">;

// Schemas
export const Sale = z.object({
  products: z
    .array(
      z.string({
        required_error: "The list of products are required field",
        invalid_type_error: "The list of products aren't valid",
      }),
    )
    .transform(
      parsedToObjectId({
        code: z.ZodIssueCode.custom,
        message: "The product list haven't a valid format",
        path: ["parsedObjectId"],
      }),
    )
    .refine(verifyIdInCollection("products"), {
      message: "The product list doesn't exists in the database",
    }),
  revenue: z.number({
    required_error: "The revenue is a required field",
    invalid_type_error: "The revenue must be a number type",
  }),
  user: z
    .string({
      required_error: "The user is a required field",
      invalid_type_error: "The user hasn't a valid format",
    })
    .transform(
      parsedToObjectId({
        code: z.ZodIssueCode.custom,
        message: "The user reference haven't a valid format",
        path: ["parsedObjectId"],
      }),
    )
    .refine(verifyIdInCollection("users"))
    .transform(getItemFromArray),
}) satisfies z.ZodType<Shape>;

export const SalePartial = Sale.partial();

// Schema types
export type SaleBaseSchema = z.infer<typeof Sale>;
export type SalePartialSchema = z.infer<typeof SalePartial>;
