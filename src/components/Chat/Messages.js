import React from 'react';
import { Message } from './Message';

export const Messages = ({ messages, currentUser }) => (
  <div className="container">
    {messages &&
      messages.map((message) => (
        <Message
          message={message}
          key={message.uid}
          currentUser={currentUser}
        />
      ))}
  </div>
);
