import { ENV } from "@/config/env";
import mongoose from "mongoose";

mongoose
  .connect(ENV.MONGODB_URI)
  .then(() => {
    console.log("MongoDB database running successfully");
  })
  .catch((error) => {
    console.log("MongoDB database unavailable");
    console.error(error);
  });
