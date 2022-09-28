import React, { useRef, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Wrapper } from './register.style';

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const surname = useRef<HTMLInputElement>(null);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getFirestore();

  const registerUser = async () => {
    createUserWithEmailAndPassword(
      auth,
      email.current?.querySelector('input')?.value as string,
      password.current?.querySelector('input')?.value as string
    )
      .then(() => {
        addDoc(collection(db, 'users'), {
          displayName: `${name.current?.querySelector('input')?.value} ${
            surname.current?.querySelector('input')?.value
          }`,
          uid: auth.currentUser?.uid,
        }).then(() => {
          setRegistering(false);
          if (!auth.currentUser) throw new Error('Some problem with server');
          updateProfile(auth.currentUser, {
            displayName: `${name.current?.querySelector('input')?.value} ${
              surname.current?.querySelector('input')?.value
            }`,
          });
          navigate('/main');
        });
      })
      .catch((err) => {
        setRegistering(false);
        setError(() =>
          err.code === 'auth/email-already-in-use'
            ? 'Email is in use'
            : 'Somethings wrong with servers'
        );
      });
  };

  const checkInputs = async () => {
    setRegistering(true);
    if (
      email.current?.querySelector('input')?.value === '' ||
      name.current?.querySelector('input')?.value === '' ||
      surname.current?.querySelector('input')?.value === '' ||
      password.current?.querySelector('input')?.value === '' ||
      confirmPassword.current?.querySelector('input')?.value === ''
    ) {
      setError('Some inputs are empty');
      setRegistering(false);
      return;
    }

    if (
      password.current?.querySelector('input')?.value !==
      confirmPassword.current?.querySelector('input')?.value
    ) {
      setError('Password and confirm password are not the same');
      setRegistering(false);
      return;
    }
    await registerUser();
  };

  return (
    <Wrapper autoComplete="off">
      <TextField type="text" label="Your name" ref={name} margin="dense" />
      <TextField
        type="text"
        label="Your surname"
        ref={surname}
        margin="dense"
      />
      <TextField type="email" label="Your email" ref={email} margin="dense" />
      <TextField
        type="password"
        label="Your password"
        ref={password}
        margin="dense"
      />
      <TextField
        type="password"
        label="Confirm your password"
        ref={confirmPassword}
        margin="dense"
      />
      <p style={{ color: 'red' }}>{error}</p>
      <Button type="button" disabled={registering} onClick={checkInputs}>
        Click to register
      </Button>
      <Link to="/">Back to login page</Link>
    </Wrapper>
  );
};

export default Register;
