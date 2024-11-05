import { z } from "zod";
import { Product as ProductInt } from "@interfaces";
import { verifyIdInCollection, parsedToObjectId } from "@utils";

// Types
type Shape = Pick<
  ProductInt,
  | "name"
  | "description"
  | "images"
  | "price"
  | "stock"
  | "quantity"
  | "status"
  | "categories"
  | "suppliers"
>;

// Schemas
const Product = z.object({
  name: z
    .string({
      required_error: "Product name is required",
      invalid_type_error: "Product name must be a string",
    })
    .min(3, {
      message: "Product name must have at least 3 characters as minimum.",
    }),
  description: z
    .string({
      invalid_type_error: "Description must be a text",
    })
    .optional(),
  images: z.string().array().optional(),
  price: z
    .object({
      sale: z
        .number({
          invalid_type_error: "Price must be a number",
        })
        .optional(),
      purchase: z
        .number({
          invalid_type_error: "Price must be a number",
        })
        .optional(),
      priceType: z
        .string({
          invalid_type_error: "Price must be a string",
        })
        .optional(),
    })
    .optional(),
  stock: z.number({ invalid_type_error: "Price must be a string" }).optional(),
  quantity: z
    .number({
      invalid_type_error: "Quantity must be a number",
    })
    .optional(),
  status: z
    .boolean({
      invalid_type_error: "Status must be a boolean",
    })
    .optional(),
  categories: z
    .array(
      z.string({
        invalid_type_error: "Categories must be a list of existing categories",
      }),
    )
    .transform(
      parsedToObjectId({
        code: z.ZodIssueCode.custom,
        message: "The list of categories haven't a valid format",
        path: ["parsedObjectId"],
      }),
    )
    .refine(verifyIdInCollection("categories"), {
      message: "The list of categories dont't exist",
    })
    .optional(),
  suppliers: z.array(z.string()).optional(),
}) satisfies z.ZodType<Shape>;

const ProductPartial = Product.partial();

// Schema Types
type ProductSchema = z.infer<typeof Product>;
type ProductSchemaPartial = z.infer<typeof ProductPartial>;

export { ProductSchema, Product, ProductPartial, ProductSchemaPartial };
