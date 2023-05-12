import "./Login.scss";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "/login";

export const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current!.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = response?.data?.accesToken;
      const roles = response?.data?.roles;
      setAuth({ email, pwd, roles, accessToken });
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (error: any) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <section className="form sign-in">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <h1 className="FormTitle">Welcome Back,</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="username">
          <span>Email</span>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
        </label>
        <button className="submit">Sign In</button>
      </form>
    </section>
  );
};

// <p>
// Need an Account? <br />
// <span className="line">
//   {/* link alla registrazione */}
//   <a href="#">Sign Up</a>
// </span>
// </p>
