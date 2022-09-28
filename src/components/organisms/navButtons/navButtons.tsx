import React from 'react';
import UserSearch from '../../molecules/userSearch/userSearch';
import NavButton from '../../atoms/navButton/navButton';
import Logout from '../../atoms/Logout/logout';
import { Wrapper } from './navButtons.style';

type NavButtonsProps = {
  navArray: { displayName: string; uid: string }[];
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  setHamburgerActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const navButtons: React.FC<NavButtonsProps> = ({
  navArray,
  setInputValue,
  inputValue,
  setHamburgerActive,
}) => {
  return (
    <Wrapper>
      <UserSearch value={inputValue} setValue={setInputValue} />
      {navArray.map((element) => (
        <NavButton
          name={element.displayName}
          id={element.uid}
          key={element.uid}
          setHamburgerActive={setHamburgerActive}
        />
      ))}
      <Logout />
    </Wrapper>
  );
};

export default navButtons;
