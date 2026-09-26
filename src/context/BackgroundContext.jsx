import React, { createContext, useContext, useState } from 'react';

const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [bgType, setBgType] = useState('default');
  const [bgIntensity, setBgIntensity] = useState('medium');

  return (
    <BackgroundContext.Provider value={{ bgType, setBgType, bgIntensity, setBgIntensity }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext);
