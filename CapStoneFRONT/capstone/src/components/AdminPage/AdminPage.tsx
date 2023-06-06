import { ShowPrevs } from "../Profile/ShowPrevs";
import { SectionWrapper } from "../hoc";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import { IPreventive } from "../../interface/Interface";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const [switchPage, setSwitchPage] = useState("New Preventives");
  const [preventivi, setPreventivi] = useState<IPreventive[]>();
  const [preventiviSub, setPreventiviSub] = useState<IPreventive[]>();
  const { auth } = useAuth();

  const handleFetchAll = async () => {
    try {
      const BASE_URL = "preventive/all";

      const config = {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      };

      const response = await axios.get(BASE_URL, config);
      setPreventivi(response.data);
    } catch (error) {
      toast.error("Something went wrong! " + error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "CustomToast",
      });
    }
  };

  const handleFetchSub = async () => {
    try {
      const BASE_URL = "preventive/submmitted";

      const config = {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      };

      const response = await axios.get(BASE_URL, config);
      setPreventiviSub(response.data);
    } catch (error) {
      toast.error("Something went wrong! " + error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "CustomToast",
      });
    }
  };

  useEffect(() => {
    handleFetchAll();
    handleFetchSub();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-xl ps-7 pb-10">
      <div className="flex py-8">
        <h1 className="text-left text-xl font-medium flex-[0.5] ">Settings</h1>
      </div>
      <main className="flex mainContainer">
        <aside className="px-5">
          <SearchBar />
          <ul className=" mt-4">
            <li
              className={
                switchPage === "New Preventives"
                  ? "bg-gray-200 p-2 rounded-lg"
                  : "cursor-pointer hover:bg-gray-200 p-2 hover:rounded-lg animation"
              }
              onClick={() => setSwitchPage("New Preventives")}
            >
              New Preventives
            </li>
            <li
              className={
                switchPage === "All Preventives"
                  ? "bg-gray-200 p-2 rounded-lg"
                  : "cursor-pointer hover:bg-gray-200 p-2 hover:rounded-lg animation"
              }
              onClick={() => setSwitchPage("All Preventives")}
            >
              All Preventives
            </li>
          </ul>
        </aside>
        <section className="pe-7">
          <h2 className="font-bold text-4xl mb-2">Welcome to the administration page.</h2>
          <p>Here you can manage registered customers, view and change the status of quotes.</p>
          {switchPage === "New Preventives" ? (
            <ShowPrevs preventivi={preventiviSub ? preventiviSub : []} />
          ) : (
            <ShowPrevs preventivi={preventivi ? preventivi : []} />
          )}
        </section>
      </main>
      <ToastContainer />
    </div>
  );
};

export default SectionWrapper(AdminPage, "");
