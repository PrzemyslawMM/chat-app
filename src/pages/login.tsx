import React, { useRef, useState, useMemo, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Wrapper } from './login.style';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [error, setError] = useState('');
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

  const signIn = async () => {
    signInWithEmailAndPassword(
      auth,
      email.current?.querySelector('input')?.value as string,
      password.current?.querySelector('input')?.value as string
    )
      .then(() => {
        navigate('/main');
      })
      .catch((err) => {
        setError(() => {
          if (err.code === 'auth/invalid-email') {
            return 'Invalid email';
          }

          if (err.code === 'auth/user-not-found') {
            return 'Invalid email';
          }

          if (err.code === 'auth/wrong-password') {
            return 'Wrong password';
          }

          return 'Unknown error';
        });
        setAuthing(false);
      });
  };

  return (
    <Wrapper autoComplete="off">
      <TextField type="email" ref={email} label="Your email" margin="normal" />
      <TextField
        type="password"
        ref={password}
        label="Your password"
        margin="normal"
      />
      <p style={{ color: 'red' }}>{error}</p>
      <Button type="button" disabled={authing} onClick={() => signIn()}>
        Sign in
      </Button>
      <p>
        Don&apos;t have account <Link to="/register">create here</Link>
      </p>
    </Wrapper>
  );
};

export default Login;
