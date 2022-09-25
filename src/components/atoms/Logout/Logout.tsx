import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const handleOnClick = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setError(true);
      });
  };
  return (
    <>
      {error ? <p style={{ color: 'red' }}>Somethings wrong</p> : null}
      <p>
        Login as:{' '}
        <span style={{ fontWeight: 800 }}>{auth.currentUser?.displayName}</span>
      </p>
      <button type="button" onClick={handleOnClick}>
        Click to log out
      </button>
    </>
  );
};

export default Logout;
