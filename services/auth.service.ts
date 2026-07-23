import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import type { CustomError } from "../middlewares/error.middleware.js";
import type { SignUpRequestDTO } from "../schemas/auth.schema.js";
import { toSignUpResponse } from "../mappers/auth.mapper.js";
import User from "../models/user.model.js";

export const signUpUser = async (data: SignUpRequestDTO) => {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email: data.email }).session(session);

    if (existingUser) {
      const error: CustomError = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    await newUser.save({ session });

    const token = jwt.sign(
      { userId: newUser._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    await session.commitTransaction();
    await session.endSession();

    return { user: toSignUpResponse(newUser), token };

  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};

//export const signIn = async (req: Request, res: Response, next: NextFunction) => {}

//export const signOut = async (req: Request, res: Response, next: NextFunction) => {}
