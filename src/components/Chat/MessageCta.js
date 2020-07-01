import React from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

export const MessageCta = withFirebase(
  ({ recipientName, recipientId, currentUserId, firebase }) => {
    const threadId = getThreadId(recipientId, currentUserId);

    const handleClick = () => {
      firebase.messageThread(threadId).set(
        {
          newMessageAt: firebase.fieldValue.serverTimestamp(),
          users: [currentUserId, recipientId],
        },
        {
          merge: true,
        },
      );
    };

    return (
      <Link
        to={{
          pathname: ROUTES.CHAT,
          state: {
            recipientName: recipientName,
            recipientId: recipientId,
            threadId: threadId,
          },
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Message {recipientName}
        </button>
      </Link>
    );
  },
);

const getThreadId = (uid1, uid2) => {
  return uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;
};
