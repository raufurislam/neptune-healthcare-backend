import { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../helper/jwtHelper";
import config from "../../config";

const auth = (...roles: string[]) => {
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.get("accessToken");

      if (!token) {
        throw new Error("You are not authorized!");
      }

      const verifyUser = jwtHelper.verifyToken(token, config.JWT_ACCESS_SECRET);

      req.user = verifyUser;

      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new Error("You are not authorized!");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
