import { BiChevronDown } from "react-icons/bi";
import { useEffect, useState } from "react";
import { IArticle, IMaterial, IMaterialLock } from "../../../interface/Interface";
import axios from "../../../api/axios";

type Props = {
  article: IArticle;
};

export const RiepilogoArtCard = ({ article }: Props) => {
  const [show, setShow] = useState(false);
  const [currentMaterial, setCurrrentMaterial] = useState<IMaterial | IMaterialLock | null>(null);

  const handleFetch = async () => {
    try {
      const BASE_URL = "/materials/" + article.type + "material/" + article.material;
      const response = await axios.get(BASE_URL);
      setCurrrentMaterial(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (article.material !== "") {
      handleFetch();
    }
  }, []);

  return (
    <main className="CustomShadowBox p-2 mb-2 rounded-md">
      <div className="flex justify-between ">
        <h3 className="uppercase">{article.type}</h3>
        <button onClick={() => setShow(!show)}>
          <BiChevronDown className={show ? "dimensionButton animation rotate-180" : "dimensionButton animation"} />
        </button>
      </div>
      {show ? (
        <div className="flex justify-around riepilogoArtCont">
          <div>
            <h4 className="font-semibold text-center">Size of the Article</h4>
            <p>Height: {article.height === 0 ? "Height not specified" : article.height + "cm"}</p>
            <p>Width: {article.width === 0 ? "Width not specified" : article?.width + "cm"}</p>
            <p>Thickness: {article.thickness === 0 ? "Thickness not specified" : article.thickness + "cm"}</p>
          </div>
          <div>
            <h4 className="font-semibold text-center">Material</h4>
            {article.material !== "" ? (
              <>
                <p>
                  {currentMaterial !== null && "lockType" in currentMaterial
                    ? (currentMaterial as IMaterialLock).lockType
                    : (currentMaterial as IMaterial).material}
                </p>
                <p>Material Code: {article.material}</p>
                <p>
                  Price: ~({currentMaterial?.priceMin}€ - {currentMaterial?.priceMax}€)
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
