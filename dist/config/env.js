"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
  PORT: zod_1.z.coerce.number(),
  JWT_SECRET: zod_1.z.string(),
  BCRYPT_SALT_ROUNDS: zod_1.z.coerce.number(),
  MONGODB_URI: zod_1.z.string(),
});
exports.ENV = envSchema.parse(process.env);
