import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import config from "./config";
import router from "./app/routes";

const app: Application = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
console.log(
  "Registered routes:",
  router.stack.map((r) => r.route?.path || r.name)
);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Astro health care server...",
    environment: config.node_env,
    uptime: process.uptime().toFixed(2) + " seconds",
    timeStamp: new Date().toDateString().concat(" ", new Date().toTimeString()),
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
