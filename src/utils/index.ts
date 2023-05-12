import { useEffect, useState } from "react";

export const cleanObject = (object: object) =>
  Object.fromEntries(Object.entries(object).filter(([key, value]) => value));

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const time = setTimeout(() => setDebouncedValue(value), delay);

    //  clearTimeout will run every time when the dependencies change (useEffect re-run)
    return () => clearTimeout(time);
  }, [value, delay]);

  return debouncedValue;
};

export const useDocumentTitle = (title: string, useDocumentTitle = true) => {
  const prevTitle = document.title;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(
    () => () => {
      if (!useDocumentTitle) document.title = prevTitle;
    },
    []
  );
};
