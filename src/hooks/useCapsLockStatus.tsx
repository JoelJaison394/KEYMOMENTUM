import { useEffect, useState } from 'react';

const useCapsLockStatus = () => {
  const [capsLockIsOn, setCapsLockIsOn] = useState<boolean>(false);

  useEffect(() => {
    const handleCapsLockChange = (e: KeyboardEvent) => {
      setCapsLockIsOn(e.getModifierState('CapsLock'));
    };

    window.addEventListener('keydown', handleCapsLockChange);

   
    return () => {
      window.removeEventListener('keydown', handleCapsLockChange);
    };
  }, []); 

  return capsLockIsOn;
};

export default useCapsLockStatus;
