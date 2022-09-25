import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from 'pages/main';
import { initializeApp } from 'firebase/app';
import Login from 'pages/login';
import AuthRoute from 'components/templates/AuthRoute';
import Register from 'pages/register';

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
  return (
    <Routes>
      <Route
        path="/main"
        element={
          <AuthRoute>
            <Main />
          </AuthRoute>
        }
      />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
