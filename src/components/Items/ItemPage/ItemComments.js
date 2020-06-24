import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { withFirebase } from '../../Firebase';
import CommentInput from './CommentInput';
import Comment from './Comment';

const ItemComments = (props) => {
  let comments = [];
  const reference = props.firebase.comments(props.uid).limit(5);

  const [value, loading, error] = useCollection(reference);

  value &&
    value.docs.forEach((doc) =>
      comments.push({ ...doc.data(), uid: doc.id }),
    );

  return props.authUser ? (
    <>
      <h2>Comments</h2>
      {comments &&
        comments.map((comment) => (
          <div key={comment.uid}>
            <Comment data={comment} />
          </div>
        ))}
      {loading && <div>Loading...</div>}
      {error && <div>Error reaching the database: {error}</div>}
      <CommentInput authUser={props.authUser} itemUid={props.uid} />
    </>
  ) : (
    <div>log in to comment</div>
  );
};

export default withFirebase(ItemComments);
