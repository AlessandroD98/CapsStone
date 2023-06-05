import { IArticleBack, IPreventive } from "../../interface/Interface";
import { PrevArticlesCard } from "./PrevArticlesCard";
import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";

type Props = {
  preventivi: IPreventive[];
};

export const ShowPrevs = ({ preventivi }: Props) => {
  const [showArticles, setShowArticles] = useState<{ [key: string]: boolean }>({});

  const toggleArticles = (preventiveId: number) => {
    setShowArticles((prevState) => ({
      ...prevState,
      [preventiveId]: !prevState[preventiveId],
    }));
  };

  return (
    <div className="w-full pe-5">
      {preventivi !== null && preventivi?.length === 0 ? (
        <p>Non hai nessun Preventivo</p>
      ) : (
        preventivi?.map((prev, i) => (
          <div key={i} className="p-4 mb-3 border-b-2">
            <div className="flex justify-between ">
              <h4>
                Preventive : N. <span className="font-semibold">{prev.numeropreventivo}</span>
              </h4>{" "}
              <p>
                State:{" "}
                <span
                  className={
                    prev.state === "SUBMITTED"
                      ? "submitted"
                      : prev.state === "IN_PROGRESS"
                      ? "inProgress"
                      : prev.state === "CANCELLED"
                      ? "cancelled"
                      : prev.state === "CONFIRMED"
                      ? "confirmed"
                      : ""
                  }
                >
                  {prev.state}
                </span>
              </p>
            </div>
            {prev.articles.length !== 0 ? (
              <div className="flex items-center">
                <p>Articles</p>
                <button onClick={() => toggleArticles(prev.numeropreventivo)}>
                  <BiChevronDown
                    className={
                      showArticles[prev.numeropreventivo]
                        ? "dimensionButton animation rotate-180"
                        : "dimensionButton animation"
                    }
                  />
                </button>
              </div>
            ) : (
              <p className="text-sm">In this preventive, there are no articles.</p>
            )}
            {showArticles[prev.numeropreventivo] ? (
              <div>
                {prev.articles.map((article, i) => (
                  <PrevArticlesCard article={article as IArticleBack} key={i} />
                ))}
              </div>
            ) : (
              ""
            )}
            <p>
              Descriprion : <span className="text-sm text-[#8b8b8b]">{prev.description}</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};
