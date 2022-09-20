import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type LoginProps = {
  setID: React.Dispatch<React.SetStateAction<string>>;
};

const Login: React.FC<LoginProps> = ({ setID }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        setID(response.user.uid);
        navigate('/');
      })
      .catch((error) => {
        setAuthing(false);
      });
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => signInWithGoogle()}
        disabled={authing}
      >
        Sign in with google
      </button>
    </div>
  );
};

export default Login;
