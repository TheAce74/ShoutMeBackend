import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = model("User", userSchema);
