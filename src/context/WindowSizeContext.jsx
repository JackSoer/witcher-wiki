import React, { createContext } from 'react';
import useWindowSize from '../hooks/useWindowSize';

const WindowSizeContext = createContext();

export const WindowSizeProvider = ({ children }) => {
  const windowSize = useWindowSize();

  return (
    <WindowSizeContext.Provider
      value={{
        windowSize,
      }}
    >
      {children}
    </WindowSizeContext.Provider>
  );
};

export default WindowSizeContext;
