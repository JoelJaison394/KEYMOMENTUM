
import React, { createContext, useContext, useState } from 'react';

interface StatsContextProps {
  accuracy: number;
  wpm: number;
  correctCharsTyped: number;
  updateAccuracy: (accuracy: number) => void;
  updateWPM: (wpm: number) => void;
  updateCorrectCharsTyped: (count: number) => void;
}

const StatsContext = createContext<StatsContextProps | undefined>(undefined);

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useAccuracy must be used within an AccuracyProvider');
  }
  return context;
};

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accuracy, setAccuracy] = useState<number>(0);
  const [wpm, setWPM] = useState<number>(0);
  const [correctCharsTyped, setCorrectCharsTyped] = useState<number>(0);

  const updateAccuracy = (newAccuracy: number) => {
    setAccuracy(newAccuracy);
  };

  const updateWPM = (newWPM: number) => {
    setWPM(newWPM);
  };

  const updateCorrectCharsTyped = (count: number) => {
    setCorrectCharsTyped(count);
  };

  const contextValue: StatsContextProps = {
    accuracy,
    wpm,
    correctCharsTyped,
    updateAccuracy,
    updateWPM,
    updateCorrectCharsTyped,
  };

  return (
    <StatsContext.Provider value={contextValue}>
      {children}
    </StatsContext.Provider>
  );
};
