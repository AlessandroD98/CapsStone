import { useAppSelector } from "../../store/hooks";

export const Preventives = () => {
  const user = useAppSelector((state) => state.user.user);

  return <div>{user?.preventives.length === 0 ? <p>Non hai nessun Preventivo</p> : ""}</div>;
};
