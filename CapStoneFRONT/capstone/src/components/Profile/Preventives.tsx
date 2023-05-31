import { useAppSelector } from "../../store/hooks";

export const Preventives = () => {
  const preventivi = useAppSelector((state) => state.user.user?.preventives);

  return (
    <div>
      {preventivi !== null && preventivi?.length === 0 ? (
        <p>Non hai nessun Preventivo</p>
      ) : (
        preventivi?.map((prev, i) => <div key={i}>{prev.state}</div>)
      )}
    </div>
  );
};
