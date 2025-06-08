import React, { useState,useEffect  } from 'react';
import { Outlet, Link } from "react-router-dom";
function Products(){
    const apiUrl = import.meta.env.VITE_API_URL;
     const [products, setproducts] = useState([]);

    useEffect(() => {
             fetch(`${apiUrl}/products`)
             .then(response => response.json())  
             .then(data => {
             console.log(data); 
             setproducts(data)
             })
             .catch(error => {
             console.error('Error fetching data:', error);
             });
         },[]);
    return(
        <div className="social-home">
             <h1 className="header">market place</h1>
             <div className="post-grid">
               {products.map((product) => (
                 <div className="post-card" key={product.id}>
                   <h2 className="post-title"><Link to={`/product/${product._id}`}>{product.name}</Link></h2>
                   <p style={{display:'inline'}}>{product.description}</p>
                   <div className="media-container">
                     <img width="auto" height="240px" src={`${apiUrl}/files/${product.picture}`}alt="post picture" style={{maxHeight:'240px',width:'auto'}}/>
                   </div>
                   <div className="like-count">${product.price} quantity: {product.quantity}</div>
                 </div>
               ))}
             </div>
        </div>
       
    )
}
export default Products;