import { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../helper/jwtHelper";
import config from "../../config";
import ApiError from "../errors/apiError";
import httpStatus from "http-status";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.cookies.accessToken;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifyUser = jwtHelper.verifyToken(token, config.JWT_ACCESS_SECRET);

      req.user = verifyUser;

      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
