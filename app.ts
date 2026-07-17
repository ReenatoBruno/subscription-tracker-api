import express from "express";
import cookieParser from "cookie-parser";

import type { Application, Request, Response } from "express";

import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";
import connectDB from "./database/mongoDB.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/users", userRouter);

app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Subscription Tracker API");
});

app.listen(PORT, async (): Promise<void> => {
  console.log(`Subscription Tracker API running on http://localhost:${PORT}`);

  await connectDB();
});

export default app;
