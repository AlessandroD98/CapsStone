import { Link } from "react-router-dom";
import { SectionWrapper } from "./hoc";
import { GiConfirmed } from "react-icons/gi";

const RegisterSucces = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-7xl">Registration successful</h1>
        <div>
          <GiConfirmed className="text-green-500 text-9xl" />
        </div>
        <p className="text-lg text-center mt-4">Press the button below to return to the home page and login.</p>
        <Link to={"/"} className="bg-[#2c1b6c] text-white mt-2 p-3 rounded-full">
          Go back Home
        </Link>
      </div>
    </div>
  );
};

export default SectionWrapper(RegisterSucces, "");
