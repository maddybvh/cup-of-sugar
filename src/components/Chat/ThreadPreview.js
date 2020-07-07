import React from 'react';
import { withFirebase } from '../Firebase';

export const ThreadPreview = withFirebase(
  ({
    thread,
    currentUserName,
    setThreadId,
    currentUserId,
    firebase,
    threadId,
  }) => {
    const newTotalChats = firebase.fieldValue.increment(
      -1 * thread.newMessageCount,
    );

    let threadName = thread?.userNames?.filter(
      (name) => name !== currentUserName,
    );

    if (threadName?.length === 0) {
      threadName = ['Me'];
    }

    const handleClick = (e) => {
      e.preventDefault();
      setThreadId(thread.uid);
      firebase.messageThread(thread.uid).update({
        newMessageCount: 0,
      });
      firebase
        .user(currentUserId)
        .update({ chatNotificationNum: newTotalChats });
    };

    return (
      <div className="w-100 p-0 m-0">
        <button
          className="w-100 p-2 m-0"
          style={{
            border: '0',
            textAlign: 'left',
            background: 'white',
            overflow: 'hidden',
            margin: 10,
          }}
          onClick={handleClick}
        >
          <div className="d-inline" style={{ fontWeight: 'bold' }}>
            {threadName}
          </div>
          {thread.newMessageFor === currentUserId &&
            thread.newMessageCount > 0 && (
              <div className="d-inline">
                ({thread.newMessageCount})
              </div>
            )}
          <div style={{ fontSize: 14, color: 'gray' }}>
            {thread.newMessageText}
          </div>
        </button>
        <br />
      </div>
    );
  },
);
