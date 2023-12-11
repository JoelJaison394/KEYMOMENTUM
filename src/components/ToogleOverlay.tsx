
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "../context/SettingsContext";
import BACK from "../assets/Icons/BACK.svg";

const ToggleOverlay = () => {
  const { isOverlayVisible, toggleOverlay } = useSettings();

  return (
    <AnimatePresence>
      {isOverlayVisible && (
        <motion.div
          className="fixed top-0 right-0 h-full w-1/4 bg-[#131313] shadow-lg flex flex-col justify-start items-center"
          initial={{ width: 0 }}
          animate={{ width: "25%" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-full">
            <div className="h-auto w-fit  my-3  p-3 bg-[#282828] rounded-2xl mx-4 flex justify-center items-center cursor-pointer hover:bg-[#484848]"
            onClick={toggleOverlay}>
              <img
                src={BACK}
                alt="KEYMOMENTEM BACKICON ICON "
                height={44}
                width={44}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToggleOverlay;
