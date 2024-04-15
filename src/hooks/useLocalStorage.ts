export const useLocalStorage = () => {
  const getValue = (key: string, defaultValue: unknown) => {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue ? defaultValue : null;
  };

  const setValue = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [getValue, setValue];
};
