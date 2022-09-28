/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Wrapper } from './navButton.style';

type NavButtonProps = {
  name: string;
  id: string;
  setHamburgerActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavButton: React.FC<NavButtonProps> = ({
  name,
  id,
  setHamburgerActive,
}) => {
  const [, setSearchParams] = useSearchParams();

  const [rest, setRest] = useState<string[] | null>(null);

  const handleClick = () => {
    setSearchParams({ id });
    setHamburgerActive(false);
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
    <Wrapper
      type="button"
      onClick={handleClick}
      variant="outlined"
      size="small"
      style={{ display: 'inline-block', margin: '3px 0 3px 5px' }}
    >
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
