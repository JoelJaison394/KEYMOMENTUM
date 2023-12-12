import React, { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import ToggleOverlay from "./components/ToogleOverlay";
import TypingGame from "./components/TypeBox/TypeSpeedBox";


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    loadData();
  }, []);

  return (
    <div className="app bg-[#0E0E0E]">{isLoading ? <Preloader /> : <>
    <Navbar/>
    <ToggleOverlay/>
    {
      <TypingGame/>
    }
    </>}</div>
  );
};

export default App;
