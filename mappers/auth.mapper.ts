import type { HydratedDocument } from "mongoose";
import type { User } from "../models/user.model.js";
import type { SignUpResponseDTO } from "../schemas/auth.schema.js";

export function toSignUpResponse(user: HydratedDocument<User>): SignUpResponseDTO {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
}
