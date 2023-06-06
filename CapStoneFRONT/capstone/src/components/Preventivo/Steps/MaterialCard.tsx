import { useState, useEffect } from "react";
import { IArticle, IMaterial, IMaterialLock } from "../../../interface/Interface";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useAppDispatch } from "../../../store/hooks";
import axios from "../../../api/axios";
import { updateArticle } from "../../../store/features/preventivoSlice";

type Props = {
  article: IArticle;
};

export const MaterialCard = ({ article }: Props) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [materials, setMaterials] = useState<IMaterial[] | IMaterialLock[]>([]);

  const handleFetch = async () => {
    try {
      const BASE_URL = "materials/" + article.type + "material";

      const response = await axios.get(BASE_URL);
      setMaterials(response.data);
    } catch (error) {}
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMaterial = materials[parseInt(e.target.value)];
    const updatedArticle = { ...article, material: selectedMaterial.materialCode };
    dispatch(updateArticle(updatedArticle));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <main className="relative CustomShadowBox p-2 mb-2 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="uppercase">{article.type}</h3>
        <button onClick={() => setShow(!show)} className="dimensionButton animation">
          {show ? <BiChevronUp /> : <BiChevronDown />}
        </button>
      </div>
      {show ? (
        <div className="anagraficaCont mt-0 mb-3 flex justify-evenly ">
          <div className="flex">
            <p>Material:</p>
            <select name="" id="" className="cursor-pointer ms-3" onChange={handleChange}>
              {materials.length > 0
                ? materials.map((material, i) => (
                    <option value={i} key={i}>
                      {" "}
                      {"lockType" in material
                        ? (material as IMaterialLock).lockType
                        : (material as IMaterial).material}{" "}
                      {material.priceMin}€ - {material.priceMax}€
                    </option>
                  ))
                : ""}
            </select>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};
