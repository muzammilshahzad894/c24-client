import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import axios from "axios";

const Post = ({ post }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.example.com/posts");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(fetchData,"Savan-fetch");

  return (
    <div className="post">
      {posts.map((post) => {
        return (
          <>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
          </>
        );
      })}
      <p className="post-created-at">
        Created at: {post.createdAt.toLocaleString()}
      </p>

      {post.comments && post.comments.length > 0 && (
        <div className="comments-container">
          <h3 className="comments-title">Comments:</h3>
          {post.comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      )}

      <CommentForm postId={post.id} />
    </div>
  );
};

export default Post;
