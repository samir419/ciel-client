import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
function Topic(){
    const {id} = useParams()
      const [refresh,setrefresh]= useState(false);
     const navigate = useNavigate();
    const [posts,setposts] = useState([])
    const [topic,settopic] = useState({})
     useEffect(() => {
            fetch(`http://localhost:5000/topic/${id}`)
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            setposts(data.posts)
            settopic(data)
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        },[refresh]);
    return(
        <div className="page">
            <h1>{topic.name}</h1>
           <div className="container">
                <div>
                     <h2>create post</h2>
                    <iframe name='uploadFrame' ></iframe>
                    <form action={`http://localhost:5000/createforumpost`} method='post' encType="multipart/form-data" target='uploadFrame'>
                        <input type="file" name="file" id="" />
                        <input type="text" name='title' placeholder='title'/>
                        <textarea name="description" id="" placeholder='description'></textarea>
                        <select name="type" id="">
                            <option value="none">none</option>
                            <option value="video">video</option>
                            <option value="image">image</option>
                            <option value="audio">audio</option>
                        </select>
                        <input type="text" name="topic" value={id} />
                        <input type="text" name="user" value={localStorage.getItem('user_id')} style={{display:'none'}}/>
                        <button type="submit" onClick={()=>  setrefresh(prev=>!prev)}>upload</button>
                    </form>
                </div>
                <div className="container">
                    {posts.map((post) => (<div key={post._id} className="post">
                        <h3 onClick={()=>navigate(`/post/${post._id}`)}>{post.title}</h3>
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
                    </div>))}
                </div>
           </div>
          
        </div>
    )
}
export default Topic;