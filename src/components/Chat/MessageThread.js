import React, { useState } from 'react';

import { withFirebase } from '../Firebase';

const MessageThread = ({
  senderName,
  senderId,
  recipientName,
  recipientId,
  firebase,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.messageThread(getThreadId(senderId, recipientId)).set(
      {
        userIds: [senderId, recipientId], //@todo probably want to move this out of here since it's repetative.
        userNames: [senderName, recipientName],
        newMessageText: text,
        newMessageFor: recipientId,
        newMessageAt: firebase.fieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    firebase.messages(getThreadId(senderId, recipientId)).add({
      text: text,
      senderId: senderId,
      createdAt: firebase.fieldValue.serverTimestamp(),
    });

    setText('');
  };

  return (
    <>
      <div
        className="row"
        style={{ background: 'lightblue', minHeight: 200 }}
      >
        chats go here
      </div>
      <form className="form-inline mt-2" onSubmit={handleSubmit}>
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
};

export default withFirebase(MessageThread);

const getThreadId = (uid1, uid2) => {
  return uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;
};
