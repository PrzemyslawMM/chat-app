import React from 'react';
import { Wrapper } from './userSearch.style';

type userSearchProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const userSearch: React.FC<userSearchProps> = ({ value, setValue }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Wrapper
      value={value}
      label="Search for user"
      onChange={handleOnChange}
      size="small"
      margin="normal"
      style={{ marginLeft: '3px' }}
    />
  );
};

export default userSearch;
