import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
