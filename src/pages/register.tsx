import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type RegisterProps = {
  setID: React.Dispatch<React.SetStateAction<string>>;
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Register: React.FC<RegisterProps> = ({ setID }) => {
  const email = useRef<HTMLInputElement>(null);
  const confirmEmail = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const surname = useRef<HTMLInputElement>(null);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const registerUser = async () => {
    createUserWithEmailAndPassword(
      auth,
      email.current?.value as string,
      password.current?.value as string
    )
      .then(() => {
        updateProfile(auth.currentUser as User, {
          displayName: `${name.current?.value} ${surname.current?.value}`,
        }).then(() => {
          setID(auth.currentUser?.uid as string);
          setRegistering(false);
          navigate('/');
        });
      })
      .catch(() => {
        setRegistering(false);
      });
  };

  const checkInputs = async () => {
    setRegistering(true);
    if (
      email.current?.value === '' ||
      confirmEmail.current?.value === '' ||
      name.current?.value === '' ||
      surname.current?.value === '' ||
      password.current?.value === '' ||
      confirmPassword.current?.value === ''
    ) {
      setError('Some inputs are empty');
      setRegistering(false);
      return;
    }

    if (email.current?.value !== confirmEmail.current?.value) {
      setError('Email and confirm email are not the same');
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
      <input type="email" placeholder="Confirm your email" ref={confirmEmail} />
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
    </Wrapper>
  );
};

export default Register;
