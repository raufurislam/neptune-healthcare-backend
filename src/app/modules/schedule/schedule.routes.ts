import { Router } from "express";
import { ScheduleController } from "./schedule.controller";

const router = Router();

router.post("/", ScheduleController.insertIntoDB);

export const ScheduleRoutes = router;
