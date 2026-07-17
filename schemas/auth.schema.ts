import { z } from "zod";
import { toTitleCase } from "../utils/string.js";

export const signUpSchema = z.object({
  name:
    z.string()
    .min(2, "Name is required")
    .max(50, "Name must be at most 50 characters").transform(toTitleCase),
  email:
    z.email("Invalid email")
    .max(255, "E-mail must be at most 255 characters"),
  password:
    z.string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});
export type SignUpRequestDTO = z.infer<typeof signUpSchema>;

export interface SignUpResponseDTO {
  id: string;
  name: string;
  email: string;
}
