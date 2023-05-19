import React from 'react';
import './articles.scss';

import ArticleCard from '../../components/articleCard/ArticleCard';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const Articles = ({ filteredArticles, isLoading, fetchError }) => {
  return (
    <div
      className={
        !isLoading && !fetchError ? `articles` : 'articles--padding-top'
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
  );
};

export default Articles;
