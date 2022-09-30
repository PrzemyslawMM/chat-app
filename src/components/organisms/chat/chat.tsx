import React, { useEffect, useRef } from 'react';
import InputMessage from 'components/atoms/inputMessage/inputMessage';
import ChatMessage from 'components/atoms/chatMessages/chatMessage';
import { collection, getFirestore, orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import { useSearchParams } from 'react-router-dom';
import { CenteredText, MessagesWrapper, Wrapper } from './chat.style';

const Chat: React.FC<{}> = () => {
  const auth = getAuth();
  const db = getFirestore();
  const [params] = useSearchParams();
  const dummyRef = useRef<HTMLDivElement>(null);
  const messagesRef = collection(
    db,
    `${auth.currentUser?.uid}-${params.get('id')}`
  );
  const queryRef = query(messagesRef, orderBy('createdAt', 'asc'));
  const [value] = useCollectionData(queryRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    dummyRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [value]);

  return (
    <Wrapper style={{ marginLeft: '30px' }}>
      <MessagesWrapper>
        {value?.length === 0 || !value ? (
          <CenteredText>Welcome on chat! Type for new message</CenteredText>
        ) : (
          value.map((values) => (
            <ChatMessage
              id={values.id}
              message={values.text}
              key={values.key}
            />
          ))
        )}
        <div ref={dummyRef} />
      </MessagesWrapper>
      <InputMessage />
    </Wrapper>
  );
};

export default Chat;
