import "./SearchBar.scss";
import { IoSearch, IoClose } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IPreventive } from "../../interface/Interface";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import userimg from "../../assets/userPlaceholder.jpg";

const SearchBar = () => {
  const { auth } = useAuth();
  const [isExpanded, setExpanded] = useState<boolean>();
  const [searchPerson, setSearchPerson] = useState("");

  const [notFoundMsg, setNotFoundMsg] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const [allRes, setAllRes] = useState<IPreventive[]>([]);

  const containerVariants = {
    expanded: {
      height: "20em",
    },
    collapsed: {
      height: "2.7em",
    },
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchPerson("");

    setAllRes([]);

    setNotFoundMsg(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNotFoundMsg(false);

    setSearchPerson(e.target.value);
    //console.log(e.target.value);
    funzioneRicerca(e);
  };

  const funzioneRicerca = (e: any) => {
    const risultato = allRes.filter((prev: IPreventive) => prev.numeropreventivo.toString().includes(e.target.value));
    //console.log(risultato);
    setAllRes(risultato);
    if (risultato.length === 0) {
      setNotFoundMsg(true);
    }
  };

  const handleFetch = async () => {
    try {
      const BASE_URL = "preventive/all";

      const config = {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      };

      const response = await axios.get(BASE_URL, config);
      setAllRes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <motion.div
      className="SearchBarContainer"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      style={{ boxShadow: isExpanded ? "0px 2px 12px 3px rgba(0, 0, 0, 0.14)" : "none" }}
    >
      <div className="SearchInputContainer">
        <span className="SearchIcon">
          <IoSearch />
        </span>
        <input
          type="text"
          //name=""
          id=""
          className="SearchInput"
          placeholder="Cerca"
          onFocus={expandContainer}
          ref={inputRef}
          value={searchPerson}
          onChange={changeHandle}
        />
        {isExpanded && (
          <AnimatePresence>
            <motion.span
              className="CloseIcon"
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={collapseContainer}
            >
              <IoClose />
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <span className="LineSeparatpr"></span>
      <div className="SearchContent">
        {/* {isLoading && (
          <div className="LoaderWrapper">
            <PacmanLoader size={20} color={"#bebebe"} />
          </div>
        )} */}
        {allRes.length === 0 && !notFoundMsg && (
          <div className="LoaderWrapper">
            <span className="SearchedProfileTitle">Start typing to Search</span>
          </div>
        )}
        {notFoundMsg && (
          <>
            <div className="LoaderWrapper">
              <span className="SearchedProfileTitle">No results</span>
            </div>
          </>
        )}
        {allRes.length > 0 && (
          <>
            {/* Profilo */}
            {allRes.length > 0 &&
              allRes.map((el) => (
                <Link
                  className="SearchLinkContainer"
                  to={
                    "/profile/"
                    //   + (el._id === myProfile._id ? "me" : el._id)
                  }
                  key={el.numeropreventivo}
                  onClick={() => {
                    setExpanded(false);
                    setAllRes([]);
                    setSearchPerson("");
                  }}
                >
                  <div className="SearchedProfileContainer">
                    <span className="SearchedProfileIcon">
                      <IoSearch />
                    </span>
                    <div className="d-flex flex-column SearchedInfoText">
                      <h3 className="SearchedProfileName ">
                        {/* {el.cliente.name}  */}
                        {/* {el.cliente.lastname} ·{" "} */}
                      </h3>
                      <span className="SearchedProfileTitle"> {el.numeropreventivo}</span>
                    </div>
                    <div className="SearchedProfileImgContainer">
                      <img src={userimg} alt="" />
                    </div>
                  </div>
                </Link>
              ))}
            {/* Profilo */}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;
