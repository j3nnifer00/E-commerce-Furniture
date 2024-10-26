import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

import Home from "./pages/Home"
import Product from "./pages/shop/Product.js"
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Shop from "./pages/shop/Shop.js";
import RegisterProduct from "./pages/shop/RegisterProduct.js";

import Admin from "./pages/admin/Admin.js";
import { Myorder } from "./pages/user/Myorder.js";

import Cart from "./pages/checkout/Cart.js";
import Checkout from "./pages/checkout/Checkout.js";
import OrderConfirmation from "./pages/checkout/OrderConfirmation.js"

import { ShopContextProvider } from "./context/ShopContext.js";

import useTokenExpiration from './hooks/useTokenExpiration';

function App() {

  useTokenExpiration();

  return (
    <div className="App">
      <ShopContextProvider>
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            {/* 제품 상세 정보 페이지의 경로를 /product/:productId로 변경 */}
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orderConfirmation" element={<OrderConfirmation />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/registerProduct" element={<RegisterProduct />} />
            <Route path="/registerProduct/:productId" element={<RegisterProduct />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/myOrders" element={<Myorder />} />

          </Routes>
        </div>
        <Footer />
      </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
