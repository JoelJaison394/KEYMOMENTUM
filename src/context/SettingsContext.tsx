import React, { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';

interface Settings {
  theme: string;
  fontSize: string;
}

interface SettingsContextProps {
  settings: Settings;
  updateSetting: (key: string, value: string) => void;
  isOverlayVisible: boolean;
  toggleOverlay: () => void;
  difficulty: number;
  timeRange: number;
  setDifficulty: (value: number) => void;
  setTimeRange: (seconds: number) => void;
  isGameRunning: boolean;
  setIsGameRunning: Dispatch<SetStateAction<boolean>>;
  setStartTime: Dispatch<SetStateAction<number | null>>;
  setEndTime: Dispatch<SetStateAction<number | null>>;
  endTime: number | null;
  startTime: number | null;
  setTimeRemaining: Dispatch<SetStateAction<number | null>>;
  timeRemaining: number | null;
  resetGame: (lvl: number) => void;
  userInputArray: string[];
  setUserInputArray: Dispatch<SetStateAction<string[]>>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    fontSize: 'medium',
    // Add more settings as needed
  });
  const [difficulty, setDifficulty] = useState<number>(0);
  const [timeRange, setTimeRange] = useState<number>(30);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(-1);
  const [userInputArray, setUserInputArray] = useState<string[]>([]);
  
  

  const setDifficultyValue = (value: number) => {
    const clampedValue = Math.max(0, Math.min(3, value));
    setDifficulty(clampedValue);
  };

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const updateSetting = (key: string, value: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  const toggleOverlay = () => {
    setIsOverlayVisible((prev) => !prev);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isGameRunning && startTime !== null && endTime !== null) {
      timer = setInterval(() => {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const remainingTimeInSeconds = endTime - currentTimeInSeconds;
        setTimeRemaining(remainingTimeInSeconds >= 0 ? remainingTimeInSeconds : 0);
        if (remainingTimeInSeconds <= 0) {
          setIsGameRunning(false);
          clearInterval(timer);
        }
      }, 1000);
      setTimeRemaining(-1);
    }

    return () => clearInterval(timer);
  }, [isGameRunning, startTime, endTime]);

  const resetGame = (lvl: number) => {
    setDifficulty(lvl);
    setIsGameRunning(false);
    setTimeRange(30);
    setStartTime(null);
    setEndTime(null);
    setTimeRemaining(-1);
    setUserInputArray([]);
  };

  const contextValue: SettingsContextProps = {
    settings,
    updateSetting,
    isOverlayVisible,
    toggleOverlay,
    difficulty,
    timeRange,
    setDifficulty: setDifficultyValue,
    setTimeRange,
    isGameRunning,
    setIsGameRunning,
    setStartTime,
    startTime,
    endTime,
    setEndTime,
    setTimeRemaining,
    timeRemaining,
    resetGame,
    userInputArray, 
   setUserInputArray
  };

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};
