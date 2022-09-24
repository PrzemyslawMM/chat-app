import React from 'react';
import InputMessage from 'components/atoms/inputMessage/inputMessage';
import styled from 'styled-components';
import ChatMessage from 'components/atoms/chatMessages/chatMessage';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Chat: React.FC<{}> = () => {
  return (
    <Wrapper>
      <ChatMessage />
      <InputMessage />
    </Wrapper>
  );
};

export default Chat;
