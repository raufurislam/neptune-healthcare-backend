import express from "express";
import { ScheduleController } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.DOCTOR, UserRole.ADMIN),
  ScheduleController.schedulesForDoctor
);

router.post("/", ScheduleController.insertIntoDB);

router.delete("/:id", ScheduleController.deleteScheduleFromDB);

export const ScheduleRoutes = router;
