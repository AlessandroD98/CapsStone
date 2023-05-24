import { useAppSelector } from "../../../store/hooks";
import { useEffect } from "react";
import "./Steps.scss";

export const Anagrafica = () => {
  const preventive = useAppSelector((state) => state.preventiveS.preventive);
  const user = useAppSelector((state) => state.user.user);
  const checks = useAppSelector((state) => state.checkS.checks);

  useEffect(() => {}, []);

  return (
    <>
      <header className="my-0">
        <h2 className="font-bold text-2xl mb-4">Contact information</h2>
        {user ? (
          <label htmlFor="" className="flex">
            <input type="checkbox" /> Use profile data
          </label>
        ) : (
          ""
        )}
      </header>
      <main className="flex justify-evenly">
        <section className="anagraficaCont">
          <h3>Details</h3>
          <div className="input">
            <input type="text" className="input-field" required />
            <label className="input-label">Name</label>
          </div>
          <div className="input">
            <input type="text" className="input-field" required />
            <label className="input-label">Lastname</label>
          </div>
          <div className="input">
            <input type="email" className="input-field" required />
            <label className="input-label">Email</label>
          </div>
        </section>
        <section className="anagraficaCont">
          <h3>Address</h3>
          <div className="input">
            <input type="text" className="input-field" required />
            <label className="input-label">City</label>
          </div>
          <div className="input">
            <input type="text" className="input-field" required />
            <label className="input-label">Address</label>
          </div>
          <div className="input">
            <input type="email" className="input-field" required />
            <label className="input-label">Zip Code</label>
          </div>
        </section>
      </main>
    </>
  );
};
