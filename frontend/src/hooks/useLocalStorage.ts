import { useState, useEffect } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
  // Getting stored value
  const saved = localStorage.getItem(key);
  if (saved === null) {
    return defaultValue;
  }

  // Parse
  const initial = JSON.parse(saved) as T;
  return initial;
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // Store value
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
