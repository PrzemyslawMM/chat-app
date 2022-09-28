import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { LogoutWrapper, NameDisplay, Wrapper } from './logout.style';

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
    <Wrapper>
      {error ? <p style={{ color: 'red' }}>Somethings wrong</p> : null}
      <LogoutWrapper>
        Login as:
        <NameDisplay>{auth.currentUser?.displayName}</NameDisplay>
      </LogoutWrapper>
      <Button type="button" onClick={handleOnClick}>
        Click to log out
      </Button>
    </Wrapper>
  );
};

export default Logout;
