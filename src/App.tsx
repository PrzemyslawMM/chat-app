import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from 'pages/main';
import { SearchProvider } from 'utils/contexts/SearchParams';

const App: React.FC<{}> = () => {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </SearchProvider>
  );
};

export default App;
