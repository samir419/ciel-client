import React, { useState,useEffect  } from 'react';
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
function Ciel_profile(){
    const apiUrl = import.meta.env.VITE_API_URL;
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

    const [post_display,setpostdisplay]=useState('flex')
    const [form_display,setformdisplay]=useState('none')
    const [product_display,setproductdisplay]=useState('none')


    const api = `${apiUrl}/update_user/${localStorage.getItem('user_id')}`
    const post_api = `${apiUrl}/create_post/${localStorage.getItem('user_id')}`
    const product_api =  `${apiUrl}/create_product/${localStorage.getItem('user_id')}`


     useEffect(() => {
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
    },[]);

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
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
        //setrefresh(prev => !prev)
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
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
    };

    return(
        <div className='page'>
           <div className='container'>
                <div className='container'>
                    <div>
                        <img src={image_path} width="100px" height="100px" style={{borderRadius:'50%'}}/>
                    </div>
                    <div>
                        <p>name:{username}</p>
                        <p>bio:{bio}</p>
                    </div>
                    <div>
                        <h3>chats</h3>
                        {chats.map((post) => (<p key={post._id} onClick={()=>navigate(`/chat/${post._id}`)}>{post.owner.name},{post.members[1].name} members:{post.members.length}</p>))}
                    </div>
                </div>
                <div>
                    <h2>edit profile</h2>
                    <form action={api} method='post' encType="multipart/form-data" target='uploadFrame'>
                            <label >profile picture</label>
                            <input type="file" name="file" />
                            <label >user name</label>
                            <input type="text" name='username' placeholder='name' value={username}  onChange={(e)=>setUsername(e.target.value)}/>
                            <label >bio</label>
                            <textarea name="bio" placeholder='bio' value={bio} onChange={(e)=>setbio(e.target.value)}></textarea>
                            <button type="submit"  >upload</button>
                    </form>
                </div>
                
           </div>
               
               
                
               <nav> 
                    <h3 onClick={()=>{setpostdisplay('flex');setproductdisplay('none');setformdisplay('none')}}>posts</h3>
                    <h3 onClick={()=>{setpostdisplay('none');setproductdisplay('flex');setformdisplay('none')}}>products</h3> 
                    <h3 onClick={()=>{setpostdisplay('none');setproductdisplay('none');setformdisplay('flex')}}>forums</h3>
                </nav>
                <div className='container' style={{display:post_display}}>
                        <div className='container'>
                            <h2>create post</h2>
                                <iframe name='uploadFrame' style={{display:'none'}}></iframe>
                                <form action={post_api} method='post' encType="multipart/form-data" target='uploadFrame'>
                                    <input type="file" name="file"  />
                                    <input type="text" name='title' placeholder='title'/>
                                    <textarea name="description"  placeholder='description'></textarea>
                                    <select name="type">
                                        <option value="none">none</option>
                                        <option value="video">video</option>
                                        <option value="image">image</option>
                                        <option value="audio">audio</option>
                                    </select>
                                    <button type="submit">upload</button>
                                </form>
                       </div>
                       <div className='container'>
                            {userposts.map((post) => (
                                    <div key={post._id} className="post">
                                        <h3 onClick={()=>navigate(`/post/${post._id}`)}>{post.title}</h3>
                                        <p>{post.description}</p>
                                        {post.content && (
                                            <div>
                                                {post.type == 'video' ? (
                                                    <video width="auto" height="240" controls>
                                                        <source
                                                            src={
                                                        `${apiUrl}/files/${post.content}`
                                                            }
                                                            type="video/mp4"
                                                        />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ) : post.type == 'image' ? (
                                                    <img width="auto" height="240"
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
                                        <button onClick={()=>handledelete(post._id)}>delete</button>
                                    </div>
                                ))}
                       </div>
                      
                </div>
               
                <div className='container'  style={{display:product_display}}>
                    <div className='container'>
                        <h2>create product</h2>
                            <form action={product_api} method='post' encType="multipart/form-data" target='uploadFrame'>
                                <input type="file" name="file"  />
                                <input type="text" name='name' placeholder='product name'/>
                                <textarea name="description"  placeholder='description'></textarea>
                                <input type="number" name='price' placeholder='price'/>
                                <input type="number" name="quantity" placeholder='quantity' />
                                <button type="submit">upload</button>
                            </form>
                      </div>
                      <div className='container'>
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
              
                <div className='container' style={{display:form_display}}>
                    {forums.map((forum) => (<div key={forum._id} >
                        <h2 onClick={()=>navigate(`/myforum/${forum._id}`)}>{forum.name}</h2>
                        <p>{forum.members.length} members</p>
                    </div>))}
                    <form>
                        <label htmlFor="">forum name</label>
                        <input type="text" name='forum_name'  onChange={(e)=>setforumname(e.target.value)}/>
                        <textarea name="description" id="" onChange={(e)=>setforumdesc(e.target.value)}></textarea>
                        <button type='submit' onClick={()=>createforum()}>create forum</button>
                    </form>
                </div>
            
           
            <div className='container'>
               <div style={{width:'40%'}}>
                   
               </div>
               <div  style={{width:'40%'}}>
                  
               </div>
               <div  style={{width:'40%'}}>
                   
               </div>
            </div>
          
            <div className='container'>
             
            </div>
        </div>
    )
}
export default Ciel_profile;