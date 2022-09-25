import React, { useEffect } from 'react';
import ChatNav from 'components/organisms/chatNav/chatNav';
import Chat from 'components/organisms/chat/chat';
import styled from 'styled-components';
import Logout from 'components/atoms/Logout/logout';
import { useSearchParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

type MainPageProps = {};

const Wrapper = styled.div`
  display: flex;
`;

export const Main: React.FC<MainPageProps> = () => {
  const [params, setParams] = useSearchParams();
  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser) return;

    if (!params.get('id')) setParams({ id: auth.currentUser.uid });
  }, []);

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
