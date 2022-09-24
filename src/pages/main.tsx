import React from 'react';
import ChatNav from 'components/organisms/chatNav/chatNav';
import Chat from 'components/organisms/chat/chat';
import styled from 'styled-components';
import Logout from 'components/atoms/Logout/logout';

type MainPageProps = {
  myID: string;
};

const Wrapper = styled.div`
  display: flex;
`;

export const Main: React.FC<MainPageProps> = () => {
  return (
    <>
      <Wrapper>
        <ChatNav />
        <Chat />
      </Wrapper>
      <Logout />
    </>
  );
};
