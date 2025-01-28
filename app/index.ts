import { ENV } from "@/config/env";
import { errorHandler } from "@/middleware/error";
import express from "express";
import "@/config/db";
import morgan from "morgan";
import { authRoutes } from "@/routes/auth";
import { emergencyRoutes } from "@/routes/emergency";
import { notificationRoutes } from "@/routes/notification";

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/notification", notificationRoutes);

// error middleware
app.use(errorHandler);

// start server
app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
});
