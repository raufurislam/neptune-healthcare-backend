import { IJWTPayload } from "../../types/common";

const createAppointment = async (
  user: IJWTPayload,
  payload: { doctorId: string; scheduleId: string }
) => {
  console.log(user, payload);
};

export const AppointmentService = { createAppointment };
