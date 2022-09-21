import React, { useEffect, useState } from 'react';
import ChatNav from 'components/organisms/chatNav/chatNav';
import Chat from 'components/organisms/chat/chat';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Logout from 'components/atoms/Logout/logout';

type MainPageProps = {
  myID: string;
};

const Wrapper = styled.div`
  display: flex;
`;

export const Main: React.FC<MainPageProps> = ({ myID }) => {
  const [, setSearchParams] = useSearchParams();
  const [userID, setUserID] = useState(myID);

  useEffect(() => {
    if (myID === '') {
      const auth = getAuth();
      if (auth.currentUser?.uid) setUserID(auth.currentUser.uid);
    }
  });

  useEffect(() => {
    setSearchParams({ myID: userID });
  }, [userID]);

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
