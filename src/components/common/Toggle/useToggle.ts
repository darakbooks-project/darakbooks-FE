import { useCallback, useState } from 'react';

const useToggle = (iniitialState: boolean) => {
  const [state, setState] = useState(iniitialState);
  const toggle = useCallback(() => setState((state: boolean) => !state), []);

  return [state, toggle];
};

export default useToggle;
