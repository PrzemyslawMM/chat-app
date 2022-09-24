import React, { useEffect, useState, useMemo } from 'react';
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

  const AuthCheck = useMemo(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        navigate('/');
      }
    });
  }, [auth]);

  useEffect(() => {
    AuthCheck();
  }, [auth]);

  if (loading) return <p>Loading</p>;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default AuthRoute;
