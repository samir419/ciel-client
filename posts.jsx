import React, { useState,useEffect  } from 'react';
import { Outlet, Link } from "react-router-dom";
import './new.css';
function Ciel_posts(){
    const apiUrl = import.meta.env.VITE_API_URL;
     const [posts, setposts] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const [searchquery,setsearchquery] = useState('');

    useEffect(() => {
             fetch(`${apiUrl}/posts`)
             .then(response => response.json())  
             .then(data => {
             console.log(data); 
             setposts(data)
             })
             .catch(error => {
             console.error('Error fetching data:', error);
             });
         },[]);

    const search = () =>{
        fetch(`${apiUrl}/search_posts`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query:searchquery})
            })
        .then(response => response.json())  
        .then(data => {
        console.log(data); 
        setposts(data)
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
    }
    return(
        <div className="social-home">
      <h1 className="header">Social Stream</h1>
      <div className="post-grid">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <h2 className="post-title"><Link to={`/post/${post._id}`} style={{color:'white',width:'auto'}}>{post.title}</Link></h2>
            <div className="media-container">
              {post.type === 'image' && (
                <img src={`${apiUrl}/files/${post.content}`} alt={post.title} style={{maxHeight:'240px',width:'auto'}}/>
              )}
              {post.type === 'video' && (
                <video controls style={{maxHeight:'200px',width:'auto'}}>
                  <source src= {`${apiUrl}/files/${post.content}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {post.type === 'audio' && (
                <audio controls>
                  <source src={ `${apiUrl}/files/${post.content}`} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              {post.type === 'none' && (
                <p className="text-post">{post.description.slice(0, 50)}</p>
              )}
            </div>
            <div className="like-count">🩵 {post.likes.length} likes</div>
          </div>
        ))}
      </div>
    </div>
    )
}
export default Ciel_posts;