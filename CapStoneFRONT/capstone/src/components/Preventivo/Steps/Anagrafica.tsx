import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import "./Steps.scss";
import { addCliente } from "../../../store/features/preventivoSlice";
import { checkAnagrafica } from "../../../store/features/prevInputCheck";

export const Anagrafica = () => {
  const user = useAppSelector((state) => state.user.user);
  //const prevCliente = useAppSelector((state) => state.preventiveS.preventive.cliente);
  const dispatch = useAppDispatch();

  const [data, setData] = useState({
    nameData: "",
    lastNameData: "",
    emailData: "",
    cityData: "",
    addressData: "",
    zipCodeData: "",
    sameAsProfile: false,
  });

  useEffect(() => {
    const allProperties =
      Object.values(data).every((value) => value !== "") &&
      data.cityData !== "No City value check Profile" &&
      data.addressData !== "No Address value check Profile" &&
      data.zipCodeData !== "No Zip Code value check Profile";

    if (allProperties) {
      const updatedCliente = {
        name: data.nameData,
        lastname: data.lastNameData,
        email: data.emailData,
        city: data.cityData,
        address: data.addressData,
        zipCode: data.zipCodeData,
        tel: 0,
      };
      dispatch(addCliente(updatedCliente));
      dispatch(checkAnagrafica({ inputs: true }));
    } else {
      dispatch(checkAnagrafica({ inputs: false }));
    }
  }, [data.nameData, data.lastNameData, data.emailData, data.cityData, data.addressData, data.zipCodeData]);

  useEffect(() => {
    if (data.sameAsProfile && user !== null) {
      setData((prevData) => ({
        ...prevData,
        nameData: user.name,
        lastNameData: user.lastname,
        emailData: user.email,
        cityData: user.city ? user.city : "No City value check Profile",
        addressData: user.address ? user.address : "No Address value check Profile",
        zipCodeData: user.zipCode ? user.zipCode : "No Zip Code value check Profile",
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        nameData: "",
        lastNameData: "",
        emailData: "",
        cityData: "",
        addressData: "",
        zipCodeData: "",
      }));
    }
  }, [data.sameAsProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setData((prevData) => ({
      ...prevData,
      sameAsProfile: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLabelClassName = (current: string, arg2: string) => {
    if (data.sameAsProfile && current === arg2) {
      return "alertLabel";
    } else if (data.sameAsProfile && current !== arg2) {
      return "checkedLabel";
    } else {
      return "input-label";
    }
  };

  const handleInputClassName = (current: string, arg2: string) => {
    if (data.sameAsProfile && current === arg2) {
      return "alertInput";
    } else if (data.sameAsProfile && current !== arg2) {
      return "checkedInput";
    } else {
      return "input-field";
    }
  };

  return (
    <>
      <header className="my-0 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl mb-4">Contact information</h2>
        {user && user.name && user.lastname ? (
          <label htmlFor="sameAsProfile" className="flex justify-center">
            <input
              className="w-4 me-3"
              type="checkbox"
              id="sameAsProfile"
              name="sameAsProfile"
              checked={data.sameAsProfile}
              onChange={handleChange}
            />
            Same as Profile
          </label>
        ) : (
          ""
        )}
      </header>
      <main className="flex justify-evenly anagraficaMain">
        <section className="anagraficaCont">
          <h3>Details</h3>
          <div className="input">
            <input
              type="text"
              className={data.sameAsProfile ? "checkedInput" : "input-field"}
              required
              name="nameData"
              value={data.nameData}
              disabled={data.sameAsProfile}
              onChange={handleInputChange}
            />
            <label className={data.sameAsProfile ? "checkedLabel" : "input-label"}>Name</label>
          </div>

          <div className="input">
            <input
              type="text"
              className={data.sameAsProfile ? "checkedInput" : "input-field"}
              required
              name="lastNameData"
              value={data.lastNameData}
              disabled={data.sameAsProfile}
              onChange={handleInputChange}
            />
            <label className={data.sameAsProfile ? "checkedLabel" : "input-label"}>Lastname</label>
          </div>

          <div className="input">
            <input
              type="email"
              className={data.sameAsProfile ? "checkedInput" : "input-field"}
              required
              name="emailData"
              value={data.emailData}
              disabled={data.sameAsProfile}
              onChange={handleInputChange}
            />
            <label className={data.sameAsProfile ? "checkedLabel" : "input-label"}>Email</label>
          </div>
        </section>
        <section className="anagraficaCont">
          <h3>Address</h3>
          <div className="input">
            <input
              type="text"
              className={handleInputClassName(data.cityData, "No City value check Profile")}
              required
              name="cityData"
              value={data.cityData}
              disabled={data.sameAsProfile}
              onChange={handleInputChange}
            />
            <label className={handleLabelClassName(data.cityData, "No City value check Profile")}>City</label>
          </div>

          <div className="input">
            <input
              type="text"
              className={handleInputClassName(data.addressData, "No Address value check Profile")}
              required
              name="addressData"
              value={data.addressData}
              disabled={data.sameAsProfile}
              onChange={handleInputChange}
            />
            <label className={handleLabelClassName(data.addressData, "No Address value check Profile")}>Address</label>
          </div>

          <div className="input">
            <input
              type="text"
              className={handleInputClassName(data.zipCodeData, "No Zip Code value check Profile")}
              required
              name="zipCodeData"
              value={data.zipCodeData}
              disabled={data.sameAsProfile}
              onChange={handleInputChange}
            />
            <label className={handleLabelClassName(data.zipCodeData, "No Zip Code value check Profile")}>
              Zip Code
            </label>
          </div>
        </section>
      </main>
    </>
  );
};
