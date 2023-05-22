import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

import Search from '../search/Search';
import { SearchContextProvider } from '../../context/SearchContext';

const Nav = () => {
  return (
    <nav className="header__nav nav">
      <SearchContextProvider>
        <Search />
      </SearchContextProvider>
      <ul className="nav__list">
        <li className="nav__list-item">
          <Link to="/characters">Characters</Link>
        </li>
        <li className="nav__list-item">
          <Link to="/locations">Locations</Link>
        </li>
        <li className="nav__list-item">
          <Link to="/bestiary">Bestiary</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
