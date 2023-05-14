import React from 'react';
import useFetchArticlesByCat from '../../hooks/useFetchArticlesByCat';
import './characters.scss';

import FactionsFilter from '../../components/factionsFilter/FactionsFilter';
import ArticleCard from '../../components/articleCard/ArticleCard';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const Characters = () => {
  const { articles, isLoading, fetchError } =
    useFetchArticlesByCat('Characters');

  return (
    <div className="characters">
      <div className="container">
        <h1 className="characters__title">Characters</h1>
        <div className="characters__content">
          <FactionsFilter />
          <div className="characters__articles">
            {!isLoading &&
              !fetchError &&
              articles.map((article) => (
                <ArticleCard title={article.title} image={article.mainImage} />
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
