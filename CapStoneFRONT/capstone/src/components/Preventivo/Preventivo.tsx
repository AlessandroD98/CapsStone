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
import { Link } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";

const Preventivo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const { auth } = useAuth();
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
      setSuccess(true);
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
      {!success ? (
        <>
          <div className="container horizontal mt-5">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
          <div className="my-10 p-10">{displayStep(currentStep)}</div>
          <StepperControl handleClick={handleClikc} currentStep={currentStep} steps={steps} />
        </>
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center py-5">
            <h1 className="text-7xl">Quote sent successfully.</h1>
            <div>
              <GiConfirmed className="text-green-500 text-9xl" />
            </div>
            <p className="text-lg text-center mt-4">
              {auth
                ? "Press the button below to return to the Profile page."
                : "Press the button below to return to the home page."}
            </p>
            <Link to={auth ? "/profile" : "/"} className="bg-[#2c1b6c] text-white mt-2 p-3 rounded-full">
              {auth ? "Go back to Profile" : "Go back toHome"}
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default SectionWrapper(Preventivo, "");
