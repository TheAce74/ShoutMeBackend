import { PASSWORD_REGEX } from "@/lib/constants";
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Enter your full name"),
  email: z
    .string()
    .min(1, "Enter your email address")
    .email("Enter a valid email address"),
  phoneNumber: z.string().min(1, "Enter your phone number"),
  location: z.string().min(1, "Enter your location"),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      "Password must contain an uppercase letter, a lowercase letter, a digit, and a special character"
    )
    .min(8, "Password must be at least 8 characters long"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Enter your email address")
    .email("Enter a valid email address"),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      "Password must contain an uppercase letter, a lowercase letter, a digit, and a special character"
    )
    .min(8, "Password must be at least 8 characters long"),
});

export const addEmergencySchema = z.object({
  title: z.string().min(1, "Enter emergency title"),
  location: z.string().min(1, "Enter emergency location"),
  description: z.string().min(1, "Enter emergency description"),
});
