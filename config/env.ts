import { config } from "dotenv";
import { z } from "zod";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string().default("development"),
  DATABASE_URL: z.string(),
});

export const { PORT, NODE_ENV, DATABASE_URL } = envSchema.parse(process.env);
