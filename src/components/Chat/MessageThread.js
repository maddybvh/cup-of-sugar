import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

import { withFirebase } from '../Firebase';
import { Messages } from './Messages';

const MessageThread = ({ firebase, threadId, currentUser }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Thread ID: ' + threadId);
    firebase.messageThread(threadId).set(
      {
        newMessageText: text,
        newMessageFor: metaData.userIds.filter(
          (id) => id !== currentUser.uid,
        ),
        newMessageAt: firebase.fieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    firebase.messages(threadId).add({
      text: text,
      senderId: currentUser.uid,
      createdAt: firebase.fieldValue.serverTimestamp(),
    });

    setText('');
  };

  let messages = [];
  const [value, loading, error] = useCollection(
    firebase.messages(threadId).orderBy('createdAt', 'asc'),
  );

  value &&
    value.docs.forEach((doc) =>
      messages.push({
        ...doc.data(),
        uid: doc.id,
      }),
    );

  const reference = firebase.messageThread(threadId);
  const [metaData, loadingMeta, errorMeta] = useDocumentDataOnce(
    reference,
  );

  return (
    <>
      <div className="row">
        <Messages messages={messages} currentUser={currentUser} />
      </div>
      <form
        className="form-inline mt-2"
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
};

export default withFirebase(MessageThread);
