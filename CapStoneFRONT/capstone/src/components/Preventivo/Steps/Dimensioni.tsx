import { useAppSelector } from "../../../store/hooks";
import { DimensionCard } from "./DimensionCard";

export const Dimensioni = () => {
  const articles = useAppSelector((state) => state.preventiveS.preventive.articles);

  return (
    <main>
      <h2 className="font-bold text-2xl mb-4 text-center">
        {articles.length > 1
          ? "Enter the approximate measurements of your items"
          : "Enter the approximate measurements of your item"}
      </h2>
      <h3 className="text-center mb-3">If you don't know the measurements, proceed by leaving the fields blank.</h3>
      <section>
        {articles.map((article, i) => (
          <DimensionCard article={article} key={i} />
        ))}
      </section>
    </main>
  );
};
