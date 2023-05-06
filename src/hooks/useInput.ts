import { ChangeEvent, useCallback, useState } from 'react';

const useInput = (initialValue: string | number) => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return [value, onChange];
};

export default useInput;
