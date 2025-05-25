import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
function Myforum(){
    const {id} = useParams()
     const navigate = useNavigate();
    const [topics,settopics] = useState([]);
    const [topicname,settopicname] = useState('')
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
        const addtopic = () =>{
            console.log("Sending:", { topic_name: topicname, forum: id });
            fetch(`http://localhost:5000/createtopic`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({topic_name:topicname,forum:id})
                })
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        }
    return(
        <div className="page">
              {topics.map((topic) => (<div key={topic._id} >
                <h2 onClick={()=>navigate(`/topic/${topic._id}`)}>{topic.name}</h2>
               <p>{topic.posts.length} members</p>
                </div>))}
            <div>
                <form action="">
                    <label htmlFor="">name</label>
                    <input type="text" name="name"  onChange={(e) => settopicname(e.target.value)}/>
                    <button type="submit" onClick={()=>addtopic()}>add topic</button>
                </form>
            </div>
        </div>
    )
}
export default Myforum;