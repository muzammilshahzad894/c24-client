import React, { useState } from 'react';

const PostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !content) {
      alert('Please provide a title and content for the post.');
      return;
    }

    const newPost = {
      title,
      content,
      createdAt: new Date(),
      comments: [],
    };

    console.log(newPost, "savan-post");

    onSubmit(newPost);

    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="post-form-input"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="post-form-textarea"
      ></textarea>
      <button type="submit" className="post-form-btn">Submit</button>
    </form>
  );
};

export default PostForm;
