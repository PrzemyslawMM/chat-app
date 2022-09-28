import styled from 'styled-components';

type WrapperProps = {
  myID: string;
  id: string;
};

type WrapperMessageProps = {
  myID: string;
  id: string;
};

export const Wrapper = styled.div<WrapperProps>`
  min-width: calc(95vw - 30px);
  max-width: calc(95vw - 30px);
  margin-top: 7.5px;
  margin-bottom: 7.5px;

  display: flex;
  justify-content: ${({ myID, id }) =>
    myID === id ? 'flex-end' : 'flex-start'};

  & p {
    max-width: 40vw;
    word-wrap: break-word;
  }
`;

export const WrapperMessage = styled.div<WrapperMessageProps>`
  background-color: ${({ myID, id }) => (myID === id ? '#ccc' : '#7fd1ae')};
  padding: 15px 15px;
  border-radius: 360px;
`;
