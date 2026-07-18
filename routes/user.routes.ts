import { Router, type Router as RouterType } from "express";
import { getUser, listUsers, patchUser, softDeleteUser } from "../controllers/user.controller.js";

const userRouter: RouterType = Router();

userRouter.get("/", listUsers);

userRouter.get("/:id", getUser);

userRouter.patch("/:id", patchUser);

userRouter.delete("/:id", softDeleteUser);

export default userRouter;
