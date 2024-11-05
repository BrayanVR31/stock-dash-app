import { Router } from "express";
import { category, product, supplier, sale, purchase, auth } from "@routes";
import { verifyAuth } from "@middlewares";

// Router
const router = Router();
const prefix = "/v1";

// V1 routes
router.use(prefix, auth);
router.use(prefix, verifyAuth, [category, product, supplier, sale, purchase]);

export default router;
