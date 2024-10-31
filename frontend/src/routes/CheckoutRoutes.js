// src/pages/checkout/CheckoutRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cart from '../pages/checkout/Cart';
import Checkout from '../pages/checkout/Checkout';
import OrderConfirmation from '../pages/checkout/OrderConfirmation';

const CheckoutRoutes = () => {
    return (
        <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Checkout />} />
            <Route path="/orderConfirmation" element={<OrderConfirmation />} />
        </Routes>
    );
};

export default CheckoutRoutes;
