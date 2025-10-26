import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import pick from "../../helper/pick";
import { DoctorService } from "./doctor.service";
import sendResponse from "../../shared/sendResponse";
import { doctorFilterableFields } from "./doctor.constant";

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const filters = pick(req.query, doctorFilterableFields);

  const result = await DoctorService.getAllFromDb(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor fetched Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateIntoDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DoctorService.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor updated Successfully",
    data: result,
  });
});

const getAISuggestions = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorService.getAISuggestions(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ai suggestions fetch Successfully",
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor retrieval successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});

const softDelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.softDelete(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor soft deleted successfully",
    data: result,
  });
});

export const DoctorController = {
  getAllFromDb,
  updateIntoDb,
  getAISuggestions,
  getByIdFromDB,
  deleteFromDB,
  softDelete,
};
