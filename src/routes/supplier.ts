import { Router } from "express";
import { supplier } from "@controllers";
import { validateSchema } from "@middlewares";
import { Supplier, SupplierPartial } from "@schemas";

const router = Router();
const prefix = "/suppliers";

// Endpoints
router.get(prefix, supplier.home);
router.post(prefix, validateSchema(Supplier), supplier.create);
router.get(`${prefix}/:id`, supplier.edit);
router.patch(`${prefix}/:id`, validateSchema(SupplierPartial), supplier.update);
router.delete(`${prefix}/:id`, supplier.destroy);

export { router as supplier };
