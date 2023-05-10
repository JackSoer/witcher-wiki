import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

import Search from '../search/Search';

const Nav = () => {
  return (
    <nav className="header__nav nav">
      <Search />
      <ul className="nav__list">
        <li className="nav__list-item">
          <Link to="/">Characters</Link>
        </li>
        <li className="nav__list-item">
          <Link to="/">Locations</Link>
        </li>
        <li className="nav__list-item">
          <Link to="/">Bestiary</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
