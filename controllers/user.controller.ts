import type { Request, Response, NextFunction } from "express";

import { getUserById } from "../services/user.service.js";

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    const user = await getUserById(req.params.id);
    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error)
  }

};
