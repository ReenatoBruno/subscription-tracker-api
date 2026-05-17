import { Router, type Router as RouterType } from "express";
import type { Request, Response } from "express";

const authRouter: RouterType = Router();

authRouter.post("/sign-up", (req: Request, res: Response) =>
  res.send({ title: "Sign-up" }),
);

authRouter.post("/sign-in", (req: Request, res: Response) =>
  res.send({ title: "Sign-in" }),
);

authRouter.post("/sign-out", (req: Request, res: Response) =>
  res.send({ title: "Sign-out" }),
);

export default authRouter;
