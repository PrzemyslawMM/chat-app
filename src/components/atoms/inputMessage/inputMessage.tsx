import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type WrapperProps = {
  showBefore: Boolean;
};

const Wrapper = styled.div<WrapperProps>`
  min-width: 300px;
  max-width: 300px;
  background-color: #e6e6e6;
  display: block;

  &::before {
    content: ${({ showBefore }) => (showBefore ? "'Aa'" : "''")};
    width: 150px;
    height: 150px;
    background-color: transparent;
  }
`;

const inputMessage: React.FC<{}> = () => {
  const [value, setValue] = useState('');
  const [showBefore, setShowBefore] = useState(true);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (!e.shiftKey) {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (!target.innerText) return;
        setValue(target.innerText);
        target.innerText = '';
        setShowBefore(true);
        e.currentTarget.blur();
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.target.innerText) {
      setShowBefore(true);
    }
  };

  useEffect(() => {
    if (!value) return;
    console.log(value);
  }, [value]);

  return (
    <Wrapper
      contentEditable
      suppressContentEditableWarning
      onKeyDown={handleKeyDown}
      onClick={() => {
        setShowBefore(false);
      }}
      onBlur={handleBlur}
      showBefore={showBefore}
    >
      {' '}
    </Wrapper>
  );
};

export default inputMessage;
