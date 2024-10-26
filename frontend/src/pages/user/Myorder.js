import React, { useEffect, useState, useContext } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import "./css/myorder.css"
import { useNavigate } from 'react-router-dom';

export const Myorder = () => {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
        fetchOrders();
    }, [user]);

    const fetchOrders = async () => {
        if (user && user.token) { // user와 token이 존재하는 경우에만 요청
            try {
                const response = await fetch(`/api/v1/orders/get/userOrders/`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
      
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
      
                const data = await response.json();
                setOrders(data.orderList);
            } catch (error) {
                console.error('Failed to fetch orders', error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false); // user가 없을 경우 로딩 종료
        }
    };

    if (loading) return <p>Loading orders...</p>;

    return (
        <div className="myorder">
            <h1 className="myorder-title">My Orders</h1>
            {orders.length > 0 ? (
                <ul className="order-list">
                    {orders.map((order) => (
                        <li key={order._id} className="order-item">
                            <h2 className="order-id">Order ID: {order._id}</h2>
                            <div className="order-products">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="order-product">
                                        <img src={item.product.image} alt={item.product.name} className="product-image"/>
                                        <h3 className="product-name">{item.product.name}</h3>
                                        <p className="product-price">Price: ${item.price}</p>
                                        <p className="product-quantity">Quantity: {item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="order-total">Total Price: ${order.totalPrice}</p>
                            <p className="order-status">Status: {order.status}</p>
                            <p className="order-date">Ordered on: {new Date(order.dateOrdered).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};
