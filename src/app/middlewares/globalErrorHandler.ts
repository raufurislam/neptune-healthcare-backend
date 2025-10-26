import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message || "Something went wrong!";
  let error = err;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      (message = "Duplicate key error"),
        (error = err.meta),
        (statusCode = httpStatus.CONFLICT);
    }
    if (err.code === "P1000") {
      (message = "Authentication failed against database server"),
        (error = err.meta),
        (statusCode = httpStatus.BAD_GATEWAY);
    }
    if (err.code === "P2003") {
      (message = "Foreign key constraint failed"),
        (error = err.meta),
        (statusCode = httpStatus.BAD_REQUEST);
    }
    if (err.code === "P2025") {
      (message = err.meta?.cause || "Record not found"),
        (error = {
          model: err.meta?.modelName || "Unknown model",
          cause: err.meta?.cause || "No record found for the query",
        }),
        (statusCode = httpStatus.NOT_FOUND);
    }
  }
  // ✅ Prisma Validation Error (your case)
  else if (err instanceof Prisma.PrismaClientValidationError) {
    message = "Validation error";
    statusCode = httpStatus.BAD_REQUEST;

    // Clean up the long Prisma message
    const match = err.message.match(/Argument `(\w+)` is missing/);
    if (match) {
      // extract field name cleanly
      error = `Missing required field: ${match[1]}`;
    } else {
      // fallback: keep single-line trimmed message
      error = err.message.replace(/\s+/g, " ").trim();
    }
  }
  // ✅ Prisma Unknown Error
  else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    message = "Unknown error occurred!";
    error = error.message;
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  }
  // ✅ Prisma Initialization Error
  else if (error instanceof Prisma.PrismaClientInitializationError) {
    message = "Prisma Client failed to initialize!";
    error = error.message;
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  }

  // ✅ Fallback for all other unexpected errors
  else if (err instanceof Error) {
    message = err.message;
    error = process.env.NODE_ENV === "development" ? err.stack : undefined;
  }

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
