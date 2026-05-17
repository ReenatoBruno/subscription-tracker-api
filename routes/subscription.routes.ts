import { Router, type Router as RouterType } from "express";
import type { Request, Response } from "express";

const subscriptionRouter: RouterType = Router();

subscriptionRouter.get("/", (req: Request, res: Response) =>
  res.send({ title: "Get all subscriptions" }),
);

subscriptionRouter.get("/:id", (req: Request, res: Response) =>
  res.send({ title: "Get subscription details" }),
);

subscriptionRouter.post("/", (req: Request, res: Response) =>
  res.send({ title: "Create subscription" }),
);

subscriptionRouter.put("/:id", (req: Request, res: Response) =>
  res.send({ title: "Update subscription" }),
);

subscriptionRouter.delete("/:id", (req: Request, res: Response) =>
  res.send({ title: "Delete subscription" }),
);

subscriptionRouter.put("/:id/cancel", (req: Request, res: Response) =>
  res.send({ title: "Cancel subscription" }),
);

subscriptionRouter.get("/upcoming/renewals", (req: Request, res: Response) =>
  res.send({ title: "Get upcoming renewals" }),
);

export default subscriptionRouter;
