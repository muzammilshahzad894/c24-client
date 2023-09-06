import React, { useState } from 'react';
import './Forum.scss';
import Post from './Post';
import PostForm from './PostForm';

const Forum = () => {
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = (postData) => {
    setPosts([...posts, postData]);
  };

  return (
    <div className="forum">
      <h1 className="forum-title">Forum</h1>

      <div className="post-form-container">
        <h2>Create a New Post</h2>
        <PostForm onSubmit={handlePostSubmit} />
      </div>

      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post, index) => <Post key={index} post={post} />)
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Forum;
