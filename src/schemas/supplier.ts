import { z } from "zod";
import { Supplier as SupplierInt } from "@interfaces";

// Types
type Shape = Pick<
  SupplierInt,
  "name" | "description" | "address" | "contact" | "images"
>;

// Schemas
const Supplier = z.object({
  name: z.string(),
  description: z.string().optional(),
  address: z
    .object({
      postalCode: z.number().optional(),
      street: z.string().optional(),
      city: z.string().optional(),
      no: z.number().optional(),
      neighborhood: z.string().optional(),
    })
    .optional(),
  contact: z
    .object({
      email: z.string().email().optional(),
      phoneNumber: z.string().optional(),
      socialMedia: z.array(z.string()).optional(),
    })
    .optional(),
  images: z.array(z.string()).optional(),
}) satisfies z.ZodType<Shape>;

const SupplierPartial = Supplier.partial();

// Schema types
type SupplierSchema = z.infer<typeof Supplier>;
type SupplierSchemaPartial = z.infer<typeof SupplierPartial>;

export { SupplierSchema, Supplier, SupplierSchemaPartial, SupplierPartial };
