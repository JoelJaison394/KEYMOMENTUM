import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Settings {
  theme: string;
  fontSize: string;
  // Add more settings as needed
}

interface SettingsContextProps {
  settings: Settings;
  updateSetting: (key: string, value: string) => void;
  isOverlayVisible: boolean;
  toggleOverlay: () => void;
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

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const updateSetting = (key: string, value: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  const toggleOverlay = () => {
    setIsOverlayVisible((prev) => !prev);
    console.log('toggleOverlay', isOverlayVisible);
  };

  const contextValue: SettingsContextProps = {
    settings,
    updateSetting,
    isOverlayVisible,
    toggleOverlay,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
