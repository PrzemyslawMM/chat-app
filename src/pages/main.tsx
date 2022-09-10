import React, { useEffect } from 'react';
import ChatNav from 'components/organisms/chatNav/chatNav';
import { useSearch } from 'utils/contexts/SearchParams';
import Chat from 'components/organisms/chat/chat';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

export const Main: React.FC<{}> = () => {
  const { setSearchParams } = useSearch();

  useEffect(() => setSearchParams({ myID: '13154156' }), []);

  return (
    <Wrapper>
      <ChatNav />
      <Chat />
    </Wrapper>
  );
};
