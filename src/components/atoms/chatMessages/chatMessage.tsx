import React from 'react';
import styled from 'styled-components';
import { getAuth } from 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, getFirestore } from 'firebase/firestore';

type ChatMessageProps = {
  message: string;
  id: string;
};

type WrapperProps = {
  myID: string;
  id: string;
};

const Wrapper = styled.div<WrapperProps>`
  min-width: 250px;
  max-width: 250px;
  display: flex;
  justify-content: ${({ myID, id }) =>
    myID === id ? 'flex-end' : 'flex-start'};
`;

const chatMessage: React.FC<ChatMessageProps> = ({ id, message }) => {
  const auth = getAuth();

  if (!auth.currentUser) throw new Error('');
  const {
    currentUser: { uid },
  } = auth;

  return (
    <Wrapper myID={uid} id={id}>
      <p>{message}</p>
    </Wrapper>
  );
};

export default chatMessage;
