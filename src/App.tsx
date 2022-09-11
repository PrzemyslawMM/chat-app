import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from 'pages/main';

const App: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default App;
