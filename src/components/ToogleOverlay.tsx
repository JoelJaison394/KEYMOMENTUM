import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "../context/SettingsContext";
import BACK from "../assets/Icons/BACK.svg";
import { useEffect } from "react";

const ToggleOverlay = () => {
  const { isOverlayVisible, toggleOverlay, setDifficulty, difficulty , setTimeRange , timeRange } =
    useSettings();

  const handleLevelSliderChange = (value: number) => {
    setDifficulty(value);
  };
  const handleTimeSliderChange = (value: number) => {
    setTimeRange(value);
  };

  useEffect(() => {
    // You can add additional initialization logic here
  }, []);

  return (
    <AnimatePresence>
      {isOverlayVisible && (
        <motion.div
          className="fixed top-0 right-0 h-full w-1/4 bg-[#131313] shadow-lg flex flex-col justify-start items-center p-3"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-full">
            <div
              className="h-auto w-fit  my-3  p-3 bg-[#282828] rounded-2xl mx-4 flex justify-center items-center cursor-pointer hover:bg-[#484848]"
              onClick={toggleOverlay}
            >
              <img
                src={BACK}
                alt="KEYMOMENTEM BACKICON ICON "
                height={34}
                width={34}
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center h-auto space-x-4 my-4 bg-[#282828] rounded-3xl">
              <div className="text-white text-2xl mb-3">Level</div>
              <div className="w-3/4 flex  items-start justify-around h-16 space-x-4  font-Kotta">
                {[0, 1, 2, 3].map((value) => (
                  <div
                    key={value}
                    className="relative"
                    onClick={() => handleLevelSliderChange(value)}
                  >
                    <div
                      className={`w-6 h-6 bg-[#131313] rounded-full cursor-pointer ${
                        value === difficulty ? "bg-[#6AC2F3]" : ""
                      }`}
                    ></div>
                    <span className="absolute bottom-[-28px] text-white text-xs">
                      {value === 0 && "Easy"}
                      {value === 1 && "Medium"}
                      {value === 2 && "Hard"}
                      {value === 3 && "Difficult"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center h-auto space-x-4 my-4 bg-[#282828] rounded-3xl">
              <div className="text-white text-2xl mb-3">Time Limit</div>
              <div className="w-3/4 flex  items-start justify-around h-16 space-x-4  font-Kotta">
                {[30, 60, 120].map((value) => (
                  <div
                    key={value}
                    className="relative"
                    onClick={() => handleTimeSliderChange(value)}
                  >
                    <div
                      className={`w-6 h-6 bg-[#131313] rounded-full cursor-pointer ${
                        value === timeRange ? "bg-[#6AC2F3]" : ""
                      }`}
                    ></div>
                    <span className="absolute bottom-[-28px] text-white text-xs">
                      {value === 30 && "30's"}
                      {value === 60 && "60's"}
                      {value === 120 && "120's"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToggleOverlay;
