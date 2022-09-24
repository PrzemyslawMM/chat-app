import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserSearch from 'components/molecules/userSearch/userSearch';
import NavButton from 'components/atoms/navButton/navButton';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

  const filterItems = (array: ArrayType, query: string) =>
    array.filter((el) =>
      el.displayName.toLowerCase().includes(query.toLowerCase())
    );

  useEffect(() => {
    if (inputValue === '') setNavArray(cloneArray);

    setNavArray((prev) => {
      return filterItems(prev, inputValue);
    });
  }, [inputValue]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const array: ArrayType = [];

    await querySnapshot.forEach((doc) => {
      const data = doc.data();

      array.push(data as { displayName: string; uid: string });
    });

    setNavArray(array);
    setCloneArray(array);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(cloneArray);
  }, [cloneArray]);

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
