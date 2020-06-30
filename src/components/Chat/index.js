import React, { useState, useContext } from 'react';
import { AuthUserContext } from '../Session';

import MessageThread from './MessageThread';
import ThreadList from './ThreadList';

export const Chat = (props) => {
  const authUser = useContext(AuthUserContext);
  const fromItem = props.location.state?.fromItem;
  const [recipientName, setRecipientName] = useState(
    props.location.state?.recipientName,
  );
  const [recipientId, setRecipientId] = useState(
    props.location.state?.recipientId,
  );
  const [threadId, setThreadId] = useState(
    getThreadId(authUser.uid, recipientId),
  );

  return (
    <>
      <h1>chat</h1>
      <div className="row">
        <div className="col-sm-4">
          <ThreadList
            recipientId={recipientId}
            setRecipientId={setRecipientId}
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
    </>
  );
};

const getThreadId = (uid1, uid2) => {
  return uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;
};
