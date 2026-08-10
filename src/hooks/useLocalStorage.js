import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // 1. قراءة البيانات المبدئية من LocalStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading LocalStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 2. تحديث LocalStorage تلقائياً عند تغيير المتغير
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting LocalStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}