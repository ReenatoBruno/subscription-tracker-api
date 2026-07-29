import type { HydratedDocument } from "mongoose";
import type { User } from "../models/user.model.js";
import type { UserResponseDTO } from "../schemas/user.schema.js";

export function toUserResponse(user: HydratedDocument<User>): UserResponseDTO {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
}
