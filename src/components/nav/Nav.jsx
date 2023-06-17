import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

import Search from '../search/Search';
import { SearchContextProvider } from '../../context/SearchContext';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';

const Nav = () => {
  const { data } = useFetchDocsFromColl('Categories');

  return (
    <nav className="header__nav nav">
      <SearchContextProvider>
        <Search />
      </SearchContextProvider>
      <div className="nav__categories">
        <p className="nav__categories-title">Categories</p>
        <ul className="nav__list">
          {data.map((cat) => (
            <li className="nav__list-item" key={cat.id}>
              <Link to={`/${cat.title}`}>{cat.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
