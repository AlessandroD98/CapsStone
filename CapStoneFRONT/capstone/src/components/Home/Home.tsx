import { useState } from "react";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import "../Register/Register.scss";

export const Home = () => {
  const [islogged, setIslogged] = useState(true);

  const handleLogin = () => {
    setIslogged(!islogged);
  };

  return (
    <div className={islogged ? "cont" : "cont s--signup"}>
      <Login />
      <Register onLogin={handleLogin} />
    </div>
  );
};
