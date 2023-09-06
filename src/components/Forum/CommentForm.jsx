import React, { useState } from 'react';

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!content) {
      alert('Please provide a comment.');
      return;
    }

    const newComment = {
      postId,
      content,
      createdAt: new Date(),
    };

    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        placeholder="Add a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="comment-form-textarea"
      ></textarea>
      <button type="submit" className="comment-form-btn">Submit</button>
    </form>
  );
};

export default CommentForm;
