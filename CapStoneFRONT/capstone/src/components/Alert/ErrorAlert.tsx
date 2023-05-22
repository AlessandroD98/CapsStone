import { FiAlertTriangle } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeErrState } from "../../store/features/alertControlSlice";

type Prosp = {
  msg: string;
};

export const ErrorAlert = ({ msg }: Prosp) => {
  const errState = useAppSelector((state) => state.alert.err);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-[#ee95a0] border-t-4 border-[#c51e32] rounded-b text-[#c51e32] px-3 py-3 shadow-md flex items-center max-w-[400px] z-50 fixed top-24 right-[1%]">
      <div className="flex-[0.25] flex justify-center text-3xl me-2">
        <FiAlertTriangle className="animate-bounce" />
      </div>
      <div className="flex-[1.5]">
        <p className="font-bold">Something went wrong</p>
        <p className="text-sm">Error {msg} .</p>
      </div>
      <div
        className="flex-[0.25] flex justify-center text-4xl cursor-pointer"
        onClick={() => dispatch(changeErrState(!errState))}
      >
        <IoCloseOutline />
      </div>
    </div>
  );
};
