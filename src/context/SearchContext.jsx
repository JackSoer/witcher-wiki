import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const { pathname } = useLocation();

  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch('');
  }, [pathname]);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
