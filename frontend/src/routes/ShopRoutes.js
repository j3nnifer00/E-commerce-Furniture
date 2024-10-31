// src/pages/shop/ShopRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Product from '../pages/shop/Product';
import Shop from '../pages/shop/Shop';

const ShopRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/product/:productId" element={<Product />} />
            </Routes>
    );
};

export default ShopRoutes;
