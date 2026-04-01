import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delayMs: number) => {
  const [debounceValue, setDebounceValue] = useState<string>(value);

  useEffect(()=> {
    const timeout = setTimeout(()=> {
      setDebounceValue(value);
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debounceValue;
};
