import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";
import { styles } from "../../utils/style";
import { textVariant } from "../../utils/motion";
import { testimonials } from "../../constants";
import { FeedbackCard } from "./FeedBackCard";

const Feedbacks = () => {
  return (
    <div className={`mt-12 bg-white rounded-[20px] shadow-lg`}>
      <div className={`bg-white rounded-2xl ${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant(0.1)}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Reviews.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
