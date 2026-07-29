import type { Request, Response, NextFunction } from "express";

import { signUpUser } from "../services/auth.service.js";
import { signUpSchema } from "../schemas/auth.schema.js";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const validatedData = signUpSchema.parse(req.body);

    const { user, token } = await signUpUser(validatedData);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {token, user}
    });

  } catch (error) {
    next(error);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {};
export const signOut = async (req: Request, res: Response, next: NextFunction) => {};
