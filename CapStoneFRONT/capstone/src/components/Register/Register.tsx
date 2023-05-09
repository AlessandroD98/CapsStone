import { useRef, useState, useEffect } from "react";
import { FaInfoCircle, FaCheck, FaTimes } from "react-icons/fa";
import axios from "../../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

export const Register = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {}, []);
  userRef.current!.focus();

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data);
      setSuccess(true);
    } catch (error: any) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registartion failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sing In</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            {/* ---- Controllo input mail ----*/}

            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FaCheck />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FaTimes />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              <FaInfoCircle />
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, number, underscores, hyphens allowd.
            </p>

            {/* ---- Controllo input psw ----*/}

            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FaCheck />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FaTimes />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FaInfoCircle />
              8 to 24 characters. <br />
              Must include uppercase and lowercase letters, a number and a special character.
              <br />
              Allowed special characters:
              <span aria-label="excalamtion mark">!</span>
              <span aria-label="at sumbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            {/* ---- Controllo input pswMatch ----*/}

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FaCheck />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FaTimes />
              </span>
            </label>
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
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FaInfoCircle />
              Must match the fisrt password input field.
            </p>

            <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sing Up</button>
          </form>
        </section>
      )}
    </>
  );
};
