import React from 'react';
import { Message } from './Message';

export const Messages = ({ messages, currentUser }) => (
  <div
    style={{
      height: 400,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column-reverse',
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
