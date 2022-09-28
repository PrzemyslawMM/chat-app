import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useSearchParams } from 'react-router-dom';
import { InputMessage, SendButton, Wrapper } from './inputMessage.style';

const inputMessage: React.FC<{}> = () => {
  const [value, setValue] = useState('');
  const [showBefore, setShowBefore] = useState(true);
  const InputRef = useRef<HTMLDivElement>(null);
  const db = getFirestore();
  const auth = getAuth();
  const [params] = useSearchParams();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (!e.shiftKey) {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (!target.innerText) return;
        setValue(target.innerText);
        target.innerText = '';
      }
    }
  };

  const handleOnClick = () => {
    if (!InputRef.current) return;

    setValue(InputRef.current.innerText);
    InputRef.current.innerText = '';

    setShowBefore(true);
    InputRef.current.blur();
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.target.innerText) {
      setShowBefore(true);
    }
  };

  useEffect(() => {
    if (!value) return;

    (async () => {
      await addDoc(
        collection(db, `${auth.currentUser?.uid}-${params.get('id')}`),
        {
          text: value,
          id: auth.currentUser?.uid,
          createdAt: serverTimestamp(),
        }
      );

      if (params.get('id') === auth.currentUser?.uid) return;

      await addDoc(
        collection(db, `${params.get('id')}-${auth.currentUser?.uid}`),
        {
          text: value,
          id: auth.currentUser?.uid,
          createdAt: serverTimestamp(),
        }
      );
    })();
  }, [value]);

  return (
    <Wrapper>
      <InputMessage
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        onClick={() => {
          setShowBefore(false);
        }}
        onBlur={handleBlur}
        showBefore={showBefore}
        ref={InputRef}
      >
        {' '}
      </InputMessage>
      <SendButton
        color="secondary"
        variant="text"
        size="small"
        onClick={handleOnClick}
      >
        <SendIcon fontSize="small" />
      </SendButton>
    </Wrapper>
  );
};

export default inputMessage;
