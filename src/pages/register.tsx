import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

type RegisterProps = {};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

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
      email.current?.value as string,
      password.current?.value as string
    )
      .then(() => {
        addDoc(collection(db, 'users'), {
          displayName: `${name.current?.value} ${surname.current?.value}`,
          uid: auth.currentUser?.uid,
        }).then(() => {
          setRegistering(false);
          if (!auth.currentUser) throw new Error('Some problem with server');
          updateProfile(auth.currentUser, {
            displayName: `${name.current?.value} ${surname.current?.value}`,
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
      email.current?.value === '' ||
      name.current?.value === '' ||
      surname.current?.value === '' ||
      password.current?.value === '' ||
      confirmPassword.current?.value === ''
    ) {
      setError('Some inputs are empty');
      setRegistering(false);
      return;
    }

    if (password.current?.value !== confirmPassword.current?.value) {
      setError('Password and confirm password are not the same');
      setRegistering(false);
      return;
    }
    await registerUser();
  };

  return (
    <Wrapper>
      <p style={{ color: 'red' }}>{error}</p>
      <input type="text" placeholder="Your name" ref={name} />
      <input type="text" placeholder="Your surname" ref={surname} />
      <input type="email" placeholder="Your email" ref={email} />
      <input type="password" placeholder="Your password" ref={password} />
      <input
        type="password"
        placeholder="Confirm your password"
        ref={confirmPassword}
      />
      <button
        type="button"
        disabled={registering}
        onClick={() => {
          checkInputs();
        }}
      >
        Click to register
      </button>
      <Link to="/">Back to login page</Link>
    </Wrapper>
  );
};

export default Register;
