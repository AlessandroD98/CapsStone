import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { BsCalendarCheck, BsClock } from "react-icons/bs";
import { RiepilogoArtCard } from "./RiepilogoArtCard";
import { addDescription } from "../../../store/features/preventivoSlice";

export const Riepilogo = () => {
  const { articles, inspectionDate, inspectionHour, cliente, description } = useAppSelector(
    (state) => state.preventiveS.preventive
  );
  const dispatch = useAppDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    dispatch(addDescription(value));
  };

  return (
    <>
      <h2 className="font-bold text-2xl mb-4 text-center">Estimate Summary</h2>
      <main>
        <div className="flex gap-5 riepilogoSection">
          <section className="riepilogoCliente">
            <h3>Contact information</h3>
            <p>
              NAME: <span>{cliente.name}</span>
            </p>
            <p>
              LASTNAME: <span>{cliente.lastname}</span>
            </p>
            <p>
              EMAIL: <span>{cliente.email}</span>
            </p>
            <p>
              CITY:<span> {cliente.city}</span>
            </p>
            <p>
              ADDRESS: <span>{cliente.address}</span>
            </p>
            <p>
              ZIP CODE: <span>{cliente.zipCode}</span>
            </p>
          </section>
          <section className="riepilogoCliente">
            <h3>Leave a brief description for specific requests.</h3>
            <div className="descriptionCont">
              <div className="input">
                <textarea
                  className="input-field"
                  value={description}
                  onChange={handleOnChange}
                  rows={4}
                  required
                  name="nameData"
                />
                <label className="input-label">Description</label>
              </div>
            </div>
          </section>
          <section className="riepilogoCliente flex-1">
            <h3>Date and time of the appointment.</h3>
            <div className="">
              <div className="flex items-center">
                <BsCalendarCheck className="me-1 text-[#2c1b6c]" />
                <p>{inspectionDate}</p>
              </div>
              <div className="flex items-center">
                <BsClock className="me-1 text-[#2c1b6c]" />
                <p>{inspectionHour.hour}</p>
              </div>
            </div>
          </section>
        </div>
        <section className="mt-4">
          {articles.map((article, i) => (
            <RiepilogoArtCard article={article} key={i} />
          ))}
        </section>
      </main>
    </>
  );
};
