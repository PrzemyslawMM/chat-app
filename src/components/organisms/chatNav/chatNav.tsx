import React, { useEffect, useState } from 'react';
import { getFirestore, collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import NavButtons from '../navButtons/navButtons';
import { NavWrapper, Wrapper } from './chatNav.style';

type ArrayType = { displayName: string; uid: string }[];

const ChatNav: React.FC<{}> = () => {
  const [inputValue, setInputValue] = useState('');
  const [navArray, setNavArray] = useState<ArrayType>([] as ArrayType);
  const [cloneArray, setCloneArray] = useState(navArray);
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const db = getFirestore();
  const [users] = useCollectionData(collection(db, 'users'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const filterItems = (array: ArrayType, query: string) =>
    array.filter((el) =>
      el.displayName.toLowerCase().includes(query.toLowerCase())
    );

  useEffect(() => {
    if (inputValue === '') setNavArray(cloneArray);

    setNavArray(() => {
      return filterItems(cloneArray, inputValue);
    });
  }, [inputValue]);

  const getData = async () => {
    if (!users) return;
    const array = users.map((doc) => {
      return doc;
    });

    setNavArray(array as ArrayType);
    setCloneArray(array as ArrayType);
  };

  useEffect(() => {
    getData();
  }, [users]);

  return (
    <Wrapper>
      <IconButton
        style={{ width: '30px' }}
        onClick={() => {
          setHamburgerActive((prev) => !prev);
        }}
      >
        {hamburgerActive ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <NavWrapper visible={hamburgerActive}>
        <NavButtons
          navArray={navArray}
          setInputValue={setInputValue}
          inputValue={inputValue}
          setHamburgerActive={setHamburgerActive}
        />
      </NavWrapper>
    </Wrapper>
  );
};

export default ChatNav;
