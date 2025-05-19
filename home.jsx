import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Ciel_posts from './posts';
function Chome(){
    const id = localStorage.getItem('user_id')
    return(
        <div className='page'>
            <h1>ciel home page</h1>
            <Ciel_posts/>
        </div>
    )
}
export default Chome;