import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch debe usarse dentro de SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      isSearching,
      setIsSearching,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
};