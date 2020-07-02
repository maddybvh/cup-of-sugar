import React from 'react';
import ReactMarkdown from 'react-markdown';

export const Message = ({ message, currentUser }) => {
  const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)(?![)])/;

  const formattedMessage = message.text.replace(regex, `![]($&)`);

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
          className="card mb-1 pl-1 pr-1 pt-3"
          style={{
            backgroundColor: getBackgroundColor(),
            color: getColor(),
            borderRadius: 20,
          }}
        >
          <ReactMarkdown source={formattedMessage} className="p-0" />
        </div>
      </div>
    </>
  );
};
