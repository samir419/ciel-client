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
        <div className='container'>
            <div className="product">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <Link to={`/user/${product.seller._id}`}>{product.seller.name}</Link>
                <img width="auto" height="240" src={`${apiUrl}/files/${product.picture}`}alt="Product picture"/>
                <p>price: ${product.price} quantity:{product.quantity}</p>
                <p>Comments: {product.comments.length}</p>
                <ul>
                    {product.comments.map((comment, index) => (
                        <li key={index}>{comment.author.name}:{comment.content}</li>
                    ))}
                </ul>

                <input
                    type="text"
                    placeholder="Add a comment"
                    className="comment-input"
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
    )
}
export default Product;