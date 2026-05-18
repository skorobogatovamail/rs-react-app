import { useCallback } from 'react';

export const SEARCH_VALUE_KEY = 'searchValue';

export const useLocalStorage = (key: string) => {
  const read = useCallback((): string => {
    return localStorage.getItem(key) ?? '';
  }, [key]);

  const write = useCallback(
    (value: string) => {
      localStorage.setItem(key, value);
    },
    [key]
  );

  const remove = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return { read, write, remove };
};
