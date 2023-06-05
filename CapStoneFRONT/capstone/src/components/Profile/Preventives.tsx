import { useAppSelector } from "../../store/hooks";

export const Preventives = () => {
  const preventivi = useAppSelector((state) => state.user.user?.preventives);

  return (
    <div className="">
      {preventivi !== null && preventivi?.length === 0 ? (
        <p>Non hai nessun Preventivo</p>
      ) : (
        preventivi?.map((prev, i) => (
          <div key={i}>
            Preventivo: {prev.numeropreventivo} - Stato: {prev.state}
          </div>
        ))
      )}
    </div>
  );
};
