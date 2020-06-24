import React from 'react';

const Comment = ({ data }) => {
  return (
    <div className="card m-1">
      <div className="card-body p-1">
        <div>{data.text}</div>
        <div className="badge">- {data.userName}</div>
      </div>
    </div>
  );
};

export default Comment;
