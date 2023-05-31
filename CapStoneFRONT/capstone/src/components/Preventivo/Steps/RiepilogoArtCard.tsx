import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState } from "react";
import { IArticle, IMaterial, IMaterialLock } from "../../../interface/Interface";

type Props = {
  article: IArticle;
};

export const RiepilogoArtCard = ({ article }: Props) => {
  const [show, setShow] = useState(false);
  return (
    <main className="CustomShadowBox p-2 mb-2 rounded-md">
      <div className="flex justify-between ">
        <h3 className="uppercase">{article.type}</h3>
        <button onClick={() => setShow(!show)} className="dimensionButton animation">
          {show ? <BiChevronUp /> : <BiChevronDown />}
        </button>
      </div>
      {show ? (
        <div className="flex justify-around riepilogoArtCont">
          <div>
            <h4 className="font-semibold text-center">Size of the Article</h4>
            <p>Height: {article.height === 0 ? "Height not specified" : article.height + "cm"}</p>
            <p>Width: {article.width === 0 ? "Width not specified" : article.width + "cm"}</p>
            <p>Thickness: {article.thickness === 0 ? "Thickness not specified" : article.thickness + "cm"}</p>
          </div>
          <div>
            <h4 className="font-semibold text-center">Material</h4>
            {article.material !== null ? (
              <>
                <p>
                  {article.material !== null && "lockType" in article.material
                    ? (article.material as IMaterialLock).lockType
                    : (article.material as IMaterial).material}
                </p>
                <p>Material Code: {article.material?.materialCode}</p>
                <p>
                  Price: ~({article.material?.priceMin}€ - {article.material?.priceMax}€)
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
