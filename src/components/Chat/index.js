import React from 'react';
import { AuthUserContext } from '../Session';

import MessageThread from './MessageThread';

export const Chat = (props) => {
  const fromItem = props.location.state?.fromItem;
  const recipientName = props.location.state?.recipientName;
  const recipientId = props.location.state?.recipientId;

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          <h1>chat</h1>
          <div className="row">
            <div className="col-sm-4">
              <div>Chat list</div>
              {recipientName && <div>{recipientName}</div>}
            </div>
            <div className="col-sm-8">
              <MessageThread
                senderId={authUser.uid}
                recipientName={recipientName}
                recipientId={recipientId}
              />
            </div>
          </div>
        </>
      )}
    </AuthUserContext.Consumer>
  );
};
