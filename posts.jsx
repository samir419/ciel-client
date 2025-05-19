import React, { useState,useEffect  } from 'react';
import { Outlet, Link } from "react-router-dom";
function Ciel_posts(){
     const [posts, setposts] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const [refresh,setrefresh]= useState(false);

    useEffect(() => {
             fetch(`http://localhost:5000/posts`)
             .then(response => response.json())  
             .then(data => {
             console.log(data); 
             setposts(data)
             })
             .catch(error => {
             console.error('Error fetching data:', error);
             });
         },[refresh]);
        const handleLike = (postId) => {
            fetch(`http://localhost:5000/like/${postId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user:localStorage.getItem('user_id')})
                })
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
            setrefresh(prev=>!prev)
        };
    
        const handleAddComment = (postId, commentText) => {
            fetch(`http://localhost:5000/comment/${postId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user:localStorage.getItem('user_id'),message:commentInput})
                })
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
            setrefresh(prev=>!prev)
        };
    return(
        <div className='container'>
            {posts.map((post) => (
                <div key={post._id} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <p>{post.type}</p>
                    <Link to={`/user/${post.author._id}`}>{post.author.name}</Link>
                    {post.content && (
                        <div>
                            {post.type == 'video' ? (
                                <video width="auto" height="240" controls>
                                    <source
                                        src={
                                    `http://localhost:5000/files/${post.content}`
                                        }
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            ) : post.type == 'image' ? (
                                <img width="auto" height="240"
                                    src={
                                    `http://localhost:5000/files/${post.content}`
                                    }
                                    alt="Post Media"
                                />
                            ): post.type == 'audio' ? (
                                <audio controls
                                    src={
                                    `http://localhost:5000/files/${post.content}`
                                    }
                                    alt="Post Media"
                                />
                            ):(
                              <div></div>
                            )}
                        </div>
                    )}
                    <p>Likes: {post.likes.length}</p>
                    <button onClick={() => handleLike(post._id)}>Like</button>
                    <p>Comments: {post.comments.length}</p>
                    <ul>
                        {post.comments.map((comment, index) => (
                            <li key={index}>{comment.author.name}:{comment.content}</li>
                        ))}
                    </ul>

                    <input
                        type="text"
                        placeholder="Add a comment"
                        className="comment-input"
                        onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <button
                        onClick={() => handleAddComment(post._id, commentInput)}
                        className="comment-button"
                    >
                        Add Comment
                    </button>
                </div>
            ))}
        </div>
    )
}
export default Ciel_posts;