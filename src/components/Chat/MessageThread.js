import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

import { withFirebase } from '../Firebase';
import { Messages } from './Messages';

const MessageThread = ({ firebase, threadId, currentUser }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.messageThread(threadId).set(
      {
        newMessageText: text,
        newMessageFor: metaData.userIds.filter(
          (id) => id !== currentUser.uid,
        ),
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

    setText('');
  };

  let messages = [];
  // eslint-disable-next-line
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
  // eslint-disable-next-line
  const [metaData, loadingMeta, errorMeta] = useDocumentDataOnce(
    reference,
  );

  const chatName =
    metaData?.usernames?.filter(
      (name) => name !== currentUser.username,
    ) || currentUser.username;

  return (
    <>
      {metaData && (
        <>
          <strong>{chatName}</strong>
          <div className="row">
            <Messages messages={messages} currentUser={currentUser} />
          </div>
          <div className="fixed-bottom mw-100 position-relative">
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
          </div>
        </>
      )}
    </>
  );
};

export default withFirebase(MessageThread);
