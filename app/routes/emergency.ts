import {
  createEmergency,
  getEmergencies,
  resolveEmergency,
} from "@/controllers/emergency";
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
router.get("/", authenticate, getEmergencies);
router.patch("/:id", authenticate, resolveEmergency);

export { router as emergencyRoutes };
