import React, { createContext } from 'react';
import useFetchArticles from '../hooks/useFetchArticles';

const ArticlesContext = createContext();

export const ArticlesContextProvider = ({ children }) => {
  const { articles, isLoading, fetchError } = useFetchArticles();

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        isLoading,
        fetchError,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContext;
