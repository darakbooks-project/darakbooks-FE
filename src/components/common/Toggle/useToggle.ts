import { useCallback, useState } from 'react';

interface useToggleHookType {
  isCheck: boolean;
  toggle: () => void;
}

const useToggle = (initialState: boolean): useToggleHookType => {
  const [isCheck, setIsCheck] = useState(initialState);
  const toggle = useCallback(() => setIsCheck((isCheck) => !isCheck), []);

  return { isCheck, toggle };
};

export default useToggle;
