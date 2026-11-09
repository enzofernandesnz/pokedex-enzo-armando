import { useEffect, useState } from 'react';

export default function useStoredState(key, initialValue, isValid) {
  const [value, setValue] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return isValid(saved) ? saved : initialValue;
    } catch { return initialValue; }
  });

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { /* O aplicativo continua funcionando quando o armazenamento está bloqueado. */ }
  }, [key, value]);

  return [value, setValue];
}
