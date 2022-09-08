import { useState, useEffect } from "react";

const originalSetItem = localStorage.setItem;
localStorage.setItem = function () {
  const event = new Event("storageChange");
  window.dispatchEvent(event);
  originalSetItem.apply(this, arguments);
};

const originalRemoveItem = localStorage.removeItem;
localStorage.removeItem = function () {
  const event = new Event("storageChange");
  document.dispatchEvent(event);
  originalRemoveItem.apply(this, arguments);
};

function useLocalStorage(key, initialValue) {
  const getItem = () => {
    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) : initialValue;
  };

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      return getItem();
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    const handleChangeStorage = () => {
      setTimeout(() => {
        const value = getItem();
        console.log("updated storage", value);
        setStoredValue(value);
      }, 50);
    };

    window.addEventListener("storageChange", handleChangeStorage, false);

    return () =>
      window.removeEventListener("storageChange", handleChangeStorage);
  }, []);

  const setValue = (value) => {
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
  return [storedValue, setValue];
}

export default useLocalStorage;
