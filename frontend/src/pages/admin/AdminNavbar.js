
import { Link } from 'react-router-dom';
import './css/admin-navbar.css';

const AdminNavbar = () => {
    return (
        <nav className="admin-navbar">
            <h1 className="logo">Admin Dashboard</h1>
            <ul className="nav-links">
                <li>
                    <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/admin/users">Users</Link>
                </li>
                <li>
                    <Link to="/admin/orders">Orders</Link>
                </li>
                <li>
                    <Link to="/admin/products">Products</Link>
                </li>
                <li>
                    <Link to="/admin/settings">Settings</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;
