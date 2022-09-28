import React, { useEffect, useState } from 'react';
import ChatNav from 'components/organisms/chatNav/chatNav';
import Chat from 'components/organisms/chat/chat';
import { useSearchParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { Wrapper } from './main.style';

type MainPageProps = {};

export const Main: React.FC<MainPageProps> = () => {
  const [params, setParams] = useSearchParams();
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser) return;

    if (!params.get('id')) setParams({ id: auth.currentUser.uid });
  }, []);

  return (
    <Wrapper>
      <ChatNav
        hamburgerActive={hamburgerActive}
        setHamburgerActive={setHamburgerActive}
      />
      <Chat />
    </Wrapper>
  );
};
