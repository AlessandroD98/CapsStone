import { IArticleBack } from "../../interface/Interface";
import { useAppSelector } from "../../store/hooks";
import { PrevArticlesCard } from "./PrevArticlesCard";
import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";
import { ShowPrevs } from "./ShowPrevs";

export const Preventives = () => {
  const preventivi = useAppSelector((state) => state.user.user?.preventives);
  // const [showArticles, setShowArticles] = useState<{ [key: string]: boolean }>({});

  // const toggleArticles = (preventiveId: number) => {
  //   setShowArticles((prevState) => ({
  //     ...prevState,
  //     [preventiveId]: !prevState[preventiveId],
  //   }));
  // };

  return <>{preventivi ? <ShowPrevs preventivi={preventivi} /> : ""}</>;
};
