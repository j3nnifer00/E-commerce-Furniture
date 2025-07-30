// File for defining the navbar
import { CiShoppingBasket, CiUser, CiMenuBurger } from "react-icons/ci";
import "./navbar.css"
import logo from  "../assets/serene-space-logo.png"

// Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// Required Imports
import { Link } from "react-router-dom";

// Navbar function
const Navbar = () => {
  // Invoke the functions
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Handler Functions
  const handleClick = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  }

  return (
    <header>
      <div className="container">
        <button className="hamburger" onClick={toggleMenu}>
          <CiMenuBurger />
        </button>

        <div className="navigation-links">
          <Link to="/"><span className="navigation-link" id="home">Home</span></Link>
          <Link to="/shop"><span className="navigation-link">Shop</span></Link>
          <Link to="/shop/collection"><span className="navigation-link">Collection</span></Link>
        </div>


        <div className={`dropdown ${menuOpen ? "active" : ""}`}>
          <Link to="/"><span className="dropdown-link" id="home">Home</span></Link>
          <Link to="/shop"><span className="dropdown-link" >Shop</span></Link>
          <Link to="/shop/collection"><span className="dropdown-link" >Collection</span></Link>
        </div>


        <Link to="/" className="logo">
          <img src={logo}></img>
          <h3>SereneSpaces</h3>
        </Link>


        <nav>
          <Link to='/checkout/cart'><div className="shopping-cart-icon"><CiShoppingBasket size={32}/></div></Link>
          {user && (
            <div>
              <Link to={`/user/myOrders`}><span className="my-orders">My orders</span></Link>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/user/login">
                <button className="login-register-btn">
                  LOGIN / REGISTER
                </button>
                <div className="login-icon">
                  <CiUser size={32} />
                </div>
              </Link>
            </div>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Navbar;
