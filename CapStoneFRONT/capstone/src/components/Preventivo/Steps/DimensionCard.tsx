import { useState } from "react";
import { IArticle } from "../../../interface/Interface";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useAppDispatch } from "../../../store/hooks";
import { updateArticle } from "../../../store/features/preventivoSlice";
type Props = {
  article: IArticle;
};

export const DimensionCard = ({ article }: Props) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedArticle = { ...article, [name]: parseInt(value) };
    dispatch(updateArticle(updatedArticle));
  };

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
          <div className="input mt-6">
            <input
              type="text"
              className="input-field"
              required
              name="height"
              value={article.height}
              onChange={handleChange}
              autoComplete="disable-autocomplete"
            />
            <label className="input-label">height (cm)</label>
          </div>
          <div className="input">
            <input
              type="text"
              className="input-field"
              required
              name="width"
              value={article.width}
              onChange={handleChange}
              autoComplete="disable-autocomplete"
            />
            <label className="input-label">width (cm)</label>
          </div>
          <div className="input">
            <input
              type="text"
              className="input-field"
              required
              name="thickness"
              value={article.thickness}
              onChange={handleChange}
              autoComplete="disable-autocomplete"
            />
            <label className="input-label">thickness (cm)</label>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};
