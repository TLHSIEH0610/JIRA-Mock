import { useEffect, useState } from "react";

export const cleanObject = (object) =>
  Object.fromEntries(Object.entries(object).filter(([key, value]) => value));

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const time = setTimeout(() => setDebouncedValue(value), delay);

    //  clearTimeout will run every time when the dependencies change (useEffect re-run)
    return () => clearTimeout(time);
  }, [value, delay]);

  return debouncedValue;
};
