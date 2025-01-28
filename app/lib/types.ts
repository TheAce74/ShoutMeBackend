import { addEmergencySchema, loginSchema, registerSchema } from "@/lib/schema";
import { z } from "zod";

export type RegisterBody = z.infer<typeof registerSchema>;

export type LoginBody = z.infer<typeof loginSchema>;

export type AddEmergencyBody = z.infer<typeof addEmergencySchema>;

export type WithToken<T> = T & {
  user: string;
};
