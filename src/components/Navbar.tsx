import React from "react";
import { motion } from "framer-motion";
import Logo from "../assets/complete-logo-white.png";
import HOME from "../assets/Icons/HOME.svg";
import LEADERBOARD from "../assets/Icons/LEADERBOARD.svg";
import SETTINGS from "../assets/Icons/SETTINGS.svg";
import { useSettings } from "../context/SettingsContext";

const Navbar: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const itemVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const { toggleOverlay, isOverlayVisible } = useSettings();
  return (
    <motion.nav
      className="w-full flex justify-around items-center p-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-1/4 flex justify-start items-center">
        <div className="logo">
          <img src={Logo} alt="Key Momentem" className="h-30 w-60" />
        </div>
      </div>

      <div className="w-9/12 flex justify-center items-center">
        <div className="w-1/2 flex justify-center items-center">
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="h-auto p-3 bg-[#282828] rounded-2xl mx-4 flex justify-center items-center cursor-pointer hover:bg-[#484848]"
          >
            <img
              src={HOME}
              alt="KeyMomentem homeIcon Icon"
              height={44}
              width={44}
              className="mx-2"
            />
            <p className="text-xl font-Jura text-slate-100">Home</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="h-auto p-3 bg-[#282828] rounded-2xl mx-4 flex justify-center items-center cursor-pointer hover:bg-[#484848]"
          >
            <img
              src={LEADERBOARD}
              alt="KeyMomentem homeIcon Icon"
              height={44}
              width={44}
              className="mx-2"
            />
            <p className="text-xl font-Jura text-slate-100">Leaderboard</p>
          </motion.div>
        </div>

        <div className="w-1/2 flex justify-end items-center">
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className={`h-auto p-3 rounded-2xl mx-4 cursor-pointer ${
              isOverlayVisible ? ' border-blue-300' : ' border-transparent'
            }`}
            onClick={toggleOverlay}

          >
            <motion.img
              src={SETTINGS}
              alt="KeyMomentem homeIcon Icon"
              height={44}
              width={44}
              className="mx-2"
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: isOverlayVisible ? 90 : 0 }}
              transition={{ duration: .5 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
