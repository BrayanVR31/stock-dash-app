import { z } from "zod";
import { Purchase } from "@interfaces";
import {
  parsedToObjectId,
  verifyIdInCollection,
  getItemFromArray,
} from "@utils";

// Types
type Shape = Pick<Purchase, "products" | "supplier" | "ticket" | "totalPrice">;

// Schemas
export const PurchaseBase = z.object({
  // Required
  products: z
    .array(z.string())
    .transform(
      parsedToObjectId({
        code: z.ZodIssueCode.custom,
        message: "The list of products haven't a valid format",
        path: ["parsedObjectId"],
      }),
    )
    .refine(verifyIdInCollection("products"), {
      message: "The list of products dont't exist",
    }),
  supplier: z
    .string()
    .transform(
      parsedToObjectId({
        code: z.ZodIssueCode.custom,
        message: "The supplier hasn't a valid format",
        path: ["parsedObjectId"],
      }),
    )
    .refine(verifyIdInCollection("suppliers"), {
      message: "The supplier doesn't exist",
    })
    .transform(getItemFromArray),
  totalPrice: z.number(),
  // Optional
  ticket: z.array(z.string()).optional(),
}) satisfies z.ZodType<Shape>;

export const PurchasePartial = PurchaseBase.partial();

// Schema types
export type PurchaseIntBase = z.infer<typeof PurchaseBase>;
export type PurchaseIntPartial = z.infer<typeof PurchasePartial>;
