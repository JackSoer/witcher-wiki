import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [inputIsOpen, setInputIsOpen] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        isOpen,
        setIsOpen,
        inputIsOpen,
        setInputIsOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
