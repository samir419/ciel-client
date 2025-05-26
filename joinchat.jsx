import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
function Join_chat(){
    const apiUrl = import.meta.env.VITE_API_URL;
     const {id} = useParams()
    const navigate = useNavigate();
      useEffect(() => {
                 fetch(`${apiUrl}/join_chat/${id}`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user:localStorage.getItem('user_id')})
                    })
                 .then(response => response.json())  
                 .then(data => {
                 navigate(`/chat/${id}`)
                 })
                 .catch(error => {
                 console.error('Error fetching data:', error);
                 });
             },[]);
    return(<></>)
}
export default Join_chat;