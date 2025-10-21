import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtHelper } from "../../helper/jwtHelper";
import config from "../../../config";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password is incorrect!");
  }

  const accessToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.JWT_ACCESS_SECRET,
    config.JWT_ACCESS_EXPIRES
  );

  const refreshToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.JWT_REFRESH_SECRET,
    config.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

export const AuthService = {
  login,
};
