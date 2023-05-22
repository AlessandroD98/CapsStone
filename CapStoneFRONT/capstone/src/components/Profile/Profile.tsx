import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { SectionWrapper } from "../hoc";
import "./Profile.scss";
import axios from "../../api/axios";
import { ICliente, IUpdateUser } from "../../interface/Interface";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addUser } from "../../store/features/userSlice";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { SuccessAlert } from "../Alert/SuccessAlert";
import { ErrorAlert } from "../Alert/ErrorAlert";
import { changeErrState, changeState } from "../../store/features/alertControlSlice";
import { Preventives } from "./Preventives";

const Profile = () => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const alertState = useAppSelector((state) => state.alert.alert);
  const errState = useAppSelector((state) => state.alert.err);

  const [switchPage, setSwitchPage] = useState("details");
  const [user, setUser] = useState<ICliente>();
  const [mess, setMess] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [tel, setTel] = useState("");
  //const [errorAlert, setErrorAlert] = useState(false);

  const handelProfile = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      };

      const PROFILE_URL = "/profile/me/" + auth?.username;

      const response = await axios.get(PROFILE_URL, config);
      console.log(response.data);
      dispatch(addUser(response.data));
      setUser(response.data);
    } catch (error) {
      alert("Error:" + error);
    }
  };

  const handleProfileChange = async () => {
    try {
      const PROFILE_CHANGE_URL = "/profile/me/update";

      const response = await axios.post(
        PROFILE_CHANGE_URL,
        JSON.stringify({ id: user?.id_cliente, name: name, lastname: lastname, telefono: tel }),
        {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth?.accessToken}` },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setUser(response.data);
      dispatch(addUser(response.data));
      dispatch(changeState(!alertState));
    } catch (error: any) {
      setMess(error);
      dispatch(changeErrState(!errState));
    }
  };

  useEffect(() => {
    handelProfile();
    if (user !== undefined) {
      dispatch(addUser(user));
    }
    return;
  }, [name, lastname, tel]);

  return (
    <div className="bg-white rounded-xl shadow-xl ps-7">
      <div className="flex py-8">
        <h1 className="text-left text-xl font-medium flex-[0.5] ">Settings</h1>

        {switchPage === "details" ? (
          <p
            className={
              user?.name === "" || user?.lastname === "" || user?.telefono === null
                ? "text-blue-900 bg-blue-200 p-2 rounded-lg text-sm flex items-center"
                : "hidden"
            }
          >
            <span>
              <BsFillInfoCircleFill className="me-2" />
            </span>{" "}
            Complete the registration by adding the missing data!
          </p>
        ) : (
          ""
        )}
      </div>
      <main className="flex mainContainer">
        <aside className="px-5">
          <ul>
            <li
              className={
                switchPage === "details"
                  ? "bg-gray-200 p-2 rounded-lg"
                  : "cursor-pointer hover:bg-gray-200 p-2 hover:rounded-lg animation"
              }
              onClick={() => setSwitchPage("details")}
            >
              My details
            </li>
            <li
              className={
                switchPage === "preventives"
                  ? "bg-gray-200 p-2 rounded-lg"
                  : "cursor-pointer hover:bg-gray-200 p-2 hover:rounded-lg animation"
              }
              onClick={() => setSwitchPage("preventives")}
            >
              Preventives
            </li>
          </ul>
        </aside>
        {switchPage === "details" ? (
          <section className="pe-7">
            <div className="relative profilePicContainer">
              <div className="rounded-tl-3xl rounded-r-md rounded-bl-md overflow-hidden">
                <img src="https://picsum.photos/seed/picsum/1000/300" alt="profilebackground" className="w-fit" />
              </div>

              <div>
                <div className="flex relative">
                  <div className="w-32 h-32 bg-white rounded-full flex justify-center items-center absolute top-[-30px] left-8">
                    <div className="w-[7.5rem] h-[7.5rem] bg-white rounded-full overflow-hidden">
                      <img src="https://picsum.photos/seed/picsum/300/300" alt="profilepic" />
                    </div>
                  </div>
                  <div className="flex justify-between w-full items-center mt-4">
                    <div className="ms-44">
                      <h2 className="font-medium text-xl">Profile</h2>
                      <p className="text-gray-500 text-sm">Update your photo and personal details</p>
                    </div>
                    <div className="flex">
                      <button className=" text-blck border border-black w-16 rounded-md me-2 px-2">Cancel</button>
                      <button className="bg-[#2c1b6c] text-white w-14 rounded-md" onClick={handleProfileChange}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profileInfo">
              <h2 className="font-medium text-xl">Profile</h2>
              <p className="text-gray-500 text-sm">Update your photo and personal details</p>
            </div>
            <div className="mt-12 inputContainer">
              <div className="subInput-cont-dis">
                <p>Email</p>
                <input defaultValue={user?.email || ""} type="email" className="w-60" disabled />
              </div>
              <div className="subInput-cont">
                <p>Name</p>
                <input
                  type="text"
                  className="w-60"
                  defaultValue={user?.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="subInput-cont">
                <p>Lastname</p>
                <input
                  type="text"
                  className="w-60"
                  defaultValue={user?.lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="subInput-cont">
                <p>Tel</p>
                <input type="tel" className="w-60" value={user?.telefono} onChange={(e) => setTel(e.target.value)} />
              </div>
              <div className="flex py-4 justify-between">
                <div className="flex">
                  <div className="profilePicMod me-5">
                    <p>Your photo</p>
                    <span>This will be displayed on your profile</span>
                  </div>
                  <div className="w-14 rounded-full overflow-hidden">
                    <img src="https://picsum.photos/seed/picsum/300/300" alt="profilepic" />
                  </div>
                </div>
                <div className="profileModPicButton">
                  <button className=" hover:bg-gray-200 animation">Delete</button>
                  <button className=" hover:bg-gray-200 animation">Update</button>
                </div>
              </div>
              <div className="subInput-cont">
                <p>City</p>
                <input type="tel" className="w-60" />
              </div>
              <div className="subInput-cont">
                <p>Address</p>
                <input type="tel" className="w-60" />
              </div>
              <div className="subInput-cont">
                <p>Zip Code</p>
                <input type="tel" className="w-60" />
              </div>
            </div>
          </section>
        ) : (
          <Preventives />
        )}
      </main>
      {alertState ? <SuccessAlert /> : ""}
      {errState ? <ErrorAlert msg={mess} /> : ""}
    </div>
  );
};

export default SectionWrapper(Profile, "profile");
