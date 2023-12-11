// src/components/Preloader.tsx

import React from "react";
import { Variants, motion } from "framer-motion";

const svgVarient = {
    hidden: {
        rotate: -360
    },
    visible: {
        rotate: 0,
        transition: {
            duration: 2
        }
    }

    
}
const pathVariant: Variants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      strokeWidth: 0,
      strokeLinecap: "butt"
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      strokeWidth: 8, 
      strokeLinecap: "round",
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };
const Preloader: React.FC = () => {
  return (
    <div className="preloader bg-black flex w-full h-full min-h-[100vh] justify-center items-center">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="175"
        height="175"
        viewBox="0 0 175 175"
        fill="none"
        variants={svgVarient}
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M91 147C75.087 147 59.8258 140.679 48.5736 129.426C37.3214 118.174 31 102.913 31 87C31 71.087 37.3214 55.8258 48.5736 44.5736C59.8258 33.3214 75.087 27 91 27"
          stroke="white"
            variants={pathVariant}


        />
        <path
          d="M91 132C82.0998 132 73.3995 129.361 65.9993 124.416C58.5991 119.471 52.8314 112.443 49.4254 104.221C46.0195 95.9981 45.1283 86.9501 46.8647 78.2209C48.601 69.4918 52.8868 61.4736 59.1802 55.1802C65.4736 48.8868 73.4918 44.601 82.2209 42.8647C90.9501 41.1283 99.9981 42.0195 108.221 45.4254C116.443 48.8314 123.471 54.5991 128.416 61.9993C133.361 69.3996 136 78.0998 136 87L91 87L91 132Z"
          fill="white"
        />
        <motion.path
          d="M90.5245 167.62C80.2158 167.62 70.0079 165.499 60.4839 161.378C50.9598 157.257 42.306 151.217 35.0166 143.603C27.7272 135.988 21.945 126.949 18 117"
          stroke="white"
          variants={pathVariant}
        />
      </motion.svg>
    </div>
  );
};

export default Preloader;
