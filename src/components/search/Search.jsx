import React, { useEffect, useState, useContext, useRef } from 'react';
import SearchContext from '../../context/SearchContext';
import './search.scss';
import '../foundArticle/foundArticle.scss';
import getArticlesByTitle from '../../utils/getArticlesByTitle';

import FoundArticles from '../foundArticles/FoundArticles';
import ArticlesContext from '../../context/ArticlesContext';
import WindowSizeContext from '../../context/WindowSizeContext';

const Search = ({ inputIsOpen, setInputIsOpen }) => {
  const { articles } = useContext(ArticlesContext);
  const { search, setSearch } = useContext(SearchContext);
  const { windowSize } = useContext(WindowSizeContext);

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
    const filteredArticles = getArticlesByTitle(articles, search);

    setFoundArticles(filteredArticles);
  }, [articles, search]);

  useEffect(() => {
    if (windowSize.width > 720) {
      setInputIsOpen(true);
    } else {
      setInputIsOpen(false);
    }
  }, [windowSize.width]);

  const getInputClasses = () => {
    if (foundArticles.length && search && isOpen && inputIsOpen) {
      return 'search-bar__input search-bar__input--found search-bar__input--search search-bar__input--open';
    } else if (foundArticles.length && isOpen && inputIsOpen) {
      return 'search-bar__input search-bar__input--found search-bar__input--open';
    } else if (search && isOpen && inputIsOpen) {
      return 'search-bar__input search-bar__input--search search-bar__input--open';
    } else if (inputIsOpen) {
      return 'search-bar__input search-bar__input--open';
    } else {
      return 'search-bar__input';
    }
  };

  const handleClick = () => {
    if (windowSize.width > 720) {
      return;
    }

    setInputIsOpen((prev) => !prev);
    setSearch('');
  };

  return (
    <div className="nav__search-bar search-bar" ref={searchRef}>
      <button className="search-bar__search-btn" onClick={handleClick}>
        {inputIsOpen && windowSize.width <= 720 ? (
          <svg
            fill="white"
            viewBox="0 0 24 24"
            className="search-bar__search-btn-icon search-bar__search-btn-icon--active"
          >
            <polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 50 50"
            fill="white"
            className="search-bar__search-btn-icon"
          >
            <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
          </svg>
        )}
      </button>
      <input
        disabled={inputIsOpen ? false : true}
        type="text"
        className={getInputClasses()}
        placeholder="Geralt"
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
        value={search}
      />
      {foundArticles.length > 0 && search && isOpen && inputIsOpen && (
        <FoundArticles foundArticles={foundArticles} />
      )}
    </div>
  );
};

export default Search;
