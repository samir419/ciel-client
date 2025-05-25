import React, { useState,useEffect  } from 'react';
import { Outlet, Link } from "react-router-dom";
function Ciel_posts(){
     const [posts, setposts] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const [searchquery,setsearchquery] = useState('');

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
         },[]);

    const search = () =>{
        fetch(`http://localhost:5000/search_posts`,{
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
        <div className='container'>
            <input type="search" onSubmit={search()} onChange={(e)=>setsearchquery(e.target.value)} style={{display:'none'}}/>
            {posts.map((post) => (
                <div key={post._id} className="post">
                    <h3><Link to={`/post/${post._id}`} style={{color:'white'}}>{post.title}</Link></h3>
                    <p>type:{post.type}</p>
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
                </div>
            ))}
        </div>
    )
}
export default Ciel_posts;