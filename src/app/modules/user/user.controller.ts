import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { userFilterableFields } from "./user.constant";
import httpStatus from "http-status";
import { IJWTPayload } from "../../types/common";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createPatient(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Retrieve successfully!",
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  // page, limit, sortBy, sortOrder - pagination, sorting
  // fields, searchTerm - searching, filtering
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await UserService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient created successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin Created successfuly!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createDoctor(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Doctor Created successfully!",
    data: result,
  });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.changeProfileStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users profile status changed!",
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const userSession = req.cookies;
  const result = await AuthService.getMe(userSession);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrive successfully!",
    data: result,
  });
});

export const UserController = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllFromDb,
  changeProfileStatus,
  getMe,
};
