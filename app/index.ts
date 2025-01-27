import { ENV } from "@/config/env";
import { errorHandler } from "@/middleware/error";
import express from "express";
import "@/config/db";
import { authRoutes } from "@/routes/auth";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// error middleware
app.use(errorHandler);

// start server
app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
});
