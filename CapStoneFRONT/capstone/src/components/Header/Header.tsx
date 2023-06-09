import { useState } from "react";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { styles } from "../../utils/style";
import "./Header.scss";
import { useAuth } from "../../context/AuthProvider";
import { Carousel } from "./Carousel";
import { slides } from "../../constants";

export const Header = () => {
  const [islogged, setIslogged] = useState(true);
  const { auth } = useAuth();

  const handleLogin = () => {
    setIslogged(!islogged);
  };

  return (
    <header className=" flex flex-col justify-center items-center">
      <section className="WelcomeSection">
        <div className={`max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#2c1b6c]" />
            <div className="w-1 sm:h-80 h-40 Gradient" />
          </div>
          <div>
            <h1 className={`${styles.heroHeadText} text-black`}>
              Hi, This is <span className="text-[#c51e32]">Locksmith 2.0</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-black text-center`}>
              where tradition and technology come together to provide you with an intelligent security experience.{" "}
              <br className="sm:block hidden" />
              <span>
                We are here to make the locksmith profession smart by offering innovative solutions and personalized
                services to ensure your peace of mind and protection. Welcome to the future of security with Locksmith
                2.0.
              </span>
            </p>
          </div>
        </div>
      </section>
      {/* Funziona fino a 900px */}

      {auth ? (
        <div className="max-w-[900px]">
          <Carousel
            autoSlide={true}
            autoSlideInterval={3000}
            slides={slides.map((s, i) => (
              <img key={i} src={s} alt="slide" />
            ))}
          />
        </div>
      ) : (
        <div className={islogged ? "cont" : "cont s--signup"}>
          <Login />
          <Register onLogin={handleLogin} />
        </div>
      )}
    </header>
  );
};
