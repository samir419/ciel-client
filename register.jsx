import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";


function Cindex(){
    const apiUrl = import.meta.env.VITE_API_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [setUser] = useState(''); 
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            fetch(`${apiUrl}/signup`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:username,password:password})
                })
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            localStorage.setItem('user_id', data._id);
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
            navigate("/chome");
        } catch (err) {
            console.error('signup failed:', err);
        }
    };
    const handleLogin = async () => {
        try {
            fetch(`${apiUrl}/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:username,password:password})
                })
            .then(response => response.json())  
            .then(data => {
            console.log(data); 
            localStorage.setItem('user_id', data._id);
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
            navigate("/chome");
        } catch (err) {
            console.error('signup failed:', err);
        }
    };
    return(
        <>
            <div>
                <h1>log in</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>submit</button>
            </div>
            <div>
                <h1>sign up</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignup}>submit</button>
            </div>
        </>
    )
}
export default Cindex;