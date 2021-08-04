import { useEffect, useState } from "react";

export const useSessionStorage = <T>(key: string, initialValue = "") => {
  const [state, setState] = useState<T | string>(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
