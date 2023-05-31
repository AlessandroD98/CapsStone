import { addDate } from "../../../store/features/preventivoSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { generateSlotHours } from "../../../utils/action";
import { useState, useEffect } from "react";
import { TimingCard } from "./TimingCard";
import { IHour } from "../../../interface/Interface";
import { checkTiming } from "../../../store/features/prevInputCheck";

export const Tempistiche = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector((state) => state.preventiveS.preventive.inspectionDate);
  const Hour = useAppSelector((state) => state.preventiveS.preventive.inspectionHour);
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedHour, setSelectedHour] = useState<IHour | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    const newDate = new Date(value);
    const currentDayValue = newDate.getUTCDay();
    setCurrentDay(currentDayValue);
    dispatch(addDate(value));
  };

  useEffect(() => {
    console.log(currentDay);
  }, [currentDay]);

  useEffect(() => {
    if (Hour !== null && Hour.hour !== "" && date !== "" && date !== null) {
      dispatch(checkTiming({ inputs: true }));
    } else {
      dispatch(checkTiming({ inputs: false }));
    }
  }, [Hour, date]);

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <main>
      <h2 className="font-bold text-2xl mb-4 text-center">When would you like to complete the task?</h2>
      <h3 className="text-center mb-3">Pick a day and an hour</h3>
      <div className="flex justify-center">
        <input type="date" value={date ? date : ""} onChange={handleChange} className="dataInput" min={currentDate} />
      </div>
      <section className="TimingContainer">
        {currentDay !== 0 ? (
          <div className="my-5 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6">
            {generateSlotHours(currentDay).map((hour, i) => (
              <TimingCard
                hour={hour}
                key={i}
                setSelectedHour={setSelectedHour}
                selected={selectedHour !== null && selectedHour.hour === hour.hour}
              />
            ))}
          </div>
        ) : (
          <div className="my-4 text-center font-medium">
            <p>Non ci sono orari disponibili per la data selezionata!</p>
          </div>
        )}
      </section>
    </main>
  );
};
