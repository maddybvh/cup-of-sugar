import React, { useState } from 'react';
import { withFirebase } from '../Firebase';

export const MessageInput = withFirebase(
  ({ threadId, users, currentUser, firebase }) => {
    const recipientId = users.filter(
      (id) => id !== currentUser.uid,
    )[0];
    const [text, setText] = useState('');

    const increment = firebase.fieldValue.increment(1);

    const handleSubmit = (e) => {
      e.preventDefault();
      firebase.messageThread(threadId).set(
        {
          newMessageText: text,
          newMessageFor: recipientId,
          newMessageAt: firebase.fieldValue.serverTimestamp(),
        },
        {
          merge: true,
        },
      );
      firebase.messages(threadId).add({
        text: text,
        senderId: currentUser.uid,
        createdAt: firebase.fieldValue.serverTimestamp(),
      });

      firebase.user(recipientId).update({
        chatNotificationNum: increment,
      });

      setText('');
    };

    return (
      <>
        <form
          className="form-inline mt-2 mb-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="chatInput" className="sr-only">
            New message
          </label>
          <input
            type="text"
            className="form-control col-10"
            id="chatInput"
            placeholder="Aa"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <div className="col-2">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
      </>
    );
  },
);

export default withFirebase(MessageInput);
