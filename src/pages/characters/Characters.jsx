import React, { useState, useEffect, useContext } from 'react';
import FilterContext from '../../context/FilterContext';
import useFetchArticlesByCat from '../../hooks/useFetchArticlesByCat';
import getArticlesByFaction from '../../utils/getArticlesByFaction';
import './characters.scss';

import FactionsFilter from '../../components/factionsFilter/FactionsFilter';
import ArticleCard from '../../components/articleCard/ArticleCard';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const Characters = () => {
  const { articles, isLoading, fetchError } =
    useFetchArticlesByCat('Characters');
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
    <div className="characters">
      <div className="container">
        <h1 className="characters__title">Characters</h1>
        <div
          className={
            !isLoading
              ? 'characters__content'
              : 'characters__content characters__content--loading'
          }
        >
          <FactionsFilter />
          <div
            className={
              !isLoading && !fetchError
                ? `characters__articles`
                : 'characters__articles--padding-top'
            }
          >
            {!isLoading &&
              !fetchError &&
              filteredArticles.map((article) => (
                <ArticleCard
                  title={article.title}
                  image={article.mainImage}
                  key={article.id}
                />
              ))}
            {isLoading && !fetchError && <Loading />}
            {fetchError && !isLoading && <Error errorText={fetchError} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
