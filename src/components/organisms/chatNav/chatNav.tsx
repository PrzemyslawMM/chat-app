import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserSearch from 'components/molecules/userSearch/userSearch';
import NavButton from 'components/atoms/navButton/navButton';
import { getFirestore, collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

type ArrayType = { displayName: string; uid: string }[];

const ChatNav: React.FC<{}> = () => {
  const [inputValue, setInputValue] = useState('');
  const [navArray, setNavArray] = useState<ArrayType>([] as ArrayType);
  const [cloneArray, setCloneArray] = useState(navArray);
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

  // useEffect(() => {
  //   console.log(cloneArray);
  // }, [cloneArray]);

  return (
    <Wrapper>
      <UserSearch value={inputValue} setValue={setInputValue} />
      {navArray.map((element) => (
        <NavButton
          name={element.displayName}
          id={element.uid}
          key={element.uid}
        />
      ))}
    </Wrapper>
  );
};

export default ChatNav;
