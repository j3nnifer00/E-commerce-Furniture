import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import AdminNavbar from './AdminNavbar';

const Admin = () => {

    const [allProducts, setAllProducts] = useState([]); // State to hold featured products
  

    const fetchAllProducts = async () => {
        try {
            const response = await fetch(`/api/v1/products/`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
        
            const data = await response.json();  // Use await to get the resolved data from the Promise

            setAllProducts(data);


        } catch (error) {
          console.error('Error fetching featured products:', error);
        }
    };
    

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if(!confirmDelete) return;

        try{
            const response = await fetch(`/api/v1/products/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                setAllProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Error deleting the product:", error)
        }
    }
    
    // Call the function
    useEffect(() => {
        fetchAllProducts();
      }, []);  // Empty dependency array means this effect runs once when the component mounts
    


    return (
    <div className="admin-pannel">
        <AdminNavbar />
        <div className="register-product"><Link to="/registerProduct"><button>Register new product</button></Link></div>
        <div className="product-list">
                <div className="product-items-container">
                    {allProducts.length > 0 ? (
                        allProducts.map(product => (
                            <div className="product-item" id={`product-${product._id}`}>
                                {product.image && product.image.length > 0 ? (
                                <img src={`/${product.image}`} alt={`product${product._id}`} />
                                ) : (
                                <p>No image available</p>
                                )}
                                <div className="product-item-cover-header">
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">${product.price}</p>
                                <p>stock: {product.countInStock}</p>
                                </div>
                                <Link to={`/registerProduct/${product._id}`}><button id="product-edit-btn">edit</button></Link>
                                <button id="product-delete-btn" onClick={() => handleDelete(product._id)}>delete</button>
                            </div>
                        ))
                        ) : (
                        <p>No products found.</p>  
                    )}
                </div>
            </div>
    </div>

)}

export default Admin;