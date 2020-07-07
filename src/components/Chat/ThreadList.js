import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { withFirebase } from '../Firebase';
import { ThreadPreview } from './ThreadPreview';

const ThreadList = ({
  currentUserId,
  currentUserName,
  firebase,
  setThreadId,
}) => {
  let threads = [];
  const [value, loading, error] = useCollection(
    firebase
      .messageThreads()
      .where('users', 'array-contains', currentUserId)
      .orderBy('newMessageAt', 'desc'),
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
        <>
          {threads.map((thread) => (
            <span className="row" key={thread.uid}>
              <ThreadPreview
                thread={thread}
                currentUserName={currentUserName}
                currentUserId={currentUserId}
                setThreadId={setThreadId}
              />
            </span>
          ))}
        </>
      )}
    </div>
  );
};

export default withFirebase(ThreadList);
