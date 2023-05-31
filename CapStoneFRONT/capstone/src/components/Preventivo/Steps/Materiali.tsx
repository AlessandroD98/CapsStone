import { useAppSelector } from "../../../store/hooks";
import { MaterialCard } from "./MaterialCard";

export const Materiali = () => {
  const articles = useAppSelector((state) => state.preventiveS.preventive.articles);

  return (
    <main>
      <h2 className="font-bold text-2xl mb-4 text-center">Select the materials to use.</h2>
      <h3 className="text-center mb-3">If you don't know the materials, proceed by leaving the fields blank.</h3>
      <section>
        {articles.map((article, i) => (
          <MaterialCard article={article} key={i} />
        ))}
      </section>
    </main>
  );
};
