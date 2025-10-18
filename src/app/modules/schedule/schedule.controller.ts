import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "../user/user.service";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Doctor Created successfully!",
    data: result,
  });
});

export const ScheduleController = { insertIntoDB };
