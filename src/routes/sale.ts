import { Router } from "express";
import { z } from "zod";
import { sale } from "@controllers";
import { validateSchema } from "@middlewares";
import { Sale, SalePartial } from "@schemas";

const router = Router();
const prefix = "/sales";

// Endpoints
router.get(prefix, sale.home);
router.post(prefix, validateSchema(Sale as z.ZodType), sale.create);
router.get(`${prefix}/:id`, sale.edit);
router.patch(
  `${prefix}/:id`,
  validateSchema(SalePartial as z.ZodType),
  sale.update,
);
router.delete(`${prefix}/:id`, sale.destroy);

export { router as sale };
