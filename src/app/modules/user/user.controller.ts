import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createPatient(req.body);
  console.log(result);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Patient Created Successfully",
    data: result,
  });
});

export const UserController = { createPatient };
