import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeState } from "../../store/features/alertControlSlice";

export const SuccessAlert = () => {
  const alertState = useAppSelector((state) => state.alert.alert);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-3 py-3 shadow-md flex items-center max-w-[400px] z-50 fixed top-24 right-[1%]">
      <div className="flex-[0.25] flex justify-center text-3xl">
        <AiOutlineCloudUpload className="animate-bounce" />
      </div>
      <div className="flex-[1.5]">
        <p className="font-bold">Saved changes</p>
        <p className="text-sm">Changes were successfully saved.</p>
      </div>
      <div
        className="flex-[0.25] flex justify-center text-4xl cursor-pointer"
        onClick={() => dispatch(changeState(!alertState))}
      >
        <IoCloseOutline />
      </div>
    </div>
  );
};
