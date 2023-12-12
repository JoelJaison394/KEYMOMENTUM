import React, { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import ToggleOverlay from "./components/ToogleOverlay";
import TypingGame from "./components/TypeBox/TypeSpeedBox";
import { useSettings } from "./context/SettingsContext";
import { useStats } from "./context/StatsContext";
import CustomStats from "./components/Stats";
import Footer from "./components/Footer";

const MobileComponent: React.FC = () => {
  return (
    <div className="fixed w-full inset-0 flex items-center justify-center bg-opacity-50 bg-blur backdrop-filter backdrop-blur-md">
      <div className="bg-white w-4/6 p-8 rounded-lg space-y-4">
        <h3>Please use a desktop</h3>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const { timeRemaining } = useSettings();
  const { wpm, accuracy, correctCharsTyped } = useStats();
  const [isLoading, setIsLoading] = useState(true);
  const [statsOverlay, setStatsOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    loadData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      setStatsOverlay(true);
    } else if (timeRemaining === -1) {
      setStatsOverlay(false);
    }
  }, [timeRemaining]);

  const hiddenClass = isMobile ? "hidden" : "";

  return (
    <div className={`app bg-[#0E0E0E] ${hiddenClass}`}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Navbar />
          <ToggleOverlay />
          <TypingGame />
          <Footer />   
          {isMobile && <MobileComponent />}
          {statsOverlay && (
            <CustomStats
              status="finished"
              wpm={wpm}
              countDown={timeRemaining ?? 0}
              statsCharCount={{
                correct: correctCharsTyped,
                incorrect: 0,
                missing: 0,
                accuracy: accuracy,
              }}
              rawKeyStrokes={0}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
