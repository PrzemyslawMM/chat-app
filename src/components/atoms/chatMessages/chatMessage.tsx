import React from 'react';
import { getAuth } from 'firebase/auth';
import { Wrapper, WrapperMessage } from './chatMessage.style';

type ChatMessageProps = {
  message: string;
  id: string;
};

const chatMessage: React.FC<ChatMessageProps> = ({ id, message }) => {
  const auth = getAuth();

  if (!auth.currentUser) throw new Error('');
  const {
    currentUser: { uid },
  } = auth;

  return (
    <Wrapper myID={uid} id={id}>
      <WrapperMessage myID={uid} id={id}>
        <p>{message}</p>
      </WrapperMessage>
    </Wrapper>
  );
};

export default chatMessage;
