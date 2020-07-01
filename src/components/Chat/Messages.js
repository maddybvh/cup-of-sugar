import React from 'react';
import { Message } from './Message';

export const Messages = ({ messages, currentUser }) => (
  //Order of divs is important.
  <div
    style={{
      height: 'calc(100vh - 200px)',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column-reverse',
      padding: 10,
    }}
  >
    <div>
      {messages &&
        messages.map((message) => (
          <Message
            message={message}
            key={message.uid}
            currentUser={currentUser}
          />
        ))}
    </div>
  </div>
);
