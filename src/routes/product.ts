import { Router } from "express";
import { z } from "zod";
import { product } from "@controllers";
import { Product, ProductPartial } from "@schemas";
import { validateSchema } from "@middlewares";

const router = Router();
const prefix = "/products";

// Endpoints
router.get(prefix, product.home);
router.get(`${prefix}/:id`, product.edit);
router.post(prefix, validateSchema(Product as z.ZodType), product.create);
router.patch(
  `${prefix}/:id`,
  validateSchema(ProductPartial as z.ZodType),
  product.update,
);
router.delete(`${prefix}/:id`, product.destroy);

export { router as product };
