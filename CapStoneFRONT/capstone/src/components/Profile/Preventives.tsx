import { useAppSelector } from "../../store/hooks";
import { ShowPrevs } from "./ShowPrevs";

export const Preventives = () => {
  const preventivi = useAppSelector((state) => state.user.user?.preventives);

  return (
    <>
      <div className=" flex flex-col w-full">
        <h2 className="font-bold text-4xl text-center mb-3">In this page you can view your quotes.</h2>
        {preventivi ? <ShowPrevs preventivi={preventivi} /> : ""}
      </div>
    </>
  );
};
