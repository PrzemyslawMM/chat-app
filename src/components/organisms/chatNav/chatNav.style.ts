import styled from 'styled-components';

type NavWrapperProps = {
  visible: boolean;
};

export const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 15;
`;

export const NavWrapper = styled.div<NavWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: absolute;
  transition: transform 0.5s ease-in-out;
  transform: ${({ visible }) =>
    visible ? 'translateX(0)' : 'translateX(-100%)'};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;
