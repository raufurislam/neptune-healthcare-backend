import { UserRole } from "@prisma/client";

export type IJWTPayload = {
  email: string;
  role: UserRole;
};
