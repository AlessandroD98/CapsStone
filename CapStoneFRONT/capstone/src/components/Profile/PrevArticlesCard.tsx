import { IArticleBack } from "../../interface/Interface";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

type Props = {
  article: IArticleBack;
};

export const PrevArticlesCard = ({ article }: Props) => {
  const [show, setShow] = useState(false);

  const nullVerify = (type: string) => {
    if (type === "door") {
      return article.doormaterial;
    } else if (type === "window") {
      return article.windowmaterial;
    } else if (type === "lock") {
      return article.lockmaterial;
    }
  };

  console.log(article);

  return (
    <main className="CustomShadowBox p-2 mb-2 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="uppercase">{article.type}</h3>
        <button onClick={() => setShow(!show)} className="dimensionButton animation">
          {show ? <BiChevronUp /> : <BiChevronDown />}
        </button>
      </div>
      {show ? (
        <div className="flex justify-around riepilogoArtCont">
          <div>
            <h4 className="font-semibold text-center">Size of the Article</h4>
            <p>Height: {article.height === 0 || !article.height ? "Height not specified" : article.height + "cm"}</p>
            <p>Width: {article.width === 0 || !article.width ? "Width not specified" : article.width + "cm"}</p>
            <p>Thickness: {article.thickness === 0 ? "Thickness not specified" : article.thickness + "cm"}</p>
          </div>
          <div>
            <h4 className="font-semibold text-center">Material</h4>
            {nullVerify(article.type) !== null ? (
              <>
                <p>
                  {article.type === "door"
                    ? article.doormaterial.material
                    : article.type === "window"
                    ? article.windowmaterial.material
                    : article.type === "lock"
                    ? article.lockmaterial.lockType
                    : ""}
                </p>
                <p>Material Code: {article.material}</p>
                <p>
                  Price: ~(
                  {article.type === "door"
                    ? article.doormaterial.priceMin
                    : article.type === "window"
                    ? article.windowmaterial.priceMin
                    : article.type === "lock"
                    ? article.lockmaterial.priceMin
                    : ""}
                  € -{" "}
                  {article.type === "door"
                    ? article.doormaterial.priceMax
                    : article.type === "window"
                    ? article.windowmaterial.priceMax
                    : article.type === "lock"
                    ? article.lockmaterial.priceMax
                    : ""}
                  €)
                </p>
              </>
            ) : (
              <p>No material selected</p>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};
