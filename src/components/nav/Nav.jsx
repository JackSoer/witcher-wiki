import React, { useState, useContext, useEffect, useRef } from 'react';
import './nav.scss';

import Search from '../search/Search';
import Cats from '../cats/Cats';
import WindowSizeContext from '../../context/WindowSizeContext';
import { useLocation } from 'react-router-dom';

const Nav = () => {
  const [inputIsOpen, setInputIsOpen] = useState(false);
  const [catsIsOpen, setCatsIsOpen] = useState(false);

  const catsRef = useRef(null);

  const { windowSize } = useContext(WindowSizeContext);

  const { pathname } = useLocation();

  useEffect(() => {
    const handleClose = (e) => {
      if (!catsRef.current.contains(e.target)) {
        setCatsIsOpen(false);
      }
    };

    document.addEventListener('click', handleClose);

    return () => document.removeEventListener('click', handleClose);
  }, []);

  useEffect(() => {
    if (inputIsOpen && windowSize.width <= 720) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [inputIsOpen]);

  useEffect(() => {
    if (windowSize.width <= 720) {
      setInputIsOpen(false);
    }
  }, [pathname]);

  return (
    <nav
      className={
        inputIsOpen && windowSize.width <= 720
          ? 'nav--active header__nav nav'
          : 'header__nav nav'
      }
    >
      <Search inputIsOpen={inputIsOpen} setInputIsOpen={setInputIsOpen} />

      <div
        className="nav__categories"
        ref={catsRef}
        onClick={() => setCatsIsOpen((prev) => !prev)}
      >
        <p
          className={
            catsIsOpen
              ? 'nav__categories-title nav__categories-title--open'
              : 'nav__categories-title'
          }
        >
          Categories
        </p>
        <Cats catsIsOpen={catsIsOpen} />
      </div>
    </nav>
  );
};

export default Nav;
