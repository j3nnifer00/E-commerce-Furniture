// src/pages/admin/AdminRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminDashboard from '../pages/admin/Admin';
import ManageOrders from '../pages/admin/ManageOrders';
import ManageProducts from '../pages/admin/ManageProducts';
import ManageUsers from '../pages/admin/ManageUsers';
import RegisterProduct from '../pages/admin/RegisterProduct';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/orders" element={<ManageOrders />} />
            <Route path="/users" element={<ManageUsers />} />
            <Route path="/products" element={<ManageProducts />} />
            <Route path="/registerProduct" element={<RegisterProduct />} />
            <Route path="/registerProduct/:productId" element={<RegisterProduct />} />
        
        </Routes>
    );
};

export default AdminRoutes;
