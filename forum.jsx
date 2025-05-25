import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
function Forum(){
    const {id} = useParams()
     const navigate = useNavigate();
    const [topics,settopics] = useState([])
     useEffect(() => {
            fetch(`http://localhost:5000/forum/${id}`)
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            settopics(data)
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        },[]);
    return(
        <div className="page">
              {topics.map((topic) => (<div key={topic._id} >
                <h2 onClick={()=>navigate(`/topic/${topic._id}`)}>{topic.name}</h2>
               <p>{topic.posts.length} posts</p>
                </div>))}
        </div>
    )
}
export default Forum;