import { ENV } from "@/config/env";
import { errorHandler } from "@/middleware/error";
import express from "express";
import "@/config/db";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import { authRoutes } from "@/routes/auth";
import { emergencyRoutes } from "@/routes/emergency";
import { notificationRoutes } from "@/routes/notification";
import { userRoutes } from "@/routes/user";

const app = express();

// setup cors
const corsOptions: CorsOptions = {
  origin: ["http://localhost:4000", "https://shoutme.vercel.app"],
};

// middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/user", userRoutes);

// error middleware
app.use(errorHandler);

// start server
app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
});
