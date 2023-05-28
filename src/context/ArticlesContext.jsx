import React, { createContext, useEffect, useState } from 'react';
import useFetchDocsFromColl from '../hooks/useFetchDocsFromColl';

const ArticlesContext = createContext();

export const ArticlesContextProvider = ({ children }) => {
  const { data, isLoading, fetchError } = useFetchDocsFromColl('Articles');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(data);
  }, [data]);

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        setArticles,
        isLoading,
        fetchError,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContext;
