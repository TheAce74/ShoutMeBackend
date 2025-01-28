import { MONGODB_SCHEMA_OPTIONS } from "@/lib/constants";
import { model, Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  MONGODB_SCHEMA_OPTIONS
);

export const Notification = model("Notification", notificationSchema);
