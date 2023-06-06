import { IArticleBack, IPreventive } from "../../interface/Interface";
import { PrevArticlesCard } from "./PrevArticlesCard";
import { BiChevronDown, BiDotsHorizontalRounded } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  preventivi: IPreventive[];
  update?: () => void;
};

export const ShowPrevs = ({ preventivi, update }: Props) => {
  const [showArticles, setShowArticles] = useState<{ [key: string]: boolean }>({});
  const [show, setShow] = useState<{ [key: string]: boolean }>({});
  const { auth } = useAuth();

  const notify = () =>
    toast.error("Something went wrong!", {
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

  const toggleArticles = (preventiveId: number) => {
    setShowArticles((prevState) => ({
      ...prevState,
      [preventiveId]: !prevState[preventiveId],
    }));
  };

  const toggleMenu = (preventiveId: number) => {
    setShow((prevState) => ({
      ...prevState,
      [preventiveId]: !prevState[preventiveId],
    }));
  };

  const handleFetch = async (nmuprev: number, s: string) => {
    console.log(s);
    try {
      const BASE_URL = "preventive/state/" + nmuprev + "/" + s;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      };

      const response = await axios.get(BASE_URL, config);
      console.log(response);
      toast.success("Changes were successfully saved.", {
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
      if (update) update();
    } catch (error) {
      console.log(error);
      notify();
    }
  };

  const stateArr = ["IN_PROGRESS", "CANCELLED", "CONFIRMED"];

  const filterState = (state: string) => {
    return stateArr.filter((s) => s !== state);
  };
  useEffect(() => {}, [preventivi]);
  return (
    <div className="w-full pe-5">
      {preventivi !== null && preventivi?.length === 0 ? (
        <p className="text-center">There are no quotes to display.</p>
      ) : (
        preventivi?.map((prev, i) => (
          <div key={i} className="p-4 mb-3 border-b-2 flex items-center">
            <div className="flex-auto">
              <div className="flex justify-between ">
                <h4>
                  Preventive : N. <span className="font-semibold">{prev.numeropreventivo}</span>
                </h4>{" "}
                <p>
                  State:{" "}
                  <span
                    className={
                      prev.state === "SUBMITTED"
                        ? "submitted"
                        : prev.state === "IN_PROGRESS"
                        ? "inProgress"
                        : prev.state === "CANCELLED"
                        ? "cancelled"
                        : prev.state === "CONFIRMED"
                        ? "confirmed"
                        : ""
                    }
                  >
                    {prev.state}
                  </span>
                </p>
              </div>
              {prev.articles.length !== 0 ? (
                <div className="flex items-center">
                  <p>Articles</p>
                  <button onClick={() => toggleArticles(prev.numeropreventivo)}>
                    <BiChevronDown
                      className={
                        showArticles[prev.numeropreventivo]
                          ? "dimensionButton animation rotate-180"
                          : "dimensionButton animation"
                      }
                    />
                  </button>
                </div>
              ) : (
                <p className="text-sm">In this preventive, there are no articles.</p>
              )}
              {showArticles[prev.numeropreventivo] ? (
                <div>
                  {prev.articles.map((article, i) => (
                    <PrevArticlesCard article={article as IArticleBack} key={i} />
                  ))}
                </div>
              ) : (
                ""
              )}
              <p>
                Descriprion : <span className="text-sm text-[#8b8b8b]">{prev.description}</span>
              </p>
            </div>
            {auth && auth.roles.includes("ROLE_ADMIN") ? (
              <div className="flex justify-center items-center relative">
                <button className="dimensionButton animation ms-3">
                  <BiDotsHorizontalRounded onClick={() => toggleMenu(prev.numeropreventivo)} />
                </button>
                {show[prev.numeropreventivo] ? (
                  <div className="rounded-xl shadow-xl absolute top-8 bg-white z-20">
                    <ul className="py-2 w-52">
                      {filterState(prev.state).map((s, i) => (
                        <li
                          key={i}
                          className="hover:bg-[#d3d3d3] cursor-pointer ease-in-out duration-500 text-[#6b6b6b]  px-4 mb-2 py-2"
                          onClick={() => {
                            handleFetch(prev.numeropreventivo, s);
                            toggleMenu(prev.numeropreventivo);
                          }}
                        >
                          Change to {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        ))
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
