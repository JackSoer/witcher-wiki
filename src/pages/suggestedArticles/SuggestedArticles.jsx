import React, { useState, useEffect, useContext } from 'react';
import './suggestedArticles.scss';

import Articles from '../../components/articles/Articles';
import ArticlesContext from '../../context/ArticlesContext';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';

const SuggestedArticles = () => {
  const {
    suggestedArticles,
    setSuggestedArticles,
    suggestedArticlesFetchError: fetchError,
    suggestedArticlesIsLoading: isLoading,
    action,
    setAction,
  } = useContext(ArticlesContext);
  const { data: suggestedArticlesData } =
    useFetchDocsFromColl('Suggested Articles');

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setSuggestedArticles(suggestedArticlesData);
  }, [suggestedArticlesData]);

  const handleAction = (e) => {
    setAction(e.target.id);
  };

  useEffect(() => {
    const filteredArticles = suggestedArticles.filter(
      (article) => article.action === action
    );
    setArticles(filteredArticles);
  }, [suggestedArticles, action]);

  return (
    <div className="suggested-articles">
      <div className="container">
        <h1 className="suggested-articles__title">Suggested Articles</h1>
        <div className="suggested-articles__action-btns">
          <button
            className={
              action === 'add'
                ? `suggested-articles__action-btns-item--active`
                : 'suggested-articles__action-btns-item'
            }
            id="add"
            onClick={handleAction}
          >
            Added
          </button>
          <button
            className={
              action === 'edit'
                ? `suggested-articles__action-btns-item--active`
                : 'suggested-articles__action-btns-item'
            }
            id="edit"
            onClick={handleAction}
          >
            Edited
          </button>
        </div>
        {articles.length > 0 ? (
          <Articles
            filteredArticles={articles}
            suggestedArticles={true}
            fetchError={fetchError}
            isLoading={isLoading}
          />
        ) : (
          <p className="suggested-articles__warning">
            You don't have suggested articles in this category...
          </p>
        )}
      </div>
    </div>
  );
};

export default SuggestedArticles;
