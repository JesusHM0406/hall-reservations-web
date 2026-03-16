import { useSyncExternalStore } from 'react';

const useMediaQuery = (query: string) => {
  const subscribe = (onStoreChange: () => void) => {
    if (typeof window === 'undefined') return () => {};

    const mediaQueryList = window.matchMedia(query);
    const handleChange = () => onStoreChange();

    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  };

  const getSnapshot = () =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false;

  const getServerSnapshot = () => false;

  const matches = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return matches;
};

export { useMediaQuery };