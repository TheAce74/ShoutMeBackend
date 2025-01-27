import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  BCRYPT_SALT_ROUNDS: z.coerce.number(),
  MONGODB_URI: z.string(),
});

export const ENV = envSchema.parse(process.env);
