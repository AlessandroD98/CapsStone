import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { SectionWrapper } from "../hoc";
import "./Profile.scss";

const Profile = () => {
  const { auth } = useAuth();
  const [switchPage, setSwitchPage] = useState("details");

  return (
    <div className="bg-white rounded-xl shadow-xl ps-7">
      <h1 className="text-left text-xl font-medium  py-8">Settings</h1>
      <main className="flex mainContainer">
        <aside className="px-5">
          <ul>
            <li
              className="cursor-pointer hover:bg-gray-200 p-2 hover:rounded-lg"
              onClick={() => setSwitchPage("details")}
            >
              My details
            </li>
            <li
              className="cursor-pointer hover:bg-gray-200 p-2 hover:rounded-lg"
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
                      <button className="bg-[#2c1b6c] text-white w-14 rounded-md">Save</button>
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
              <div className="subInput-cont">
                <p>Email</p>
                <input type="email" className="w-60" />
              </div>
              <div className="subInput-cont">
                <p>Name</p>
                <input type="text" className="w-60" />
              </div>
              <div className="subInput-cont">
                <p>Lastname</p>
                <input type="text" className="w-60" />
              </div>
              <div className="subInput-cont">
                <p>Tel</p>
                <input type="tel" className="w-60" />
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
                  <button className=" hover:bg-gray-200">Delete</button>
                  <button className=" hover:bg-gray-200">Update</button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default SectionWrapper(Profile, "profile");
