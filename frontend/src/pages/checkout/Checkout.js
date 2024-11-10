import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { useAuthContext } from '../../hooks/useAuthContext'; // 추가
import { jwtDecode } from 'jwt-decode';
import "./checkout.css";

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useContext(ShopContext);
    const { user } = useAuthContext(); // 현재 사용자 정보 가져오기
    const productIds = Object.keys(cartItems);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        userId: '',
        name: '', // 로그인한 사용자의 이름
        email: '', // 로그인한 사용자의 이메일
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        paymentMethod: 'Credit Card'
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (productIds.length === 0) {
            setIsLoading(false);
            return;
        }

        if(user) {
            fetchUser();
        }
        fetchProducts();
    }, [user, cartItems]);




    const fetchUser = async() => {

        try {
            const userId = jwtDecode(user.token).userId;
            const response = await fetch(`/api/v1/user/${userId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch user details');

            const userData = await response.json();
            setFormData({
                ...formData,
                userId: userData.id || '',
                name: userData.name || '',
                email: userData.email || '',
                phone: userData.phone || '',
                address1: userData.street || '',
                address2: userData.apartment || '',
                city: userData.city || '',
                state: userData.state || '',
                country: userData.country || '',
                zip: userData.zip || '',
            });
        } catch (error) {
            console.error('Error fetching user details:', error);
            setError("Failed to load user details.");
        }
    }

    const fetchProducts = async () => {
        if (productIds.length === 0) {
            setIsLoading(false);
            return;
        }

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



    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const orderItems = products.map((product) => {
            const quantity = cartItems[product._id]?.quantity;
            if (quantity) {
                return {
                    product: product._id,
                    quantity: quantity,
                };
            }
        }).filter(item => item !== undefined);

        const orderData = {
            orderItems: orderItems,
            user: {
                id: formData.userId, // 사용자의 ID
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: {
                    shippingAddress1: formData.address1,
                    shippingAddress2: formData.address2,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip,
                    country: formData.country,
                }
            },
            paymentMethod: formData.paymentMethod,
        };

        try {
            const response = await fetch('/api/v1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to place the order.');
            }

            const result = await response.json();

            if (result.success === true) {
                clearCart();
                alert('Checkout successful!');
                navigate('/checkout/orderConfirmation', { state: { order: result } });
            }
        } catch (error) {
            setError(error.message || 'Failed to complete checkout. Please try again.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="orderSummary">
                    <h3>Order Summary</h3>
                    {products.length === 0 ? (
                        <p>No items in cart.</p>
                    ) : (
                        Object.keys(cartItems).map((productId) => {
                            const product = products.find((p) => p._id === productId);
                            const quantity = cartItems[productId]?.quantity;

                            if (!product) {
                                return <p key={productId}>Product not found</p>;
                            }

                            return (
                                <div key={product._id} className="checkout-item">
                                    <img src={product.image} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <p>Price: ${product.price}</p>
                                    <p>Quantity: {quantity}</p>
                                </div>
                            );
                        })
                    )}
                    <h3 className="total-price">Total Price: ${totalPrice}</h3>
                </div>

                <div className="form-section">
                    <div className="shipping-info">
                        <h3>Shipping Information</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="address1"
                            placeholder="Address 1"
                            value={formData.address1}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="address2"
                            placeholder="Address 2 (Optional)"
                            value={formData.address2}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="zip"
                            placeholder="ZIP Code"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="payment-method">
                        <h3>Payment Method</h3>
                        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>
                </div>

                <button type="submit">Complete Checkout</button>
            </form>
        </div>
    );
};

export default Checkout;
