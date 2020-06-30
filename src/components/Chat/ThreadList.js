import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { withFirebase } from '../Firebase';
import { ThreadPreview } from './ThreadPreview';

const ThreadList = ({
  recipientId,
  currentUserId,
  currentUserName,
  firebase,
  setThreadId,
  setRecipientId,
}) => {
  let threads = [];
  const [value, loading, error] = useCollection(
    firebase
      .messageThreads()
      .where('users', 'array-contains', currentUserId),
  );

  value &&
    value.docs.forEach((doc) =>
      threads.push({
        ...doc.data(),
        uid: doc.id,
      }),
    );

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading chats...</span>}
      {threads && (
        <span>
          {threads.map((thread) => (
            <ThreadPreview
              thread={thread}
              key={thread.uid}
              currentUserName={currentUserName}
              setThreadId={setThreadId}
            />
          ))}
        </span>
      )}
    </div>
  );
};

export default withFirebase(ThreadList);
