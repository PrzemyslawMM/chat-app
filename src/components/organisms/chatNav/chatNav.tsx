import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserSearch from 'components/molecules/userSearch/userSearch';
import NavButton from 'components/atoms/navButton/navButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

type ArrayType = { name: String; id: number }[];

const Array: ArrayType = [
  { name: 'Przemysław Małecki', id: 1 },
  { name: 'Przemysław Ślusarczyk', id: 2 },
  { name: 'Przemysław Ślusarczyk Małecki', id: 3 },
  { name: 'Konrad Machowski', id: 4 },
  { name: 'Bartosz Wleciał', id: 5 },
  { name: 'Stanisław Potocki', id: 6 },
];

const ChatNav: React.FC<{}> = () => {
  const [inputValue, setInputValue] = useState('');
  const [navButton, setNavButton] = useState(Array);

  const filterItems = (array: ArrayType, query: String) =>
    array.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (inputValue === '') setNavButton(Array);

    setNavButton(() => {
      return filterItems(Array, inputValue);
    });
  }, [inputValue]);

  return (
    <Wrapper>
      <UserSearch value={inputValue} setValue={setInputValue} />
      {navButton.map((element) => (
        <NavButton name={element.name} id={element.id} key={element.id} />
      ))}
    </Wrapper>
  );
};

export default ChatNav;
