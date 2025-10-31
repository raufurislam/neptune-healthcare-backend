import { prisma } from "../../shared/prisma";
import { IJWTPayload } from "../../types/common";

const updateIntoDB = async (user: IJWTPayload, payload: any) => {
  const { medicalReport, patientHealthData, ...patientData } = payload;

  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email,
      isDeleted: false,
    },
  });

  return await prisma.$transaction(async (tnx) => {
    await tnx.patient.update({
      where: {
        id: patientInfo.id,
      },
      data: patientData,
    });

    if (patientHealthData) {
      await tnx.patientHealthData.upsert({
        where: {
          patientId: patientInfo.id,
        },
        update: patientHealthData,
        create: {
          ...patientHealthData,
          patientId: patientInfo.id,
        },

        // create: {
        //   ...patientHealthData,
        //   patient: {
        //     connect: { id: patientInfo.id },
        //   },
        // },
      });
    }

    if (medicalReport) {
      await tnx.medicalReport.create({
        data: {
          ...medicalReport,
          patientId: patientInfo.id,
        },
      });
    }

    const result = await tnx.patient.findUnique({
      where: {
        id: patientInfo.id,
      },
      include: {
        patientHealthData: true,
        medicalReports: true,
      },
    });
    return result;
  });
};

const getAllFromDB = async (filters: any, options: any) => {};

export const PatientService = {
  updateIntoDB,
  getAllFromDB,
};
