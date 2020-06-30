import React from 'react';

export const Message = ({ message, currentUser }) => {
  const getBackgroundColor = () => {
    if (message.senderId === currentUser.id) {
      return 'lightblue';
    } else {
      return 'lightgray';
    }
  };

  const getClass = () => {
    if (message.senderId === currentUser.id) {
      return 'd-flex flex-row-reverse';
    } else {
      return 'd-flex flex-row';
    }
  };

  return (
    <>
      <div key={message.uid} className={getClass()}>
        <div
          className="card mb-1"
          style={{
            backgroundColor: getBackgroundColor(),
          }}
        >
          <div>{message.text}</div>
        </div>
      </div>
    </>
  );
};
