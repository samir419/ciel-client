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
        <div className='page'>
            <h1>market place</h1>
            <div className='container'>
                {products.map((product) => (
                    <div key={product._id} className="post">
                        <h3><Link to={`/product/${product._id}`}><h1>{product.name}</h1></Link></h3>
                        <p>{product.description}</p>
                        <img width="auto" height="240" src={`${apiUrl}/files/${product.picture}`}alt="Product picture"/>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
       
    )
}
export default Products;