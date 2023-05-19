import "./NavBar.scss";
import { styles } from "../../utils/style";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../assets/nuovologo.png";
import { navLinks } from "../../constants";
import { useAuth } from "../../context/AuthProvider";
import { GrClose, GrMenu } from "react-icons/gr";

export const NavBar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("Home");
            window.scrollTo(0, 0);
          }}
        >
          <img src={Logo} alt="logo" className="w-20 h-9 object-contain" />
          <p className="text-[18px] font-bold cursor-pointer flex ">
            Capstone &nbsp;
            <span className="sm:block hidden text-[#c51e32]"> | Locksmith 2.0</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-[#2c1b6c]" : "text-gray-500"
              } hover:text-[#2c1b6c] text-[18px] font-medium cursor-pointer animation`}
              onClick={() => setActive(nav.title)}
            >
              <Link to={`${nav.id}`}>{nav.title}</Link>
            </li>
          ))}
          {auth && auth.roles.includes("ROLE_ADMIN") ? (
            <>
              <li
                className={`${
                  active === "AdminPage" ? "text-[#2c1b6c]" : "text-gray-500"
                } hover:text-[#2c1b6c] text-[18px] font-medium cursor-pointer animation`}
                onClick={() => setActive("AdminPage")}
              >
                <Link to={"/adminpage"}>AdminPage</Link>
              </li>
            </>
          ) : (
            ""
          )}
          {auth && auth.roles.includes("ROLE_USER") ? (
            <li
              className={`${
                active === "Profile" ? "text-[#2c1b6c]" : "text-gray-500"
              } hover:text-[#2c1b6c] text-[18px] font-medium cursor-pointer animation`}
              onClick={() => setActive("Profile")}
            >
              <Link to={"/profile"}>Profile</Link>
            </li>
          ) : (
            ""
          )}
          {auth ? (
            <li
              className="text-[#ff8190] hover:text-[#c51e32] text-[18px] font-medium cursor-pointer animation"
              onClick={() => setAuth(null)}
            >
              <Link to="">Log out</Link>
            </li>
          ) : (
            ""
          )}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          {toggle ? (
            <GrClose className="w-[28px] h-[28px] object-contain" onClick={() => setToggle(!toggle)} />
          ) : (
            <GrMenu className="w-[28px] h-[28px] object-contain" onClick={() => setToggle(!toggle)} />
          )}

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-blue-400" : "text-gray-500"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <Link to={`${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
