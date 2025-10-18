import { addHours, addMinutes, format } from "date-fns";

const insertIntoDB = async (payload: any) => {
  // console.log({ payload });
  const { startTime, endTime, startDate, endDate } = payload;

  const intervalTime = 30;

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0]) // 11:00
        ),
        Number(startTime.split(":")[1])
      )
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0]) // 11:00
        ),
        Number(endTime.split(":")[1])
      )
    );
  }

  return payload;
};

export const ScheduleService = { insertIntoDB };
