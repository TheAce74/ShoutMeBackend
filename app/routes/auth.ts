import { login, register } from "@/controllers/auth";
import { loginSchema, registerSchema } from "@/lib/schema";
import { validateSchema } from "@/middleware/validation";
import express from "express";

const router = express.Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);

export { router as authRoutes };
