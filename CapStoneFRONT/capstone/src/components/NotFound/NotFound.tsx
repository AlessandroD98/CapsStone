import { Link } from "react-router-dom";
import { SectionWrapper } from "../hoc";

const NotFound = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-7xl">We lost this page</h1>
        <p className="text-lg text-center mt-4">
          We searched high and low but couldn't find what you're looking for. <br /> Let's find a better place for you
          to go.
        </p>
        <Link to={"/"} className="bg-[#2c1b6c] text-white mt-2 p-3 rounded-full">
          Go back Home
        </Link>
      </div>
      <div></div>
    </div>
  );
};
export default SectionWrapper(NotFound, "notfound");
