import { IHour } from "../../../interface/Interface";
import { useAppDispatch } from "../../../store/hooks";
import { addHour } from "../../../store/features/preventivoSlice";

type Props = {
  hour: IHour;
  selected: boolean;
  setSelectedHour: (hour: IHour) => void;
};

export const TimingCard = ({ hour, setSelectedHour, selected }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!selected) {
      setSelectedHour(hour);
      console.log(hour);
      dispatch(addHour(hour));
      console.log("click");
      console.log(selected);
      console.log(hour);
    }
  };

  return (
    <div className={selected ? "selected" : "noSelected animation"} onClick={handleClick}>
      <h5>{hour.hour}</h5>
    </div>
  );
};
