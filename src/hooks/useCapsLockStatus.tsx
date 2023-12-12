import { useEffect, useState } from 'react';

const useCapsLockStatus = () => {
  const [capsLockIsOn, setCapsLockIsOn] = useState<boolean>(false);

  useEffect(() => {
    const handleCapsLockChange = (e: KeyboardEvent) => {
      setCapsLockIsOn(e.getModifierState('CapsLock'));
    };

    // Add event listener when the component mounts
    window.addEventListener('keydown', handleCapsLockChange);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleCapsLockChange);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return capsLockIsOn;
};

export default useCapsLockStatus;
