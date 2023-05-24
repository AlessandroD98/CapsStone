import { useAppSelector } from "../../store/hooks";

type Props = {
  handleClick: (arg0: string) => void;
  steps: String[];
  currentStep: number;
};

export const StepperControl = ({ handleClick, steps, currentStep }: Props) => {
  const checks = useAppSelector((state) => state.checkS.checks);

  const setCheck = (step: number) => {
    switch (step) {
      case 1:
        return checks.profile;
      case 2:
        return checks.article;
      case 3:
        return checks.timing;
      default:
    }
  };

  const currentCheck = setCheck(currentStep);

  return (
    <div className="container flex justify-around mt-4 mb-8">
      <button
        onClick={() => handleClick("back")}
        className={`bg-white text-slate-400  uppercase w-24 h-10 py-2  rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-gray-200 hover:text-black animation ${
          currentStep === 1 ? "opacity-50 hover:cursor-not-allowed" : ""
        }`}
      >
        Back
      </button>
      <button
        disabled={!currentCheck?.inputs}
        onClick={() => handleClick("next")}
        className={` uppercase w-24 h-10 py-2  rounded-xl font-semibold cursor-pointer  ${
          currentCheck?.inputs
            ? "bg-green-500 text-white  hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
            : "opacity-50 bg-green-500 text-white hover:cursor-not-allowed"
        }`}
      >
        {currentStep === steps.length ? "Confirm" : "Next"}
      </button>
    </div>
  );
};
