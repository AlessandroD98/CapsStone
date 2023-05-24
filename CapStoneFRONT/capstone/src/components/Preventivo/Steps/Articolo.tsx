import { useAppSelector } from "../../../store/hooks";

export const Articolo = () => {
  const preventive = useAppSelector((state) => state.preventiveS.preventive);

  return <div>Articolo</div>;
};
