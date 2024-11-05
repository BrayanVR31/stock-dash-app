import { Router } from "express";
import { z } from "zod";
import { purchase } from "@controllers";
import { PurchaseBase, PurchasePartial } from "@schemas";
import { validateSchema } from "@middlewares";

const router = Router();
const prefix = "/purchases";

// Endpoints
router.get(prefix, purchase.home);
router.post(prefix, validateSchema(PurchaseBase as z.ZodType), purchase.create);
router.get(`${prefix}/:id`, purchase.edit);
router.patch(
  `${prefix}/:id`,
  validateSchema(PurchasePartial as z.ZodType),
  purchase.update,
);
router.delete(`${prefix}/:id`, purchase.destroy);

export { router as purchase };
