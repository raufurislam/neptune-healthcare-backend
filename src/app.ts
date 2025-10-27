import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import config from "./config";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import { PaymentController } from "./app/modules/payment/payment.controller";

const app: Application = express();

app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.handleStripeWebhookEvent
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

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
