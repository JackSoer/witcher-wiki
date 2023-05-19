import React from 'react';
import useFetchArticlesByCat from '../../hooks/useFetchArticlesByCat';
import './bestiary.scss';

import Articles from '../../components/articles/Articles';

const Bestiary = () => {
  const { articles, isLoading, fetchError } = useFetchArticlesByCat('Bestiary');

  return (
    <div className="bestiary">
      <div className="container">
        <h1 className="bestiary__title">Bestiary</h1>
        <div
          className={
            !isLoading
              ? 'bestiary__content'
              : 'bestiary__content bestiary__content--loading'
          }
        >
          <Articles
            filteredArticles={articles}
            isLoading={isLoading}
            fetchError={fetchError}
          />
        </div>
      </div>
    </div>
  );
};

export default Bestiary;
