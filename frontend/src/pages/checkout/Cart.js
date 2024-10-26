import { useState, useEffect, useContext } from "react";
import { ShopContext } from '../../context/ShopContext';
import { Link } from "react-router-dom";
import "./css/cart.css";

const Cart = () => {
    const { cartItems, totalPrice, addToCart, removeFromCart, deleteFromCart } = useContext(ShopContext);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const productIds = Object.keys(cartItems);

    const fetchCartProducts = async () => {
        try {
            const response = await fetch(`/api/v1/products?ids=${productIds.join(',')}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError("Failed to load products.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (Object.keys(cartItems).length === 0) { // 수정된 부분
            setIsLoading(false);
            return;
        }
        fetchCartProducts();
    }, [cartItems]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="shopping-cart">
            <h2>Your Cart</h2>
            {Object.keys(cartItems).length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {Object.keys(cartItems).map((productId) => {
                        const product = products.find((p) => p._id === productId);
                        const quantity = cartItems[productId].quantity;

                        if (!product) {
                            return <p key={productId}>Product not found</p>;
                        }

                        return (
                            <div key={productId} className="cart-item">
                                <Link to={`/product/${product._id}`}>
                                    <img src={product.image} alt={product.name} />
                                </Link>
                                <h3>{product.name}</h3>
                                <p>Price: ${product.price}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => removeFromCart(productId)}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => {
                                        const success = addToCart(productId, 1, product.price, product.countInStock); // 수정된 부분
                                        if (!success) {
                                            setError(`You got the last one of ${product.name}!`);
                                            setTimeout(() => {
                                                setError(null);
                                            }, 1000);
                                        }
                                    }}>+</button>
                                </div>
                                <button className="delete-btn" onClick={() => deleteFromCart(productId)}>X</button>
                            </div>
                        );
                    })}
                    <h3 className="total-price">Total Price: ${totalPrice}</h3>
                    {error && <div className="error">{error}</div>}
                    <Link to="/checkout"><button>Check Out</button></Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
