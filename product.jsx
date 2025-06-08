import React, { useState,useEffect  } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
function Product(){
    const apiUrl = import.meta.env.VITE_API_URL;
     const {id} = useParams();
     const [product, setproduct] = useState({
        name: "",
        description: "",
        price: "",
        seller: {},
        picture: "",
        quantity: '',
        comments: []
     });
     const [commentInput, setCommentInput] = useState("");
     const [refresh,setrefresh]= useState(false);
    useEffect(() => {
        console.log('sending request')
        fetch(`${apiUrl}/product/${id}`)
        .then(response => response.json())  
        .then(data => {
        console.log(data); 
        setproduct(data)
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
        console.log(product)
    },[refresh]);

    const handleAddComment = () => {
        fetch(`${apiUrl}/comment_product/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user:localStorage.getItem('user_id'),message:commentInput})
            })
        .then(response => response.json())  
        .then(data => {
        console.log(data); 
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
        setrefresh(prev=>!prev)
    };
    return(
        <div className="post-container">
             <div className="post-card">
               <h2 className="post-title">{product.name}</h2>
               <p className="post-description">{product.description}</p>
               <p className="post-author">
                 Posted by <Link to={`/user/${product.seller._id}`}>{product.seller.name}</Link>
               </p>
       
               <div className='media-wrapper'>
                     <img src={`${apiUrl}/files/${product.picture}`}alt="Product picture"/>
               </div>
       
               <div className="post-actions">
                  <p>price: ${product.price} quantity:{product.quantity}</p>
               </div>
       
               <div className="comments-section">
                 <h3>Comments ({product.comments.length})</h3>
                 <ul className="comment-list">
                   {product.comments.map((comment, i) => (
                     <li key={i}><strong>{comment.author.name}:</strong> {comment.content}</li>
                   ))}
                 </ul>
       
                 <div className="comment-form">
                        <input
                        type="text"
                        placeholder="Add a comment"
                        onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <button
                        onClick={() => handleAddComment()}
                        className="comment-button"
                    >
                        Add Comment
                    </button>
                 </div>
               </div>
             </div>
           </div>
    )
}
export default Product;