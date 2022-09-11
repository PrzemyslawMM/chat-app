import React, { useEffect } from 'react';
import ChatNav from 'components/organisms/chatNav/chatNav';
import Chat from 'components/organisms/chat/chat';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
`;

export const Main: React.FC<{}> = () => {
  const [, setSearchParams] = useSearchParams();

  useEffect(() => setSearchParams({ myID: '13154156' }), []);

  return (
    <Wrapper>
      <ChatNav />
      <Chat />
    </Wrapper>
  );
};
