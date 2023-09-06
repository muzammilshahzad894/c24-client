import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p className="comment-content">{comment.content}</p>
      <p className="comment-created-at">
        Created at: {comment.createdAt.toLocaleString()}
      </p>
    </div>
  );
};

export default Comment;
