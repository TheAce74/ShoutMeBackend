import { MONGODB_SCHEMA_OPTIONS } from "@/lib/constants";
import { model, Schema } from "mongoose";

const emergencySchema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  MONGODB_SCHEMA_OPTIONS
);

export const Emergency = model("Emergency", emergencySchema);
