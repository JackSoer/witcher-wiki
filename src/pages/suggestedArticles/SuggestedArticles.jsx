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
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    setSuggestedArticles(suggestedArticlesData);
  }, [suggestedArticlesData]);

  const handleAction = (actionType) => {
    setAction(actionType);
  };

  useEffect(() => {
    const filteredArticles = suggestedArticles.filter(
      (article) => article.action === action
    );

    if (!filteredArticles.length < 1) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }

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
            onClick={() => handleAction('add')}
          >
            Added
            {addedArticlesCount > 0 && (
              <div className="suggested-articles__action-btns-count">
                {addedArticlesCount}
              </div>
            )}
          </button>
          <button
            className={
              action === 'edit'
                ? `suggested-articles__action-btns-item suggested-articles__action-btns-item--active`
                : 'suggested-articles__action-btns-item'
            }
            onClick={() => handleAction('edit')}
          >
            Edited
            {editedArticlesCount > 0 && (
              <div className="suggested-articles__action-btns-count">
                {editedArticlesCount}
              </div>
            )}
          </button>
        </div>
        {!empty ? (
          <p className="suggested-articles__warning">
            You don't have suggested articles in this category...
          </p>
        ) : (
          <Articles
            filteredArticles={articles}
            suggestedArticles={true}
            fetchError={fetchError}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default SuggestedArticles;
