import React from 'react';
import './search.scss';

const Search = () => {
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
        className="search-bar__input"
        placeholder="Geralt from Rivea"
      />
    </div>
  );
};

export default Search;
