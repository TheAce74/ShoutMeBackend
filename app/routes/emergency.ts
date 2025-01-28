import { createEmergency } from "@/controllers/emergency";
import { addEmergencySchema } from "@/lib/schema";
import { authenticate } from "@/middleware/auth";
import { validateSchema } from "@/middleware/validation";
import express from "express";

const router = express.Router();

router.post(
  "/",
  authenticate,
  validateSchema(addEmergencySchema),
  createEmergency
);

export { router as emergencyRoutes };
