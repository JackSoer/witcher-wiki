import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleWindowSize = () => {
      const windowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      setWindowSize(windowSize);
    };

    handleWindowSize();

    window.addEventListener('resize', handleWindowSize);

    return () => window.removeEventListener('resize', handleWindowSize);
  }, []);

  return windowSize;
};

export default useWindowSize;
