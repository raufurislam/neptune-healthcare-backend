import { UserRole } from "@prisma/client";
import { IJWTPayload } from "../../types/common";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";

const fetchDashboardMetaData = async (user: IJWTPayload) => {
  let metadata;
  switch (user.role) {
    case UserRole.ADMIN:
      //   metadata = await getAdminMetaData();
      metadata = "Admin metaData";
      break;
    case UserRole.DOCTOR:
      //   metadata = await getDoctorMetaData(user);
      metadata = "Doctor metaData";
      break;
    case UserRole.PATIENT:
      //   metadata = await getPatientMetaData(user);
      metadata = "Patient metaData";
      break;
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid user role!");
  }

  return metadata;
};

export const MetaService = {
  fetchDashboardMetaData,
};
