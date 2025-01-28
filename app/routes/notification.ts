import { getNotifications } from "@/controllers/notification";
import { authenticate } from "@/middleware/auth";
import express from "express";

const router = express.Router();

router.get("/", authenticate, getNotifications);

export { router as notificationRoutes };
