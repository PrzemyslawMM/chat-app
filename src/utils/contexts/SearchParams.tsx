import React, { createContext, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

const useProviderSettings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    searchParams,
    setSearchParams,
  };
};

type SearchContextData = ReturnType<typeof useProviderSettings>;

const SearchContext = createContext<SearchContextData | null>(null);

type Children = {
  children: React.ReactNode;
};

export const SearchProvider: React.FC<Children> = ({ children }) => {
  const value = useProviderSettings();
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  const search = useContext(SearchContext);

  if (!search) {
    throw new Error('useSearch must be used inside SearchContext');
  }

  return search;
};
