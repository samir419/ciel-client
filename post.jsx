import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Post() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    type: "",
    author: {},
    content: "",
    likes: [],
    comments: []
  });
  const [commentInput, setCommentInput] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/post/${id}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [refresh]);

  const handleLike = () => {
    fetch(`${apiUrl}/like/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: localStorage.getItem('user_id') })
    })
      .then(response => response.json())
      .then(() => setRefresh(prev => !prev))
      .catch(console.error);
  };

  const handleAddComment = () => {
    fetch(`${apiUrl}/comment/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: localStorage.getItem('user_id'), message: commentInput })
    })
      .then(response => response.json())
      .then(() => {
        setCommentInput('');
        setRefresh(prev => !prev);
      })
      .catch(console.error);
  };

  return (
    <div className="post-container">
      <div className="post-card">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-description">{post.description}</p>
        <p className="post-type">{post.type.toUpperCase()}</p>
        <p className="post-author">
          Posted by <Link to={`/user/${post.author._id}`}>{post.author.name}</Link>
        </p>

        {post.content && (
          <div className="media-wrapper">
            {post.type === 'video' && (
              <video controls>
                <source src={`${apiUrl}/files/${post.content}`} type="video/mp4" />
              </video>
            )}
            {post.type === 'image' && (
              <img src={`${apiUrl}/files/${post.content}`} alt="Post Media" />
            )}
            {post.type === 'audio' && (
              <audio controls>
                <source src={`${apiUrl}/files/${post.content}`} />
              </audio>
            )}
          </div>
        )}

        <div className="post-actions">
          <button onClick={handleLike}>🩵 Like ({post.likes.length})</button>
        </div>

        <div className="comments-section">
          <h3>Comments ({post.comments.length})</h3>
          <ul className="comment-list">
            {post.comments.map((comment, i) => (
              <li key={i}><strong>{comment.author.name}:</strong> {comment.content}</li>
            ))}
          </ul>

          <div className="comment-form">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button onClick={handleAddComment}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
