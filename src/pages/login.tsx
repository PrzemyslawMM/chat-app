import React, { useRef, useState, useMemo, useEffect } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type LoginProps = {};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Login: React.FC<LoginProps> = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const AuthCheck = useMemo(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/main');
      }
    });
  }, [auth]);

  useEffect(() => {
    AuthCheck();
  }, [auth]);

  // const signInWithGoogle = async () => {
  //   setAuthing(true);

  //   signInWithPopup(auth, new GoogleAuthProvider())
  //     .then((response) => {
  //       navigate('/main');
  //     })
  //     .catch(() => {
  //       setAuthing(false);
  //     });
  // };

  const signIn = async () => {
    signInWithEmailAndPassword(
      auth,
      email.current?.value as string,
      password.current?.value as string
    )
      .then(() => {
        navigate('/main');
      })
      .catch(() => {
        setAuthing(false);
      });
  };

  return (
    <Wrapper>
      <input type="email" ref={email} placeholder="Your email" />
      <input type="password" ref={password} placeholder="Your password" />
      <button type="button" disabled={authing} onClick={() => signIn()}>
        Sign in
      </button>
      <p>
        Don&apos;t have account <Link to="/register">create here</Link>
      </p>
      {/* <button
        type="button"
        onClick={() => signInWithGoogle()}
        disabled={authing}
      >
        Sign in with google
      </button> */}
    </Wrapper>
  );
};

export default Login;
