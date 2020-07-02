import React from 'react';
import ReactMarkdown from 'react-markdown';

export const Message = ({ message, currentUser }) => {
  const getBackgroundColor = () => {
    if (message.senderId === currentUser.uid) {
      return '#007BFF';
    } else {
      return '#e3e3e3';
    }
  };

  const getColor = () => {
    if (message.senderId === currentUser.uid) {
      return 'white';
    } else {
      return 'black';
    }
  };

  const getClass = () => {
    if (message.senderId === currentUser.uid) {
      return 'd-flex flex-row-reverse';
    } else {
      return 'd-flex flex-row';
    }
  };

  return (
    <>
      <div key={message.uid} className={getClass()}>
        <div
          className="card mb-1 p-2"
          style={{
            backgroundColor: getBackgroundColor(),
            color: getColor(),
            borderRadius: 20,
          }}
        >
          <ReactMarkdown source={message.text} />
        </div>
      </div>
    </>
  );
};
