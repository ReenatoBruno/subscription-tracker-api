import type { Request, Response, NextFunction } from "express";

import { listUsersQuerySchema, updateUserSchema } from "../schemas/user.schema.js";

import { userIdParamSchema } from "../schemas/user.schema.js"

import { getUserById, getAllUsers, updateUser, deactivateUser } from "../services/user.service.js";

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    const { id } = userIdParamSchema.parse(req.params);

    const user = await getUserById(id);

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error)
  }
};

export const listUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = listUsersQuerySchema.parse(req.query);

    const { users, total, page, limit } = await getAllUsers(query);

    res.status(200).json({
      success: true,
      data: users,
      meta: { total, page, limit },
    });

  } catch (error) {
    next(error);
  }
};

export const patchUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = updateUserSchema.parse(req.body);

    const { id } = userIdParamSchema.parse(req.params);

    const user = await updateUser(id, data);

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error);
  }
};

export const softDeleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    const { id } = userIdParamSchema.parse(req.params);

    const user = await deactivateUser(id);

    res.status(200).json({
      success: true,
      message: "User deactivated",
      data: user
    });

  } catch (error) {
    next(error);
  }
};
