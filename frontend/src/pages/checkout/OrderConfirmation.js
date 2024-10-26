import { useLocation } from 'react-router-dom';
import './css/order-confirmation.css'; // Assuming you want to create a CSS file for styling

const OrderConfirmation = () => {
    const location = useLocation();
    const order = location.state?.order.order || {}; // Default to an empty object if state is undefined

    return (
        <div className="order-confirmation">
            <h1>Order Confirmation</h1>
            {order._id ? (  // Check if the order has an ID
                <div className="order-details">
                    <h2>Order Details</h2>
                    <p><strong>Order ID:</strong> {order._id}</p><br />
                    <p><strong>Date Ordered:</strong> {new Date(order.dateOrdered).toLocaleString()}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p><br />

                    <h3>User Information</h3>
                    <p><strong>Name:</strong> {order.user.name}</p>
                    <p><strong>Email:</strong> {order.user.email}</p>
                    <p><strong>Phone:</strong> {order.user.phone}</p><br />
                    <h4>Shipping Address</h4>
                    <p>{order.user.address.shippingAddress1}</p>
                    {order.user.address.shippingAddress2 && <p>{order.user.address.shippingAddress2}</p>}
                    <p>{order.user.address.city}, {order.user.address.state}, {order.user.address.zip}, {order.user.address.country}</p>

                </div>
            ) : (
                <p>No order details available.</p>
            )}
        </div>
    );
}

export default OrderConfirmation;
