import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import WindowSizeContext from '../../context/WindowSizeContext';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { windowSize } = useContext(WindowSizeContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (windowSize.width > 1041) {
      setIsOpen(false);
    }
  }, [windowSize]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
