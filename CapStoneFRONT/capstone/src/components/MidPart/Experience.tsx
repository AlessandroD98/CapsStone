import React from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../../utils/style";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../../utils/motion";
import { experiences } from "../../constants";
import { RelatedCard } from "./RelatedCard";

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant(0.5)}>
        <p className={styles.sectionSubText}>What we can offer you</p>
        <h2 className={styles.sectionHeadText}>Key points for a great choice.</h2>
      </motion.div>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <RelatedCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};
export default SectionWrapper(Experience, "exp");
