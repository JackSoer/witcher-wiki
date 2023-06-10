import React, { createContext, useEffect, useState } from 'react';
import useFetchDocsFromColl from '../hooks/useFetchDocsFromColl';

const ArticlesContext = createContext();

export const ArticlesContextProvider = ({ children }) => {
  const { data, isLoading, fetchError } = useFetchDocsFromColl('Articles');
  const {
    data: suggestedArticlesData,
    fetchError: suggestedArticlesFetchError,
    isLoading: suggestedArticlesIsLoading,
  } = useFetchDocsFromColl('Suggested Articles');
  const [articles, setArticles] = useState([]);
  const [suggestedArticles, setSuggestedArticles] = useState([]);
  const [action, setAction] = useState('add');

  useEffect(() => {
    setArticles(data);
    setSuggestedArticles(suggestedArticlesData);
  }, [data, suggestedArticlesData]);

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        setArticles,
        suggestedArticles,
        setSuggestedArticles,
        suggestedArticlesFetchError,
        suggestedArticlesIsLoading,
        isLoading,
        fetchError,
        action,
        setAction,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContext;
