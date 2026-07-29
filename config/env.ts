import { config } from "dotenv";
import { z } from "zod";
import type { SignOptions } from "jsonwebtoken";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string().default("development"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string() as z.ZodType<NonNullable<SignOptions["expiresIn"]>>

});

export const { PORT, NODE_ENV, DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN} = envSchema.parse(process.env);
