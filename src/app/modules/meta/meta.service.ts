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

const getDoctorMetaData = async (user: IJWTPayload) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user?.email
        }
    });

    const appointmentCount = await prisma.appointment.count({
        where: {
            doctorId: doctorData.id
        }
    });

    const patientCount = await prisma.appointment.groupBy({
        by: ['patientId'],
        _count: {
            id: true
        }
    });

    const reviewCount = await prisma.review.count({
        where: {
            doctorId: doctorData.id
        }
    });

    const totalRevenue = await prisma.payment.aggregate({
        _sum: {
            amount: true
        },
        where: {
            appointment: {
                doctorId: doctorData.id
            },
            status: PaymentStatus.PAID
        }
    });

    const appointmentStatusDistribution = await prisma.appointment.groupBy({
        by: ['status'],
        _count: { id: true },
        where: {
            doctorId: doctorData.id
        }
    });

    const formattedAppointmentStatusDistribution = appointmentStatusDistribution.map(({ status, _count }) => ({
        status,
        count: Number(_count.id)
    }))

    return {
        appointmentCount,
        reviewCount,
        patientCount: patientCount.length,
        totalRevenue,
        formattedAppointmentStatusDistribution
    }
}



export const MetaService = {
  fetchDashboardMetaData,
};
