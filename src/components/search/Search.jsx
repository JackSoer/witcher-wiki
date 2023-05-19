import React, { useEffect, useState } from 'react';
import './search.scss';
import '../foundArticle/foundArticle.scss';
import useFetchArticles from '../../hooks/useFetchArticles';
import getArticlesByTitle from '../../utils/getArticlesByTitle';

import FoundArticles from '../foundArticles/FoundArticles';
import Error from '../error/Error';

const Search = () => {
  const { articles } = useFetchArticles();
  const [search, setSearch] = useState('');
  const [foundArticles, setFoundArticles] = useState([]);

  useEffect(() => {
    const filteredArticles = getArticlesByTitle(articles, search);

    setFoundArticles(filteredArticles);
  }, [search]);

  const getInputClases = () => {
    if (foundArticles.length && search) {
      return 'search-bar__input search-bar__input--found search-bar__input--search';
    } else if (foundArticles.length) {
      return 'search-bar__input search-bar__input--found';
    } else if (search) {
      return 'search-bar__input search-bar__input--search';
    } else {
      return 'search-bar__input';
    }
  };

  return (
    <div className="nav__search-bar search-bar">
      <button className="search-bar__search-btn">
        <img
          src="./assets/icons/search.svg"
          alt="Something went wrong"
          className="search-bar__search-btn-icon"
        />
      </button>
      <input
        type="text"
        className={getInputClases()}
        placeholder="Geralt"
        onChange={(e) => setSearch(e.target.value)}
      />
      {foundArticles.length > 0 && search && (
        <FoundArticles foundArticles={foundArticles} />
      )}
    </div>
  );
};

export default Search;
