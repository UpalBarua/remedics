import React, { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';

const SpinnerContext = createContext();
export const useSpinner = () => useContext(SpinnerContext);

export const SpinnerProvider = ({ children }) => {
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
  const value = { isSpinnerVisible, setIsSpinnerVisible };

  return (
    <SpinnerContext.Provider value={value}>{children}</SpinnerContext.Provider>
  );
};
