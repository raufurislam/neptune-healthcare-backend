import { Router } from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/me", AuthController.getMe);

router.post("/login", AuthController.login);

router.post("/refresh-token", AuthController.refreshToken);

router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  AuthController.changePassword
);

export const authRoutes = router;
