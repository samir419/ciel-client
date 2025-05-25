import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
function User(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [bio, setbio] = useState('');
    const [image_path,setimage_path] = useState('');
    const [userposts, setuserposts] = useState([]);
     const [userdata, setuserdata] = useState({followers:0,following:0,date_joined:0 });
    const [products,setproducts] = useState([])
    const {id} = useParams()
      useEffect(() => {
            fetch(`http://localhost:5000/user/${id}`)
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            setUsername(data.name)
            setbio(data.bio)
            setimage_path(`http://localhost:5000/files/${data.profile_pic}`)
            setuserdata({ followers: data.followers.length, following: data.following.length, date_joined: data.createdAt });
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
    
            fetch(`http://localhost:5000/posts/${id}`)
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            setuserposts(data)
            console.log(userposts)
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });

            fetch(`http://localhost:5000/products/${id}`)
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            setproducts(data)
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        },[]);
        const follow = (id) => {
            fetch(`http://localhost:5000/followuser/${id}`,{
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
        };
        const start_chat = () =>{
            fetch(`http://localhost:5000/newchat`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_id:localStorage.getItem('user_id'),user_id_2:id})
                })
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            navigate(`/chat/${data._id}`)
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        }
    return(
        <>
            <div className='page'>
                <h1>{username} profile</h1>
                <img src={image_path} width="100px" height="100px" style={{borderRadius:'50%'}}/>
                <p>name:{username}</p>
                <p>bio:{bio}</p>
                <p>followers:{userdata.followers} following:{userdata.following} {userdata.date_joined}</p>
                <button onClick={()=>follow({id})}>follow</button>
                <button onClick={()=>start_chat()}>chat</button>
                <h2>posts</h2>
                <div className='container'>
                    {userposts.map((post) => (
                            <div key={post._id} className="post">
                                <h3 onClick={()=>navigate(`/post/${post._id}`)}>{post.title}</h3>
                                <p>{post.description}</p>
                                {post.content && (
                                    <div>
                                        {post.content.includes(".mp4") ? (
                                            <video width="320" height="240" controls>
                                                <source
                                                    src={
                                                `http://localhost:5000/files/${post.content}`
                                                    }
                                                    type="video/mp4"
                                                />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <img width="320" height="240"
                                                src={
                                                `http://localhost:5000/files/${post.content}`
                                                }
                                                alt="Post Media"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                       
                </div>
            </div>
        </>
    )
}
export default User;