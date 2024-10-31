// src/pages/user/UserRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/user/Login';
import Signup from '../pages/user/Signup';
import { Myorder } from '../pages/user/Myorder';
import GoogleLoginHandler from "../pages/user/GoogleLoginHandler.js";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/google-login" element={<GoogleLoginHandler />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myOrders" element={<Myorder />} />
        </Routes>
    );
};

export default UserRoutes;
