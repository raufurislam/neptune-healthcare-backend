import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  console.log("patient", req.body);
  res.status(200).json({ success: true, message: "Patient created!" });
});

export const UserController = { createPatient };
