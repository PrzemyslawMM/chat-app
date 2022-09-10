import React from 'react';
import styled from 'styled-components';

type userSearchProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Wrapper = styled.input`
  min-width: 13ch;
  max-width: 13ch;
`;

const userSearch: React.FC<userSearchProps> = ({ value, setValue }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Wrapper
      value={value}
      placeholder="Search for user"
      onChange={handleOnChange}
    />
  );
};

export default userSearch;
