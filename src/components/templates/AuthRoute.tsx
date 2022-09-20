import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type AuthRouteProps = {
  // eslint-disable-next-line no-undef
  children: JSX.Element;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false);
    } else {
      navigate('/login');
    }
  });

  useEffect(() => {
    AuthCheck();
  }, [auth]);

  if (loading) return <p>Loading</p>;

  return <div>{children}</div>;
};

export default AuthRoute;
