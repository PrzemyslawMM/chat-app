import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from 'pages/main';
import { initializeApp } from 'firebase/app';
import Login from 'pages/login';
import AuthRoute from 'components/templates/AuthRoute';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

const App: React.FC<{}> = () => {
  const [myID, setMyID] = useState('');

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute>
            <Main myID={myID} />
          </AuthRoute>
        }
      />

      <Route path="/login" element={<Login setID={setMyID} />} />
    </Routes>
  );
};

export default App;
