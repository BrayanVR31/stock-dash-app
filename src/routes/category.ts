import { RequestHandler, Router } from "express";
import { category } from "@controllers";
import { validateSchema } from "@middlewares";
import { Category, CategoryPartial } from "@schemas";

const router = Router();
const prefix = "/categories";

router.get(`${prefix}`, category.home);
router.post(prefix, validateSchema(Category), category.create);
router.get(`${prefix}/:id`, category.edit);
router.patch(`${prefix}/:id`, validateSchema(CategoryPartial), category.update);
router.delete(`${prefix}/:id`, category.destroy);

export { router as category };
