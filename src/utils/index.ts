import { useEffect, useState, useRef } from "react";

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

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const prevTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(
    () => () => {
      if (!keepOnUnmount) document.title = prevTitle;
    },
    [keepOnUnmount, prevTitle]
  );
};

export const resetRoute = () => (window.location.href = window.location.origin);

export const subset = (obj: object, keys: string[]) => {
  const filterEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key)
  );
  return Object.fromEntries(filterEntries);
};
