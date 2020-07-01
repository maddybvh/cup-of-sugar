import React, { useState, useContext } from 'react';
import { AuthUserContext } from '../Session';

import MessageThread from './MessageThread';
import ThreadList from './ThreadList';

export const Chat = (props) => {
  const authUser = useContext(AuthUserContext);

  const initialThreadId = props.location.state?.threadId || '';

  const [threadId, setThreadId] = useState(initialThreadId);

  return (
    <div className="container h-100">
      <h1>chat</h1>
      <div className="row">
        <div className="col-sm-4">
          <ThreadList
            currentUserId={authUser.uid}
            currentUserName={authUser.username}
            setThreadId={setThreadId}
          />
        </div>
        <div className="col-sm-8">
          {threadId && (
            <MessageThread
              threadId={threadId}
              currentUser={authUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const getThreadId = (uid1, uid2) => {
  return uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;
};
