import React, { useState,useEffect  } from 'react';
import { useNavigate } from "react-router-dom";

const Ciel_profile = () => {
     const apiUrl = import.meta.env.VITE_API_URL;
     const api = `${apiUrl}/update_user/${localStorage.getItem('user_id')}`
     const post_api = `${apiUrl}/create_post/${localStorage.getItem('user_id')}`
     const product_api =  `${apiUrl}/create_product/${localStorage.getItem('user_id')}`
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [bio, setbio] = useState('');
    const [image_path,setimage_path] = useState('');
    const [userposts, setuserposts] = useState([]);
    const [refresh,setrefresh] = useState(false);
    const [forums,setforums] = useState([]);
    const [forumname,setforumname] = useState('');
    const [forumdesc,setforumdesc] = useState('')
    const [chats,setchats] = useState([]);
    const [products,setproducts] = useState([])

  const [activeTab, setActiveTab] = useState('posts');
  const [editOpen, setEditOpen] = useState(false);
  const [opensidebar,setopensidebar] = useState(false)
 

    useEffect(() => {
         fetch_user()
      },[]);
  
      const fetch_user = () =>{
          fetch(`${apiUrl}/user/${localStorage.getItem('user_id')}`)
          .then(response => response.json())  
          .then(data => {
          console.log(data); 
          setUsername(data.name)
          setbio(data.bio)
          setimage_path(`${apiUrl}/files/${data.profile_pic}`)
          })
          .catch(error => {
          console.error('Error fetching data:', error);
          });
  
          fetch(`${apiUrl}/posts/${localStorage.getItem('user_id')}`)
          .then(response => response.json())  
          .then(data => {
          console.log(data); 
          setuserposts(data)
          console.log(userposts)
          })
          .catch(error => {
          console.error('Error fetching data:', error);
          });
  
          fetch(`${apiUrl}/chats/${localStorage.getItem('user_id')}`)
          .then(response => response.json())  
          .then(data => {
          console.log(data); 
          setchats(data)
          })
          .catch(error => {
          console.error('Error fetching data:', error);
          });
  
          fetch(`${apiUrl}/myforums/${localStorage.getItem('user_id')}`)
          .then(response => response.json())  
          .then(data => {
          console.log(data); 
          setforums(data)
          })
          .catch(error => {
          console.error('Error fetching data:', error);
          });
  
          fetch(`${apiUrl}/products/${localStorage.getItem('user_id')}`)
          .then(response => response.json())  
          .then(data => {
          console.log(data); 
          setproducts(data);
          })
          .catch(error => {
          console.error('Error fetching data:', error);
          });
      };

      const handledelete = (postId) => {
        fetch(`${apiUrl}/delete/${postId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user:localStorage.getItem('user_id')})
            })
        .then(response => response.json())  
        .then(data => {
        console.log(data); 
         fetch_user()
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
       
    };
    const createforum = () => {
        fetch(`${apiUrl}/createforum`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({forum_name:forumname,description:forumdesc,user:localStorage.getItem('user_id')})
            })
        .then(response => response.json())  
        .then(data => {
        console.log(data); 
         fetch_user()
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
       
    };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div>
            <form action={post_api} method='post' encType="multipart/form-data" target='uploadFrame' className='form' onSubmit={()=>alert('uploaded')}>
                <input type="file" name="file"  />
                <input type="text" name='title' placeholder='title'/>
                <textarea name="description"  placeholder='body'></textarea>
                <label htmlFor="">type</label>
                <select name="type">
                    <option value="none">none</option>
                    <option value="video">video</option>
                    <option value="image">image</option>
                    <option value="audio">audio</option>
                </select>
                <button type="submit">upload</button>
            </form>
            <div className="post-grid">
                {userposts.map((post) => (
                <div className="post-card" key={post.id}>
                    <h3 onClick={()=>navigate(`/post/${post._id}`)}>{post.title}</h3>
                    <div className="media-preview">
                    {post.type === 'image' && (
                        <img src={ `${apiUrl}/files/${post.content}`} alt={post.title} style={{maxHeight:'200px',width:'auto'}}/>
                    )}
                    {post.type === 'video' && (
                        <video controls style={{maxHeight:'200px',width:'auto'}}>
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
                    <div className="like-count">🩵 {post.likes.length} likes  <button onClick={()=>handledelete(post._id)}>delete</button></div>
                </div>
                ))}
            </div>
          </div>
        );
      case 'products':
        return (
          <div>
           <form action={product_api} method='post' encType="multipart/form-data" target='uploadFrame' className='form' onSubmit={()=>{alert('uploaded')}}>
                <input type="file" name="file"  />
                <input type="text" name='name' placeholder='product name'/>
                <textarea name="description"  placeholder='description'></textarea>
                <input type="number" name='price' placeholder='price'/>
                <input type="number" name="quantity" placeholder='quantity' />
                <button type="submit" >upload</button>
            </form>
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
             <form className='form'>
                <label htmlFor="">forum name</label>
                <input type="text" name='forum_name'  onChange={(e)=>setforumname(e.target.value)}/>
                <textarea name="description" id="" onChange={(e)=>setforumdesc(e.target.value)}></textarea>
                <button type='submit' onClick={()=>createforum()}>create forum</button>
            </form>
            <div className="sample-content">
                {forums.map((forum) => (<div key={forum._id} >
                    <h2 onClick={()=>navigate(`/myforum/${forum._id}`)}>{forum.name}</h2>
                    <p>{forum.members.length} members</p>
                </div>))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <img className="avatar" src={image_path} alt="User Avatar" />
        <div className="profile-info">
          <h2>{username}</h2>
          <p>{bio}</p>
          <button className="edit-btn" onClick={() => setEditOpen(true)}>Edit Profile</button>
           <button className="edit-btn" onClick={() => setopensidebar(true)}>chats</button>
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

      {editOpen && (
        <div className="modal-backdrop" onClick={() => setEditOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Edit Profile</h3>
            <form action={api} method='post' encType="multipart/form-data" target='uploadFrame'>
                    <label >profile picture</label>
                    <input type="file" name="file" />
                    <input type="text" name='username' placeholder='name' value={username}  onChange={(e)=>setUsername(e.target.value)}/>
                    <textarea name="bio" placeholder='bio' value={bio} onChange={(e)=>setbio(e.target.value)}></textarea>
                    <button type="submit"  onClick={()=>{setUsername('');setbio('');setEditOpen(false);fetch_user()}}>upload</button>
            </form>
          </div>
        </div>
      )}
      {opensidebar && (
        <div className="modal-backdrop" onClick={() => setopensidebar(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>chats</h3>
            {chats.map((post) => (<p key={post._id} onClick={()=>navigate(`/chat/${post._id}`)}>{post.owner.name},{post.members[1].name} members:{post.members.length}</p>))}
          </div>
        </div>
      )}
      
           
       <iframe name='uploadFrame' style={{display:'block'}} onChange={()=>fetch_user()}></iframe>
    </div>
  );
};

export default Ciel_profile;
