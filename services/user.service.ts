import { toUserResponse } from "../mappers/user.mapper.js";
import type { CustomError } from "../middlewares/error.middleware.js";
import User from "../models/user.model.js";

const findUserById = async (id: string) => {

  const user = await User.findById(id);

  if (!user) {
    const error: CustomError = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

export const getUserById = async (id: string) => {

  const user = await findUserById(id);

  return toUserResponse(user)
}
