import React, { useState, useEffect, useContext } from 'react';
import './suggestedArticles.scss';

import Articles from '../../components/articles/Articles';
import ArticlesContext from '../../context/ArticlesContext';
import useFetchDocsFromColl from '../../hooks/useFetchDocsFromColl';

const SuggestedArticles = () => {
  const { suggestedArticles, setSuggestedArticles, action, setAction } =
    useContext(ArticlesContext);
  const {
    data: suggestedArticlesData,
    fetchError,
    isLoading,
  } = useFetchDocsFromColl('Suggested Articles');

  const [articles, setArticles] = useState([]);
  const [addedArticlesCount, setAddedArticlesCount] = useState(0);
  const [editedArticlesCount, setEditedArticlesCount] = useState(0);

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
    const editedArticlesCount = suggestedArticles.filter(
      (article) => article.action === 'edit'
    ).length;
    const addedArticlesCount = suggestedArticles.filter(
      (article) => article.action === 'add'
    ).length;

    setArticles(filteredArticles);
    setAddedArticlesCount(addedArticlesCount);
    setEditedArticlesCount(editedArticlesCount);
  }, [suggestedArticles, action]);

  return (
    <div className="suggested-articles">
      <div className="container">
        <h1 className="suggested-articles__title">Suggested Articles</h1>
        <div className="suggested-articles__action-btns">
          <button
            className={
              action === 'add'
                ? `suggested-articles__action-btns-item  suggested-articles__action-btns-item--active`
                : 'suggested-articles__action-btns-item'
            }
            id="add"
            onClick={handleAction}
          >
            Added
            <div className="suggested-articles__action-btns-count">
              {addedArticlesCount}
            </div>
          </button>
          <button
            className={
              action === 'edit'
                ? `suggested-articles__action-btns-item suggested-articles__action-btns-item--active`
                : 'suggested-articles__action-btns-item'
            }
            id="edit"
            onClick={handleAction}
          >
            Edited
            <div className="suggested-articles__action-btns-count">
              {editedArticlesCount}
            </div>
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
