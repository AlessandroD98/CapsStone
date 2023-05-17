import { useRef, useState, useEffect } from "react";
import { FaInfoCircle, FaCheck, FaTimes } from "react-icons/fa";
import axios from "../../api/axios";
import "./Register.scss";
import { useNavigate } from "react-router";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/auth/register";

type LoginProps = {
  onLogin: () => void;
};

export const Register = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {}, []);
  // userRef.current!.focus();

  useEffect(() => {
    const result = EMAIL_REGEX.test(username);
    console.log(result);
    console.log(username);
    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPwd]);

  const handleClick = () => {
    onLogin();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({ username, password }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data);
      setSuccess(true);
    } catch (error: any) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 409) {
        setErrMsg("Email already Registered");
      } else {
        setErrMsg("Registartion failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        navigate("/profile")
      ) : (
        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h2>New here?</h2>
              <p>Sign up and discover great amount of new opportunities!</p>
            </div>
            <div className="img__text m--in">
              <h2>One of us?</h2>
              <p>If you already has an account, just sign in. We've missed you!</p>
            </div>
            <div className="img__btn" onClick={handleClick}>
              <span className="m--up">Sign Up</span>
              <span className="m--in">Sign In</span>
            </div>
          </div>

          <section className="RegisterForm sign-up form">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
              {errMsg}
            </p>
            <h1>Time to feel like home,</h1>
            <form onSubmit={handleSubmit}>
              {/* ---- Controllo input mail ----*/}

              <label htmlFor="email">
                <div className="flex justify-center items-center">
                  <span>Email:</span>
                  <span className={validName ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span className={validName || !username ? "hide" : "invalid"}>
                    <FaTimes />
                  </span>
                </div>
                <input
                  type="email"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
              </label>
              <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                <FaInfoCircle />
                Must include @ and a . after.
              </p>

              {/* ---- Controllo input psw ----*/}

              <label htmlFor="password">
                <div className="flex justify-center items-center">
                  <span>Password:</span>
                  <span className={validPwd ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span className={validPwd || !password ? "hide" : "invalid"}>
                    <FaTimes />
                  </span>
                </div>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
              </label>
              <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FaInfoCircle />
                8 to 24 characters. <br />
                Must include uppercase and lowercase letters, a number and a special character.
                <br />
                Allowed special characters: &nbsp;
                <span aria-label="excalamtion mark">!</span>
                <span aria-label="at sumbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>

              {/* ---- Controllo input pswMatch ----*/}

              <label htmlFor="confirm_pwd">
                <div className="flex items-center justify-center">
                  <span>Confirm Password:</span>
                  <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                    <FaTimes />
                  </span>
                </div>

                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
              </label>
              <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FaInfoCircle />
                Must match the fisrt password input field.
              </p>

              <button disabled={!validName || !validPwd || !validMatch ? true : false} className="submit">
                Sing Up
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
};
