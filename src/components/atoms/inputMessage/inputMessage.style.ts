import styled from 'styled-components';
import Button from '@mui/material/Button';

type InputMessageProps = {
  showBefore: Boolean;
};

export const InputMessage = styled.div<InputMessageProps>`
  min-width: 100%;
  max-width: 100%;
  background-color: #e6e6e6;
  display: block;

  &::before {
    content: ${({ showBefore }) => (showBefore ? "'Aa'" : "''")};
    width: 150px;
    height: 150px;
    background-color: transparent;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: calc(95vw - 60px);
  margin-left: 60px;
`;

export const SendButton = styled(Button)`
  align-self: flex-end;
`;
