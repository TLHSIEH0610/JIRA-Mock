export const cleanObject = (object) =>
  Object.fromEntries(Object.entries(object).filter(([key, value]) => value));
