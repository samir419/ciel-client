import React, { useState,useEffect  } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
function Post(){
    const apiUrl = import.meta.env.VITE_API_URL;
     const {id} = useParams();
     const [post, setpost] = useState({
        title: "",
        description: "",
        type: "",
        author: {},
        content: "",
        likes: [],
        comments: []
     });
     const [commentInput, setCommentInput] = useState("");
     const [refresh,setrefresh]= useState(false);
    useEffect(() => {
        console.log('sending request')
        fetch(`${apiUrl}/post/${id}`)
        .then(response => response.json())  
        .then(data => {
        console.log(data); 
        setpost(data)
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
        console.log(post)
    },[refresh]);
    const handleLike = () => {
        fetch(`${apiUrl}/like/${id}`,{
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

    const handleAddComment = () => {
        fetch(`${apiUrl}/comment/${id}`,{
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
        <div className='page'>
            <div className="post">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>{post.type}</p>
                <Link to={`/user/${post.author._id}`}>{post.author.name}</Link>
                {post.content && (
                    <div>
                        {post.type == 'video' ? (
                            <video style={{maxWidth:'1000px',height:'auto'}} controls>
                                <source
                                    src={
                                `${apiUrl}/files/${post.content}`
                                    }
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        ) : post.type == 'image' ? (
                            <img style={{maxWidth:'1000px',height:'auto'}}
                                src={
                                `${apiUrl}/files/${post.content}`
                                }
                                alt="Post Media"
                            />
                        ): post.type == 'audio' ? (
                            <audio controls
                                src={
                                `${apiUrl}/files/${post.content}`
                                }
                                alt="Post Media"
                            />
                        ):(
                          <div></div>
                        )}
                    </div>
                )}
                <p>Likes: {post.likes.length}</p>
                <button onClick={() => handleLike()}>Like</button>
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
                    onClick={() => handleAddComment()}
                    className="comment-button"
                >
                    Add Comment
                </button>
            </div>
    </div>
    )
}
export default Post;