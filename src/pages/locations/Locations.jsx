import React, { useState, useEffect, useContext } from 'react';
import FilterContext from '../../context/FilterContext';
import useFetchArticlesByCat from '../../hooks/useFetchArticlesByCat';
import getArticlesByFaction from '../../utils/getArticlesByFaction';
import './locations.scss';

import Articles from '../../components/articles/Articles';
import FactionsFilter from '../../components/factionsFilter/FactionsFilter';

const Locations = () => {
  const { articles, isLoading, fetchError } =
    useFetchArticlesByCat('Locations');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const { faction } = useContext(FilterContext);

  useEffect(() => {
    if (!faction) {
      setFilteredArticles(articles);
    } else {
      const newArticles = getArticlesByFaction(articles, faction);

      setFilteredArticles(newArticles);
    }
  }, [articles, faction]);

  return (
    <div className="locations">
      <div className="container">
        <h1 className="locations__title">Locations</h1>
        <div
          className={
            !isLoading
              ? 'locations__content'
              : 'locations__content locations__content--loading'
          }
        >
          <FactionsFilter />
          <Articles
            filteredArticles={filteredArticles}
            isLoading={isLoading}
            fetchError={fetchError}
          />
        </div>
      </div>
    </div>
  );
};

export default Locations;
