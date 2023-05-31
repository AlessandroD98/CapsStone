import { IArticle } from "../../../interface/Interface";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { checkBoxList } from "../../../constants";
import { addArticles, removeArticles } from "../../../store/features/preventivoSlice";
import { checkArticle } from "../../../store/features/prevInputCheck";

export const Articolo = () => {
  const Articles = useAppSelector((state) => state.preventiveS.preventive.articles);
  const dispatch = useAppDispatch();

  const [checkboxState, setCheckboxState] = useState({
    name: "",
    selectDoor: false,
    selectWindow: false,
    selectLock: false,
    selectOther: false,
  });

  const lookForProp = (type: keyof IArticle, qwery: string) => {
    console.log(type, qwery);
    return Articles.some((obj) => obj[type] === qwery);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.checked;
    setCheckboxState((prevState) => ({
      ...prevState,
      name: name,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (checkboxState.name === checkBoxList.door && !lookForProp("type", "door") && checkboxState.selectDoor) {
      dispatch(
        addArticles({
          height: 0,
          width: 0,
          thickness: 0,
          type: "door",
          material: null,
        })
      );
    } else if (
      checkboxState.name === checkBoxList.window &&
      !lookForProp("type", "window") &&
      checkboxState.selectWindow
    ) {
      dispatch(
        addArticles({
          height: 0,
          width: 0,
          thickness: 0,
          type: "window",
          material: null,
        })
      );
    } else if (checkboxState.name === checkBoxList.lock && !lookForProp("type", "lock") && checkboxState.selectLock) {
      dispatch(
        addArticles({
          height: 0,
          width: 0,
          thickness: 0,
          type: "lock",
          material: null,
        })
      );
    } else if (
      checkboxState.name === checkBoxList.other &&
      !lookForProp("type", "other") &&
      checkboxState.selectOther
    ) {
      dispatch(
        addArticles({
          height: 0,
          width: 0,
          thickness: 0,
          type: "other",
          material: null,
        })
      );
    } else if (checkboxState.name === checkBoxList.door && lookForProp("type", "door") && !checkboxState.selectDoor) {
      dispatch(removeArticles("door"));
    } else if (
      checkboxState.name === checkBoxList.window &&
      lookForProp("type", "window") &&
      !checkboxState.selectWindow
    ) {
      dispatch(removeArticles("window"));
    } else if (checkboxState.name === checkBoxList.lock && lookForProp("type", "lock") && !checkboxState.selectLock) {
      dispatch(removeArticles("lock"));
    } else if (
      checkboxState.name === checkBoxList.other &&
      lookForProp("type", "other") &&
      !checkboxState.selectOther
    ) {
      dispatch(removeArticles("other"));
    } else return;
  }, [checkboxState.selectDoor, checkboxState.selectLock, checkboxState.selectOther, checkboxState.selectWindow]);

  useEffect(() => {
    if (isAtLeastOneCheckboxChecked()) {
      dispatch(checkArticle({ inputs: true }));
    } else dispatch(checkArticle({ inputs: false }));
  }, [checkboxState.selectDoor, checkboxState.selectLock, checkboxState.selectOther, checkboxState.selectWindow]);

  const isAtLeastOneCheckboxChecked = (): boolean => {
    return Object.values(checkboxState).some((value) => value === true);
  };

  return (
    <main>
      <h2 className="font-bold text-2xl mb-4 text-center">Select Articles</h2>
      <h3 className="text-center mb-3 ">Select one or more articles </h3>
      <section className="flex flex-col items-center">
        <label htmlFor="selectDoor" className="flex justify-start font-semibold ">
          <input
            onChange={handleChange}
            type="checkbox"
            id="selectDoor"
            className="w-4 me-3"
            name={checkBoxList.door}
          />
          Armored door
        </label>

        <label htmlFor="selectWindow" className="flex justify-start font-semibold">
          <input
            onChange={handleChange}
            type="checkbox"
            id="selectWindow"
            className="w-4 me-3"
            name={checkBoxList.window}
          />
          Window
        </label>

        <label htmlFor="selectLock" className="flex justify-start font-semibold">
          <input
            onChange={handleChange}
            type="checkbox"
            id="selectLock"
            className="w-4 me-3"
            name={checkBoxList.lock}
          />
          Lock
        </label>

        <label htmlFor="selectOther" className="flex justify-start font-semibold">
          <input
            onChange={handleChange}
            type="checkbox"
            id="selectOther"
            className="w-4 me-3"
            name={checkBoxList.other}
          />
          Other
        </label>
      </section>
    </main>
  );
};
