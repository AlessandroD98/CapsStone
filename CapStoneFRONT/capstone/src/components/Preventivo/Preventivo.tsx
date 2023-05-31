import { SectionWrapper } from "../hoc";
import { Stepper } from "./Stepper";
import { StepperControl } from "./StepperControl";
import { Anagrafica } from "./Steps/Anagrafica";
import { Articolo } from "./Steps/Articolo";
import { Dimensioni } from "./Steps/Dimensioni";
import { Materiali } from "./Steps/Materiali";
import { Riepilogo } from "./Steps/Riepilogo";
import { Tempistiche } from "./Steps/Tempistiche";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import axios from "../../api/axios";

const Preventivo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const cliente = useAppSelector((state) => state.user.user);
  const preventivo = useAppSelector((state) => state.preventiveS.preventive);

  const steps = ["Profile", "Article", "Timing", "Dimensions", "Materials", "Summary"];

  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return <Anagrafica />;
      case 2:
        return <Articolo />;
      case 3:
        return <Tempistiche />;
      case 4:
        return <Dimensioni />;
      case 5:
        return <Materiali />;
      case 6:
        return <Riepilogo />;
      default:
        break;
    }
  };

  const handleFetch = async () => {
    let SAND_URL = "";

    if (cliente !== null) {
      SAND_URL = "preventive/send/" + cliente.id_cliente;
    } else {
      SAND_URL = "preventive/send";
    }

    try {
      const response = await axios.post(SAND_URL, JSON.stringify(preventivo), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error?.response);
    }
  };

  const handleClikc = (direction: string) => {
    let newStep = currentStep;
    if (direction === "next" && newStep >= 1 && newStep < 6) {
      newStep++;
      newStep >= 1 && newStep <= steps.length && setCurrentStep(newStep);
    } else if (direction === "back" && newStep <= 6 && newStep > 1) {
      newStep--;
      newStep >= 0 && newStep <= steps.length && setCurrentStep(newStep);
    } else if (direction === "confirm") {
      handleFetch();
    } else return newStep;
    console.log("newStep" + newStep);
  };

  return (
    <main className="mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <div className="container horizontal mt-5">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>
      <div className="my-10 p-10">{displayStep(currentStep)}</div>
      <StepperControl handleClick={handleClikc} currentStep={currentStep} steps={steps} />
    </main>
  );
};

export default SectionWrapper(Preventivo, "");
