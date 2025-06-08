import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
function User(){
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [bio, setbio] = useState('');
    const [image_path,setimage_path] = useState('');
    const [userposts, setuserposts] = useState([]);
     const [userdata, setuserdata] = useState({followers:0,following:0,date_joined:0 });
    const [products,setproducts] = useState([])
     const [refresh,setrefresh] = useState(false);
    const [forums,setforums] = useState([]);
      const [activeTab, setActiveTab] = useState('posts');
    
    const {id} = useParams()
      useEffect(() => {
            fetch(`${apiUrl}/user/${id}`)
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            setUsername(data.name)
            setbio(data.bio)
            setimage_path(`${apiUrl}/files/${data.profile_pic}`)
            setuserdata({ followers: data.followers.length, following: data.following.length, date_joined: data.createdAt });
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
    
            fetch(`${apiUrl}/posts/${id}`)
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            setuserposts(data)
            console.log(userposts)
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });

            fetch(`${apiUrl}/products/${id}`)
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            setproducts(data)
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });

            fetch(`${apiUrl}/myforums/${id}`)
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            setforums(data)
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        },[]);
        const follow = (id) => {
            fetch(`${apiUrl}/followuser/${id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user:localStorage.getItem('user_id'),receiver:id})
                })
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            setuserdata(prev=>({...prev,followers:userdata.followers+1}))
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        };
         const unfollow = (id) => {
            fetch(`${apiUrl}/unfollowuser/${id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user:localStorage.getItem('user_id'),receiver:id})
                })
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
           setuserdata(prev=>({...prev,followers:userdata.followers-1}))
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        };
        const start_chat = () =>{
            fetch(`${apiUrl}/newchat`,{
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

        const renderTabContent = () => {
            switch (activeTab) {
              case 'posts':
                return (
                  <div>
                    <div className="post-grid">
                        {userposts.map((post) => (
                        <div className="post-card" key={post.id}>
                            <h3 onClick={()=>navigate(`/post/${post._id}`)}>{post.title}</h3>
                            <div className="media-preview">
                            {post.type === 'image' && (
                                <img src={ `${apiUrl}/files/${post.content}`} alt={post.title} style={{maxHeight:'240px',width:'auto'}}/>
                            )}
                            {post.type === 'video' && (
                                <video controls style={{maxHeight:'240px',width:'auto'}}>
                                <source src={ `${apiUrl}/files/${post.content}`} type="video/mp4" />
                                </video>
                            )}
                            {post.type === 'audio' && (
                                <audio controls>
                                <source src={ `${apiUrl}/files/${post.content}`} type="audio/mpeg" />
                                </audio>
                            )}
                            {post.type === 'none' && (
                                <p className="text-media">{post.description.slice(0, 50)}</p>
                            )}
                            </div>
                            <div className="like-count">🩵 {post.likes.length} likes </div>
                        </div>
                        ))}
                    </div>
                  </div>
                );
              case 'products':
                return (
                  <div>
                    <div className="sample-content">
                        {products.map((product) => (
                            <div key={product._id} className="post">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <img width="auto" height="240" src={`${apiUrl}/files/${product.picture}`}alt="Product picture"/>
                                <p>price: ${product.price}  amount:{product.quantity}</p>
                            </div>
                        ))}
                    </div>
                  </div>
                );
              case 'forums':
                return (
                  <div>
                    <div className="sample-content">
                        {forums.map((forum) => (<div key={forum._id} >
                            <h2 onClick={()=>navigate(`/forum/${forum._id}`)}>{forum.name}</h2>
                            <p>{forum.members.length} members</p>
                        </div>))}
                    </div>
                  </div>
                );
              default:
                return null;
            }
          };
    return(
     
        <div className="profile-page">
      <header className="profile-header">
        <img className="avatar" src={image_path} alt="User Avatar" />
        <div className="profile-info">
          <h2>{username}</h2>
          <p>{bio}</p>
          <p>followers:{userdata.followers} following:{userdata.following} {userdata.date_joined}</p>
          <button onClick={()=>follow({id})}>follow</button>
          <button onClick={()=>unfollow({id})}>unfollow</button>
          <button onClick={()=>start_chat()}>chat</button>
        </div>
      </header>

      <div className="tabs">
        <button className={activeTab === 'posts' ? 'active' : ''} onClick={() => setActiveTab('posts')}>Posts</button>
        <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</button>
        <button className={activeTab === 'forums' ? 'active' : ''} onClick={() => setActiveTab('forums')}>Forums</button>
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
    )
}
export default User;