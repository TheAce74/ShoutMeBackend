import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  BCRYPT_SALT_ROUNDS: z.coerce.number(),
  MONGODB_URI: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_REGION: z.string(),
});

export const ENV = envSchema.parse(process.env);
