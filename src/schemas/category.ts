import { z } from "zod";
import { Category as CategoryInt } from "@interfaces";

// Type
type Shape = Pick<CategoryInt, "name">;

// Schema
const Category = z.object({
  name: z.string({
    required_error: "Category name is required",
    invalid_type_error: "Category name must be of type string",
  }),
}) satisfies z.ZodType<Shape>;

const CategoryPartial = Category.partial();

// Schema Types
type CategorySchema = z.infer<typeof Category>;
type CategorySchemaPartial = z.infer<typeof CategoryPartial>;

export { CategorySchema, Category, CategoryPartial, CategorySchemaPartial };
