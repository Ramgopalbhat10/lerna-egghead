import { useMemo, useState } from "react";

const setInitialStore = <T>(key: string, initialValue: T) => {
  if (typeof window === undefined) {
    return initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item
      ? JSON.parse(item)
      : window.localStorage.setItem(key, JSON.stringify(initialValue));
  } catch (error) {
    console.log(error);
    return initialValue;
  }
};

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [storedValue, setStoredValue] = useState<T>(
    setInitialStore(key, initialValue)
  );

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = (key: string) => {
    window.localStorage.removeItem(key);
  };

  const value = useMemo(() => storedValue, [storedValue]);
  return [value, setValue, removeValue] as const;
};
