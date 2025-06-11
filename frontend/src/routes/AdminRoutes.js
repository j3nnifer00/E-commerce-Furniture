import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'; // useLogout 훅

import AdminDashboard from '../pages/admin/Admin';
import ManageOrders from '../pages/admin/ManageOrders';
import ManageProducts from '../pages/admin/ManageProducts';
import ManageUsers from '../pages/admin/ManageUsers';
import RegisterProduct from '../pages/admin/RegisterProduct';

const AdminRoutes = () => {
    const [isAdmin, setIsAdmin] = useState(null); // 초기 상태 null로 설정
    const navigate = useNavigate();
    const { logout } = useLogout(); // useLogout 훅 사용

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            // user가 없으면 로그인 페이지로 리디렉션
            navigate('/user/login');
            return;
        }

        const { token } = user;

        if (!token) {
            // token이 없으면 로그아웃 처리 후 로그인 페이지로 리디렉션
            logout(); // 토큰이 없으면 로그아웃 처리
            return;
        }

        // admin-only API 호출하여 관리자인지 확인
        const verifyAdmin = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/admin/verify-admin`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Access denied');
                }

                const data = await response.json();

                // isAdmin 값을 응답에서 받아서 상태 변경
                if (data.isAdmin) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false); // 관리자가 아니면 false로 설정
                }
            } catch (error) {
                console.error("Admin verification failed:", error);
                setIsAdmin(false); // 오류가 발생하면 관리자가 아니므로 false로 설정
            }
        };

        verifyAdmin();
    }, [navigate, logout]);

    // 아직 isAdmin이 결정되지 않은 상태이면 로딩 표시
    if (isAdmin === null) {
        return <div>Loading...</div>;
    }

    // 관리자가 아닌 경우 접근 거부 메시지
    if (isAdmin === false) {
        return <div><h2>You don't have access to this page</h2></div>;
    }

    // 관리자인 경우에만 Routes를 렌더링
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
