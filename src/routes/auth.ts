import { Router } from "express";
import { auth } from "@controllers";
import { generateToken, validateSchema, verifyAuth } from "@middlewares";
import { User, UserLogin } from "@schemas";

const router = Router();

router.post("/sign-in", validateSchema(UserLogin), auth.signIn, generateToken);
router.post("/sign-up", validateSchema(User), auth.signUp, generateToken);
router.get("/logout", verifyAuth, auth.logOut);

export { router as auth };
