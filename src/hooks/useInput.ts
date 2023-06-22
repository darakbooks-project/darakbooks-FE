import { ChangeEvent, useCallback, useState } from 'react';

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);
  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, onChange, reset] as const;
};

export default useInput;
