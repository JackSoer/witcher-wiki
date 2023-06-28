import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import WindowSizeContext from '../../context/WindowSizeContext';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Sidebar from '../../components/sidebar/Sidebar';

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { windowSize } = useContext(WindowSizeContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (windowSize.width > 970) {
      setIsOpen(false);
    }
  }, [windowSize]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
