import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    let timeoutId;
    
    const handleOnline = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsOnline(true), 1000); // Debounce
    };

    const handleOffline = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsOnline(false), 1000); // Debounce
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearTimeout(timeoutId);
    };
  }, []);

  return { isOnline, isOffline: !isOnline };
};
