import React from 'react';
import './nav.scss';

import Search from '../search/Search';
import { SearchContextProvider } from '../../context/SearchContext';
import Cats from '../cats/Cats';

const Nav = () => {
  return (
    <nav className="header__nav nav">
      <SearchContextProvider>
        <Search />
      </SearchContextProvider>
      <div className="nav__categories">
        <p className="nav__categories-title">Categories</p>
        <Cats />
      </div>
    </nav>
  );
};

export default Nav;
