import express from "express";
import type { Application, Request, Response } from "express";

import { PORT } from "./config/env.js";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Subscription Tracker API");
});

app.listen(PORT, () => {
  console.log(`Subscription Tracker API running on http://localhost:${PORT}`);
});

export default app;
