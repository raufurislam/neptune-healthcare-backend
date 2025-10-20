import { prisma } from "../../shared/prisma";

const insertIntoDB = async (user: any, payload: any) => {
  console.log({ user, insertIntoDB });
  const doctorData = prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  return { user, payload };
};

export const DoctorScheduleService = {
  insertIntoDB,
};
