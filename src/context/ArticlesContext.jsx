import React, { createContext } from 'react';
// import useFetchArticles from '../hooks/useFetchArticles';
import useFetchDocsFromColl from '../hooks/useFetchDocsFromColl';

const ArticlesContext = createContext();

export const ArticlesContextProvider = ({ children }) => {
  const { data, isLoading, fetchError } = useFetchDocsFromColl('Articles');

  return (
    <ArticlesContext.Provider
      value={{
        data,
        isLoading,
        fetchError,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContext;
