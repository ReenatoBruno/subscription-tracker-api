import { Router, type Router as RouterType } from "express";
import type { Request, Response } from "express";

const userRouter: RouterType = Router();

userRouter.get("/", (req: Request, res: Response) =>
  res.send({ title: "Get all users" }),
);

userRouter.get("/:id", (req: Request, res: Response) =>
  res.send({ title: "Get user details" }),
);

userRouter.post("/", (req: Request, res: Response) =>
  res.send({ title: "Create new users" }),
);

userRouter.put("/:id", (req: Request, res: Response) =>
  res.send({ title: "Update users" }),
);

userRouter.delete("/:id", (req: Request, res: Response) =>
  res.send({ title: "Delete users" }),
);

export default userRouter;
