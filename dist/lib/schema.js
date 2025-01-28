"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEmergencySchema =
  exports.loginSchema =
  exports.registerSchema =
    void 0;
const constants_1 = require("@/lib/constants");
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
  name: zod_1.z.string().min(1, "Enter your full name"),
  email: zod_1.z
    .string()
    .min(1, "Enter your email address")
    .email("Enter a valid email address"),
  phoneNumber: zod_1.z.string().min(1, "Enter your phone number"),
  location: zod_1.z.string().min(1, "Enter your location"),
  password: zod_1.z
    .string()
    .regex(
      constants_1.PASSWORD_REGEX,
      "Password must contain an uppercase letter, a lowercase letter, a digit, and a special character"
    )
    .min(8, "Password must be at least 8 characters long"),
});
exports.loginSchema = zod_1.z.object({
  email: zod_1.z
    .string()
    .min(1, "Enter your email address")
    .email("Enter a valid email address"),
  password: zod_1.z
    .string()
    .regex(
      constants_1.PASSWORD_REGEX,
      "Password must contain an uppercase letter, a lowercase letter, a digit, and a special character"
    )
    .min(8, "Password must be at least 8 characters long"),
});
exports.addEmergencySchema = zod_1.z.object({
  title: zod_1.z.string().min(1, "Enter emergency title"),
  location: zod_1.z.string().min(1, "Enter emergency location"),
  description: zod_1.z.string().min(1, "Enter emergency description"),
});
