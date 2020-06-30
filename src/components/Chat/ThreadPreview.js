import React from 'react';

export const ThreadPreview = ({
  thread,
  currentUserName,
  setThreadId,
}) => {
  const threadName = thread?.usernames?.filter(
    (name) => name !== currentUserName,
  );

  const handleClick = (e) => {
    e.preventDefault();
    setThreadId(thread.uid);
  };

  return (
    <button
      style={{
        border: 'solid gray 1px',
        textAlign: 'left',
        background: 'white',
        maxWidth: 300,
      }}
      onClick={handleClick}
    >
      <div>{threadName ? threadName : currentUserName}</div>
      <div>{thread.newMessageText}</div>
    </button>
  );
};
