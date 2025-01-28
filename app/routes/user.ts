import { getProfile, updateProfile } from "@/controllers/user";
import { authenticate } from "@/middleware/auth";
import { upload } from "@/middleware/upload";
import express from "express";

const router = express.Router();

router.get("/", authenticate, getProfile);
router.patch("/", authenticate, upload.single("profilePicture"), updateProfile);

export { router as userRoutes };
