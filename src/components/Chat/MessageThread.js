import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

import { withFirebase } from '../Firebase';
import { Messages } from './Messages';
import { MessageInput } from './MessageInput';

const MessageThread = ({ firebase, threadId, currentUser }) => {
  let messages = [];
  // eslint-disable-next-line
  const [value, loading, error] = useCollection(
    firebase.messages(threadId).orderBy('createdAt', 'asc'),
  );

  value &&
    value.docs.forEach((doc) =>
      messages.push({
        ...doc.data(),
        uid: doc.id,
      }),
    );

  const reference = firebase.messageThread(threadId);
  // eslint-disable-next-line
  const [metaData, loadingMeta, errorMeta] = useDocumentDataOnce(
    reference,
  );

  let chatName = metaData?.userNames?.filter(
    (name) => name !== currentUser.username,
  );

  if (chatName?.length === 0) {
    chatName = ['Me'];
  }

  return (
    <>
      {metaData && (
        <div className="d-flex flex-column flex-column justify-content-between">
          <h2 className="text-center">{chatName}</h2>
          <Messages messages={messages} currentUser={currentUser} />
          <MessageInput
            threadId={threadId}
            users={metaData.users}
            currentUser={currentUser}
          />
        </div>
      )}
    </>
  );
};

export default withFirebase(MessageThread);
