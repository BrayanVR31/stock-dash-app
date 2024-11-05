import { Router } from "express";
import v1 from "./v1";

// API routes
const router = Router();
const prefix = "/api";

router.use(prefix, v1);

export { router as api };
