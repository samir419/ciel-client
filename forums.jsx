import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Forums(){
    const apiUrl = import.meta.env.VITE_API_URL;
     const navigate = useNavigate();
    const [forums,setforums] = useState([])
     useEffect(() => {
            fetch(`${apiUrl}/forumlist`)
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            setforums(data)
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        },[]);
    return(
        <div className="page">
            <h1>forums</h1>
              {forums.map((forum) => (<div key={forum._id} >
                <h2 onClick={()=>navigate(`/forum/${forum._id}`)}>{forum.name}</h2>
                <p>{forum.description}</p>
               <p>{forum.members.length} members</p>
                </div>))}
        </div>
    )
}
export default Forums;