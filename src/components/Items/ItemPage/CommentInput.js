import React, { useState } from 'react';

import { withFirebase } from '../../Firebase';

const CommentInput = (props) => {
  const [text, setText] = useState('');
  const increment = props.firebase.fieldValue.increment(1);

  const onCreateComment = (event) => {
    event.preventDefault();
    props.firebase.comments(props.itemUid).add({
      text: text,
      userId: props.authUser.uid,
      userName: props.authUser.username,
      createdAt: props.firebase.fieldValue.serverTimestamp(),
    });

    props.firebase
      .item(props.itemUid)
      .update({ numComments: increment });

    setText('');
  };

  const onChangeText = (event) => {
    setText(event.target.value);
  };

  return (
    <form onSubmit={onCreateComment}>
      <div className="form-group mt-4 mb-4">
        <div className="row ml-4">
          <div className="col">
            <input
              type="text"
              value={text}
              onChange={onChangeText}
              className="form-control"
              name="item-title"
              aria-label="item title"
            />
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              type="submit"
              aria-label="Submit"
            >
              <svg
                className="bi bi-arrow-right-circle-fill ml-2"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default withFirebase(CommentInput);
