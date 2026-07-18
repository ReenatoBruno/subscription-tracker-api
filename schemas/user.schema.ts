import { z } from "zod";
import { toTitleCase } from "../utils/string.js";

export const userIdParamSchema = z.object({
  id:
    z.string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid user id"),
});

export const listUsersQuerySchema = z.object({
  role:
    z.enum(["user", "admin"])
      .optional(),
  isActive:
    z.coerce.boolean()
      .optional(),
  page:
    z.coerce.number()
      .int()
      .positive()
      .default(1),
  limit:
    z.coerce.number()
      .int()
      .positive()
      .max(100)
      .default(20),
});
export type ListUsersQueryDTO = z.infer<typeof listUsersQuerySchema>;

export const updateUserSchema = z.object({
  name:
    z.string()
      .min(2, "Name is required")
      .max(50, "Name must be at most 50 characters")
      .transform(toTitleCase)
      .optional(),
  email:
    z.email("Invalid email")
      .max(255, "E-mail must be at most 255 characters")
      .optional(),
});
export type UpdateUserRequestDTO = z.infer<typeof updateUserSchema>;

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}
