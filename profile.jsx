import React, { useState,useEffect  } from 'react';
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
function Ciel_profile(){
     const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [bio, setbio] = useState('');
    const [image_path,setimage_path] = useState('');
    const [userposts, setuserposts] = useState([]);
    const [refresh,setrefresh] = useState(false)

    const [chats,setchats] = useState([])

    const api = `http://localhost:5000/update_user/${localStorage.getItem('user_id')}`
    const post_api = `http://localhost:5000/create_post/${localStorage.getItem('user_id')}`

     useEffect(() => {
        fetch(`http://localhost:5000/user/${localStorage.getItem('user_id')}`)
        .then(response => response.json())  
        .then(data => {
        console.log(data); 
        setUsername(data.name)
        setbio(data.bio)
        setimage_path(`http://localhost:5000/files/${data.profile_pic}`)
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });

        fetch(`http://localhost:5000/posts/${localStorage.getItem('user_id')}`)
        .then(response => response.json())  
        .then(data => {
        console.log(data); 
        setuserposts(data)
        console.log(userposts)
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });

        fetch(`http://localhost:5000/chats/${localStorage.getItem('user_id')}`)
        .then(response => response.json())  
        .then(data => {
        console.log(data); 
        setchats(data)
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
    },[refresh]);

    const handledelete = (postId) => {
        fetch(`http://localhost:5000/delete/${postId}`,{
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
        setrefresh(prev => !prev)
    };

    return(
        <div className='page'>
            <h1>my profile</h1>
            
                <img src={image_path} alt="" width="100px" height="100px"/>
                <p>name:{username}</p>
                <p>bio:{bio}</p>
                <h3>chats</h3>
                {chats.map((post) => (<p key={post._id} onClick={()=>navigate(`/chat/${post._id}`)}>{post.owner.name},{post.members[1].name} members:{post.members.length}</p>))}
                <h2>posts</h2>
                <div className='container'>
                        {userposts.map((post) => (
                            <div key={post._id} className="post">
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
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
                                <button onClick={()=>handledelete(post._id)}>delete</button>
                            </div>
                        ))}
                </div>
            
           
            <div className='container'>
               <div style={{width:'40%'}}>
                    <h2>edit profile</h2>
                    <form action={api} method='post' encType="multipart/form-data">
                            <label htmlFor="">profile picture</label>
                            <input type="file" name="file" id="" />
                            <label htmlFor="">user name</label>
                            <input type="text" name='username' placeholder='name' value={username}/>
                            <label htmlFor="">bio</label>
                            <textarea name="bio" id="" placeholder='bio' value={bio}></textarea>
                            <button type="submit" onClick={()=> navigate("/cielprofile")}>upload</button>
                    </form>
               </div>
               <div  style={{width:'40%'}}>
                    <h2>create post</h2>
                    <iframe name='uploadFrame' style={{display:'none'}}></iframe>
                        <form action={post_api} method='post' encType="multipart/form-data" target='uploadFrame'>
                            <input type="file" name="file" id="" />
                            <input type="text" name='title' placeholder='title'/>
                            <textarea name="description" id="" placeholder='description'></textarea>
                            <select name="type" id="">
                                <option value="none">none</option>
                                <option value="video">video</option>
                                <option value="image">image</option>
                                <option value="audio">audio</option>
                            </select>
                            <button type="submit" onClick={()=> window.location.reload(true)}>upload</button>
                        </form>
               </div>
            </div>
          
            <div className='container'>
             
            </div>
        </div>
    )
}
export default Ciel_profile;