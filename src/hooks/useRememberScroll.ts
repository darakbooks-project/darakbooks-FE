import { useState } from 'react';

const useRememberScroll = (key: string) => {
  const [currentScroll, setCurrentScroll] = useState<number>(() => {
    const saveScroll = localStorage.getItem(key);
    return saveScroll ? JSON.parse(saveScroll) : 0;
  });

  const setScroll = () => {
    const currentY = window.scrollY;
    setCurrentScroll(currentY);
    localStorage.setItem(key, JSON.stringify(currentY));
  };

  const resetScroll = () => {
    setCurrentScroll(0);
    localStorage.removeItem(key);
  };
  return { currentScroll, setScroll, resetScroll };
};

export default useRememberScroll;
