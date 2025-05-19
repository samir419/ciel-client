import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
function Chat(){
     const {id} = useParams()
     const [messages,setmessages] = useState([])
     const [message,setmessage] = useState('')
      useEffect(() => {
                 fetch(`http://localhost:5000/chat/${id}`)
                 .then(response => response.json())  
                 .then(data => {
                 console.log(data); 
                 setmessages(data.messages)
                 })
                 .catch(error => {
                 console.error('Error fetching data:', error);
                 });
             },[]);
    const new_message = () =>{
        fetch(`http://localhost:5000/chat-message/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sender:localStorage.getItem('user_id'),content:message})
            })
        .then(response => response.json())  
        .then(data => {
        console.log(data); 
        setmessage('')
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
    }
    return(
        <>
            <div>
                <h1>chat</h1>
                <div>
                    <p>chat url: {`http://localhost:3000/join_chat/${id}`}</p>
                    {messages.map((post) => (<p key={post.sender} className="post">{post.sender.name}:{post.content}</p>))}
                </div>
                <input type="text"  value={message} onChange={(e) => setmessage(e.target.value)}/><button onClick={()=>new_message()}>send</button>
            </div>
        </>
    )
}
export default Chat;