import React from "react";
import { motion } from "framer-motion";
import { services } from "../../constants";
import { fadeIn, textVariant } from "../../utils/motion";
import { styles } from "../../utils/style";
import { ServiceCard } from "./ServiceCard";
import { SectionWrapper } from "../hoc";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant(0.5)}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-[17px] max-w-3xl leading-[30px]">
        Locksmith 2.0 is your online reference point to connect with security professionals. Our website offers you a
        direct connection with our expert locksmiths, allowing you to book an appointment and request a quote quickly
        and easily. Through our online platform, you can explore a wide selection of available security products and
        solutions. We are here to simplify the process of obtaining quality services and reliable security products.
      </motion.p>
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, i) => (
          <ServiceCard key={service.title} index={i} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
