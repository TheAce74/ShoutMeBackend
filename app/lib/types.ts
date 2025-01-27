import { loginSchema, registerSchema } from "@/lib/schema";
import { z } from "zod";

export type RegisterBody = z.infer<typeof registerSchema>;

export type LoginBody = z.infer<typeof loginSchema>;
