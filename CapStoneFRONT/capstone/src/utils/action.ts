import { IHour } from "../interface/Interface";

export const generateSlotHours = (arg: number) => {
    const timeSlots: IHour[] = []
    let hour = 8
    let minutes = 0;
    let period = "AM";
    let close = arg > 0 && arg < 6 ? 18 : 13

    while (!(hour === close && minutes === 0 && period === "PM")) {
      const time = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${period}`;
      timeSlots.push({ hour: time });

      minutes += 30;
      if (minutes === 60) {
        minutes = 0;
        hour += 1;
      }
      if (hour === 12 && minutes === 0) {
        period = period === "AM" ? "PM" : "AM";
      }
    }
    return timeSlots;
  };