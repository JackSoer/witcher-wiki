import React, { useEffect, useState, useContext, useRef } from 'react';
import SearchContext from '../../context/SearchContext';
import './search.scss';
import '../foundArticle/foundArticle.scss';
import getArticlesByTitle from '../../utils/getArticlesByTitle';

import FoundArticles from '../foundArticles/FoundArticles';
import ArticlesContext from '../../context/ArticlesContext';

const Search = () => {
  const { data } = useContext(ArticlesContext);
  const { search, setSearch } = useContext(SearchContext);

  const [foundArticles, setFoundArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const filteredArticles = getArticlesByTitle(data, search);

    setFoundArticles(filteredArticles);
  }, [data, search]);

  const getInputClasses = () => {
    if (foundArticles.length && search && isOpen) {
      return 'search-bar__input search-bar__input--found search-bar__input--search';
    } else if (foundArticles.length && isOpen) {
      return 'search-bar__input search-bar__input--found';
    } else if (search && isOpen) {
      return 'search-bar__input search-bar__input--search';
    } else {
      return 'search-bar__input';
    }
  };

  return (
    <div className="nav__search-bar search-bar" ref={searchRef}>
      <button className="search-bar__search-btn">
        <img
          src="./assets/icons/search.svg"
          alt="Something went wrong"
          className="search-bar__search-btn-icon"
        />
      </button>
      <input
        type="text"
        className={getInputClasses()}
        placeholder="Geralt"
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
        value={search}
      />
      {foundArticles.length > 0 && search && isOpen && (
        <FoundArticles foundArticles={foundArticles} />
      )}
    </div>
  );
};

export default Search;
