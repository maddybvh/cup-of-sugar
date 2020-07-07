import React, { useState, useContext } from 'react';
import { AuthUserContext } from '../Session';

import MessageThread from './MessageThread';
import ThreadList from './ThreadList';

export const Chat = (props) => {
  const authUser = useContext(AuthUserContext);

  const initialThreadId = props.location.state?.threadId || '';

  const [threadId, setThreadId] = useState(initialThreadId);

  return (
    <div className="row">
      <div className="col-sm-4 border-right">
        <h1>chat</h1>
        <ThreadList
          currentUserId={authUser.uid}
          currentUserName={authUser.username}
          setThreadId={setThreadId}
          threadId={threadId}
        />
      </div>
      <div className="col-sm-8">
        {threadId && (
          <MessageThread threadId={threadId} currentUser={authUser} />
        )}
      </div>
    </div>
  );
};
