import React from 'react';

export const ThreadPreview = ({
  thread,
  currentUserName,
  setThreadId,
}) => {
  let threadName = thread?.userNames?.filter(
    (name) => name !== currentUserName,
  );

  if (threadName?.length === 0) {
    threadName = ['Me'];
  }

  const handleClick = (e) => {
    e.preventDefault();
    setThreadId(thread.uid);
  };

  return (
    <div>
      <button
        style={{
          border: '0',
          textAlign: 'left',
          background: 'white',
        }}
        onClick={handleClick}
      >
        <div style={{ fontWeight: 'bold' }}>{threadName}</div>
        <div style={{ fontSize: 14, color: 'gray' }}>
          {thread.newMessageText}
        </div>
      </button>
      <br />
    </div>
  );
};
