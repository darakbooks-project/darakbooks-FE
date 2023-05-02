import { useCallback, useState } from 'react';

interface useToggleHookType {
  isCheck: boolean;
  toggle: () => void;
}

const useToggle = (iniitialState: boolean): useToggleHookType => {
  const [isCheck, setIsCheck] = useState(iniitialState);
  const toggle = useCallback(() => setIsCheck((isCheck) => !isCheck), []);

  return { isCheck, toggle };
};

export default useToggle;
