import Router from "express-promise-router";
import { login, logout, profile } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/profile", isAuth, profile);

export default router;
