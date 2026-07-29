import { toUserResponse } from "../mappers/user.mapper.js";
import type { CustomError } from "../middlewares/error.middleware.js";
import type { UpdateUserRequestDTO, ListUsersQueryDTO } from "../schemas/user.schema.js";
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

export const getAllUsers = async (query: ListUsersQueryDTO) => {

  // if (currentUser.role !== "admin") {
    //return { userName: currentUser.userName }; // ← USER NÃO escolhe nada, ponto final
    //}

  const filter: Record<string, unknown> = {};
  if (query.role) filter.role = query.role;
  if (query.isActive !== undefined) filter.isActive = query.isActive;

  const result = await User.paginate(filter, {
    page: query.page,
    limit: query.limit,
    sort: { createdAt: -1 },
  })

  return {
    users: result.docs.map(toUserResponse),
    total: result.totalDocs,
    page: result.page,
    limit: result.limit,
  };
};

export const updateUser = async (id: string, data: UpdateUserRequestDTO) => {

  const user = await findUserById(id);

  if (data.email && data.email !== user.email) {
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      const error: CustomError = new Error("E-mail already in use");
      error.statusCode = 409;
      throw error;
    }
  }

  Object.assign(user, data);

  await user.save();

  return toUserResponse(user);
};

export const deactivateUser = async (id: string) => {

  const user = await findUserById(id);

  if (!user.isActive) {
    const error: CustomError = new Error("User is already inactive");
    error.statusCode = 409;
    throw error;
  }

  user.isActive = false;

  await user.save();

  return toUserResponse(user);
};
