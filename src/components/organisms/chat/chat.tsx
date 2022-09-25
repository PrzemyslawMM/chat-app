import React from 'react';
import InputMessage from 'components/atoms/inputMessage/inputMessage';
import styled from 'styled-components';
import ChatMessage from 'components/atoms/chatMessages/chatMessage';
import { collection, getFirestore, orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import { useSearchParams } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Chat: React.FC<{}> = () => {
  const auth = getAuth();
  const db = getFirestore();
  const [params] = useSearchParams();
  const messagesRef = collection(
    db,
    `${auth.currentUser?.uid}-${params.get('id')}`
  );
  const queryRef = query(messagesRef, orderBy('createdAt', 'asc'));
  const [value] = useCollectionData(queryRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <Wrapper>
      {value?.length === 0 || !value ? (
        <p>Welcome on chat! Type for new message</p>
      ) : (
        value.map((values) => (
          <ChatMessage id={values.id} message={values.text} />
        ))
      )}
      <InputMessage />
    </Wrapper>
  );
};

export default Chat;
