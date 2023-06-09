import React, { createContext, useState, useEffect } from 'react';

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [faction, setFaction] = useState('');

  return (
    <FilterContext.Provider
      value={{
        faction,
        setFaction,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
