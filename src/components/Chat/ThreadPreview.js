import React from 'react';

export const ThreadPreview = ({ thread, currentUserName }) => {
  const threadName = thread?.usernames?.filter(
    (name) => name != currentUserName,
  );
  return (
    <div style={{ border: 'solid gray 1px' }}>
      <div>{threadName ? threadName : currentUserName}</div>
      <div>{thread.newMessageText}</div>
    </div>
  );
};
