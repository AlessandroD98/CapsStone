import { useEffect, useState, useRef } from "react";
import { IStep } from "../../interface/Interface";
import { useAppSelector } from "../../store/hooks";

type Props = {
  steps: String[];
  currentStep: number;
};

export const Stepper = ({ steps, currentStep }: Props) => {
  const [newStep, setNewStep] = useState<IStep[]>([]);
  const stepRef = useRef<IStep[]>();
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

  const updateStep = (stepNumber: number, steps: IStep[]) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    const stespsState = steps.map((step, i) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: i === 0 ? true : false,
          selected: i === 0 ? true : false,
        }
      )
    );

    stepRef.current = stespsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, i) => {
    return (
      <div className={i !== newStep.length - 1 ? "w-full flex items-center" : "flex items-center"} key={i}>
        <div className="relative flex flex-col items-center text-teal-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
              step.selected && currentCheck?.inputs ? "bg-green-600 text-white font-bold border border-green-600" : ""
            }`}
          >
            {step.completed && currentCheck?.inputs ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              i + 1
            )}
          </div>
          <div
            className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
              step.highlighted ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step.completed && currentCheck?.inputs ? "border-green-600" : "border-gray-300"
          }`}
        ></div>
      </div>
    );
  });

  return <div className="mx-4 p-4 flex justify-between items-center">{displaySteps}</div>;
};
