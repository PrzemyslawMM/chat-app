/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearch } from 'utils/contexts/SearchParams';

const Wrapper = styled.button`
  width: 13ch;
  max-width: 13ch;
`;

type NavButtonProps = {
  name: String;
  id: Number;
};

const NavButton: React.FC<NavButtonProps> = ({ name, id }) => {
  const { setSearchParams, searchParams } = useSearch();

  const [rest, setRest] = useState<string[] | null>(null);

  const handleClick = () => {
    const myID = searchParams.get('myID');

    if (!myID) {
      throw new Error('myID is null');
    }

    setSearchParams({
      myID,
      id: id.toString(),
    });
  };

  const result = name.split(/\s+/);

  useEffect(() => {
    if (result.length >= 3) {
      // @ts-ignore
      const surname = result.reduce((value, current, index) => {
        if (!index) return;
        if (value === undefined) value = '';
        value += `${current} `;
        return value;
      }, '');
      const rest = surname.split(/\s+/);
      setRest(rest);
    }
  }, []);

  return (
    <Wrapper type="button" onClick={handleClick}>
      <p>{result[0]}</p>
      {rest ? (
        // eslint-disable-next-line react/no-array-index-key
        rest.map((item, index) => <p key={index}>{item}</p>)
      ) : (
        <p>{result[1]}</p>
      )}
    </Wrapper>
  );
};

export default NavButton;
