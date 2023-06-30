import React, { useState, useContext, useEffect } from 'react';
import './nav.scss';

import Search from '../search/Search';
import { SearchContextProvider } from '../../context/SearchContext';
import Cats from '../cats/Cats';
import WindowSizeContext from '../../context/WindowSizeContext';

const Nav = () => {
  const [inputIsOpen, setInputIsOpen] = useState(false);

  const { windowSize } = useContext(WindowSizeContext);

  useEffect(() => {
    if (inputIsOpen && windowSize.width <= 720) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [inputIsOpen]);

  return (
    <nav
      className={
        inputIsOpen && windowSize.width <= 720
          ? 'nav--active header__nav nav'
          : 'header__nav nav'
      }
    >
      <SearchContextProvider>
        <Search inputIsOpen={inputIsOpen} setInputIsOpen={setInputIsOpen} />
      </SearchContextProvider>
      <div className="nav__categories">
        <p className="nav__categories-title">Categories</p>
        <Cats />
      </div>
    </nav>
  );
};

export default Nav;
