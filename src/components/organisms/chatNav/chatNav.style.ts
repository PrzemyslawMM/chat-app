import styled from 'styled-components';

type NavWrapperProps = {
  visible: boolean;
};

export const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
`;

export const NavWrapper = styled.div<NavWrapperProps>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;
